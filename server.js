const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      // Parse the URL
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Handle API routes
      if (pathname.startsWith('/api/')) {
        await handle(req, res, parsedUrl);
        return;
      }

      // Handle static files and assets
      if (pathname.startsWith('/_next/') ||
          pathname.startsWith('/assets/') ||
          pathname.startsWith('/favicon.ico') ||
          pathname.startsWith('/robots.txt') ||
          pathname.match(/\.(png|jpg|jpeg|gif|svg|css|js|json|ico|woff|woff2|ttf|eot)$/)) {
        await handle(req, res, parsedUrl);
        return;
      }

      // Handle all other routes through Next.js
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  })
  .once('error', (err) => {
    console.error('Server error:', err);
    process.exit(1);
  })
  .listen(port, () => {
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM signal received: closing HTTP server');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT signal received: closing HTTP server');
  process.exit(0);
});
