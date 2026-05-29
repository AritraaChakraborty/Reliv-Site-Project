#!/bin/bash
set -e

# Build the project
bun run build

# Create Vercel output structure
mkdir -p .vercel/output/functions/index.func

# Create Node.js wrapper for the TanStack Start app
cat > .vercel/output/functions/index.func/index.js << 'WRAPPER_EOF'
const mod = require('./server.js');
const server = mod.default;

module.exports = async (req, res) => {
  try {
    // Build full URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url || '/', `${protocol}://${host}`);
    
    // Create Fetch API request
    let body = undefined;
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      body = req;
    }
    
    const request = new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
      body: body,
    });
    
    // Call the handler
    const response = await server.fetch(request, {}, {});
    
    // Set status
    res.statusCode = response.status;
    
    // Copy headers
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });
    
    // Send body
    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (error) {
    console.error('Error handling request:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<html><body><h1>500 Internal Server Error</h1></body></html>');
  }
};
WRAPPER_EOF

# Copy server files to Vercel function
cp dist/server/server.js .vercel/output/functions/index.func/
cp -r dist/server/assets .vercel/output/functions/index.func/
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
