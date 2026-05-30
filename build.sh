#!/bin/bash
set -e

# Build the project
bun run build

# Create Vercel output structure
mkdir -p .vercel/output/functions/index.func

# Create a CommonJS wrapper that works with Vercel's Node.js runtime
# Load the server module at startup and export the handler immediately
cat > .vercel/output/functions/index.func/index.js << 'WRAPPER_EOF'
let serverModule = null;

async function initServer() {
  if (!serverModule) {
    serverModule = await import('./server.js');
  }
  return serverModule;
}

// Export the handler function that Vercel will call
module.exports = async (req, res) => {
  try {
    const server = await initServer();
    
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url || '/', `${protocol}://${host}`);
    
    const request = new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
    });
    
    const response = await server.default.fetch(request);
    
    res.statusCode = response.status;
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });
    
    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (error) {
    console.error('[v0] Server error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  }
};
WRAPPER_EOF

# Copy server files to Vercel function
cp dist/server/server.js .vercel/output/functions/index.func/
cp -r dist/server/assets .vercel/output/functions/index.func/ 2>/dev/null || true
cp -r dist/client .vercel/output/static

# Create function configuration
cat > .vercel/output/functions/index.func/.vc-config.json << 'EOF'
{
  "runtime": "nodejs20.x",
  "handler": "index.js",
  "launcherType": "Nodejs"
}
EOF

# Create routes configuration
cat > .vercel/output/config.json << 'EOF'
{
  "version": 3,
  "routes": [
    {
      "src": "^/assets/(.*)",
      "dest": "/assets/$1",
      "headers": {
        "cache-control": "public, max-age=31536000, immutable"
      }
    },
    {
      "src": "/(.*)",
      "dest": "index"
    }
  ]
}
EOF

echo "Vercel build complete"
