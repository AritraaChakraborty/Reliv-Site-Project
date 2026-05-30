let serverModule = null;

async function initServer() {
  if (!serverModule) {
    try {
      const mod = await import('../dist/server/server.js');
      serverModule = mod.default;
    } catch (err) {
      console.error('[v0] Failed to load server:', err);
      throw err;
    }
  }
  return serverModule;
}

export default async function handler(req, res) {
  try {
    const server = await initServer();
    
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost';
    // Use full URL including query string
    const fullPath = req.url || '/';
    const url = new URL(fullPath, `${protocol}://${host}`);
    
    const request = new Request(url.toString(), {
      method: req.method,
      headers: req.headers,
    });
    
    const response = await server.fetch(request);
    
    res.status(response.status);
    response.headers.forEach((value, name) => {
      res.setHeader(name, value);
    });
    
    const buffer = await response.arrayBuffer();
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error('[v0] Handler error:', error);
    res.status(500).send('Internal Server Error');
  }
}
