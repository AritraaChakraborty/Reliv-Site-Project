#!/bin/bash
set -e

# Build the project
bun run build

# Create Vercel output structure
mkdir -p .vercel/output/functions/index.func

# Create Node.js wrapper - use direct ES module approach
cat > .vercel/output/functions/index.func/index.mjs << 'WRAPPER_EOF'
import server from './server.js';

export default async (req, res) => {
  try {
    // Build full URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url || '/', `${protocol}://${host}`);
    
    // Create Fetch API request
    const request = new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
    });
    
    // Call the server handler - server is the actual server object
    const response = await server.fetch(request);
    
    // Set response status
    res.statusCode = response.status;
    
    // Copy headers
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });
    
    // Send body
    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (error) {
    console.error('[v0] Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<html><body><h1>500 Internal Server Error</h1></body></html>');
  }
};
WRAPPER_EOF

# Copy server files to Vercel function
cp dist/server/server.js .vercel/output/functions/index.func/
cp -r dist/server/assets .vercel/output/functions/index.func/ 2>/dev/null || true
cp -r dist/client .vercel/output/static

# Create function configuration for ESM
cat > .vercel/output/functions/index.func/.vc-config.json << 'EOF'
{
  "runtime": "nodejs20.x",
  "handler": "index.mjs",
  "launcherType": "Nodejs"
}
EOF

# Create package.json for ES module support
cat > .vercel/output/functions/index.func/package.json << 'EOF'
{
  "type": "module"
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
