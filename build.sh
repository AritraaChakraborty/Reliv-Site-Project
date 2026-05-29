#!/bin/bash
set -e

# Build the project
bun run build

# Create Vercel output structure
mkdir -p .vercel/output/functions/index.func

# Create a proper Node.js HTTP server wrapper for Nitro
cat > .vercel/output/functions/index.func/index.cjs << 'WRAPPER_EOF'
async function handler(req, res) {
  try {
    // Import the Nitro server (ES module)
    const { default: server } = await import('./server.js');
    
    // Build the full URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url || '/', `${protocol}://${host}`);
    
    // Create Fetch API request from Node.js request
    const fetchReq = new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
    });
    
    // Call the Nitro fetch handler
    const response = await server.fetch(fetchReq);
    
    // Set the response status
    res.statusCode = response.status;
    
    // Copy response headers
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });
    
    // Send the response body
    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (error) {
    console.error('[v0] Error in server:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error: ' + error.message);
  }
}

module.exports = handler;
WRAPPER_EOF

# Copy server files to Vercel function
cp dist/server/server.js .vercel/output/functions/index.func/
cp -r dist/server/assets .vercel/output/functions/index.func/ 2>/dev/null || true
cp -r dist/client .vercel/output/static

# Create function configuration
cat > .vercel/output/functions/index.func/.vc-config.json << 'EOF'
{
  "runtime": "nodejs20.x",
  "handler": "index.cjs",
  "launcherType": "Nodejs"
}
EOF

# Remove any package.json to avoid conflicts
rm -f .vercel/output/functions/index.func/package.json

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
