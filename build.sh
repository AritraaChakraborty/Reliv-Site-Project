#!/bin/bash
set -e

# Build the project
bun run build

# Create Vercel output structure
mkdir -p .vercel/output/functions/index.func

# Copy server files to Vercel function
cp dist/server/server.js .vercel/output/functions/index.func/index.js
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
