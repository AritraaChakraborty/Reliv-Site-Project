#!/bin/bash
set -e

# Build the project
bun run build

# Create Vercel output structure
mkdir -p .vercel/output/functions/index.func

# Create Node.js wrapper - use CommonJS require for better compatibility
cat > .vercel/output/functions/index.func/index.js << 'WRAPPER_EOF'
let serverModule;

// Async loader for ESM module
async function initServer() {
  if (!serverModule) {
    try {
      serverModule = await import('./server.js');
    } catch (error) {
      console.error('[v0] Failed to load server module:', error);
      throw error;
    }
  }
  return serverModule;
}

module.exports = async (req, res) => {
  try {
    console.log('[v0] Handling request:', req.method, req.url);
    
    const server = await initServer();
    
    // Build full URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const url = new URL(req.url || '/', `${protocol}://${host}`);
    
    console.log('[v0] URL:', url.toString());
    
    // Create Fetch API request
    const request = new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
    });
    
    console.log('[v0] Calling server.default.fetch');
    
    // Call the server handler
    const response = await server.default.fetch(request);
    
    console.log('[v0] Server responded with status:', response.status);
    
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
    console.error('[v0] Error handling request:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end('<html><body><h1>500 Internal Server Error</h1><p>' + error.message + '</p></body></html>');
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
