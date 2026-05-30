#!/bin/bash
set -e

# Build the project
bun run build

# Create Vercel output structure
mkdir -p .vercel/output/functions/index.func

# Create a simple Node.js wrapper using .mjs with named export that Vercel expects
cat > .vercel/output/functions/index.func/index.mjs << 'WRAPPER_EOF'
import serverModule from './server.js';

export default async function handler(req, res) {
  try {
    // Build the full URL
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    const url = new URL(req.url || '/', `${protocol}://${host}`);
    
    // Create Fetch API request
    const request = new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
    });
    
    // Call the Nitro server
    const response = await serverModule.fetch(request);
    
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
    console.error('[v0] Error:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Internal Server Error');
  }
}
WRAPPER_EOF

# Copy server files to Vercel function
cp dist/server/server.js .vercel/output/functions/index.func/
cp -r dist/server/assets .vercel/output/functions/index.func/ 2>/dev/null || true
cp -r dist/client .vercel/output/static

# Create function configuration
cat > .vercel/output/functions/index.func/.vc-config.json << 'EOF'
{
  "runtime": "nodejs20.x",
  "handler": "index.mjs",
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
