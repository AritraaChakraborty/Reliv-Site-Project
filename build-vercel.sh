#!/bin/bash
set -e

echo "[v0] Building with TanStack Start (Cloudflare output)..."
bun run build

echo "[v0] Converting Cloudflare build to Vercel format..."

# Create Vercel output structure
mkdir -p .vercel/output/functions/index.func
mkdir -p .vercel/output/static

# Copy client files to static (Vercel serves these automatically)
cp -r dist/client/* .vercel/output/static/

# Copy server entry point
cp dist/server/server.js .vercel/output/functions/index.func/

# Create a proper Vercel-compatible handler
cat > .vercel/output/functions/index.func/index.js << 'HANDLER_EOF'
let server = null;

async function initServer() {
  if (!server) {
    // Import the Nitro server (as ES module)
    const mod = await import('./server.js');
    server = mod.default;
  }
  return server;
}

// Handler for Vercel Serverless Functions
module.exports = async (req, res) => {
  try {
    const srv = await initServer();
    
    // Build full request URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const urlString = new URL(req.url || '/', `${protocol}://${host}`).toString();
    
    // Create Fetch API request
    const request = new Request(urlString, {
      method: req.method,
      headers: req.headers,
    });
    
    // Call Nitro server
    const response = await srv.fetch(request);
    
    // Set response status and headers
    res.statusCode = response.status;
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });
    
    // Send response body
    const buffer = await response.arrayBuffer();
    res.end(Buffer.from(buffer));
  } catch (error) {
    console.error('[v0] Server error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  }
};
HANDLER_EOF

# Create Vercel function config
cat > .vercel/output/functions/index.func/.vc-config.json << 'CONFIG_EOF'
{
  "runtime": "nodejs20.x",
  "handler": "index.js",
  "launcherType": "Nodejs"
}
CONFIG_EOF

# Create Vercel routing config
cat > .vercel/output/config.json << 'ROUTES_EOF'
{
  "version": 3,
  "routes": [
    {
      "src": "^/.*$",
      "dest": "index"
    }
  ]
}
ROUTES_EOF

echo "[v0] Vercel build complete!"
