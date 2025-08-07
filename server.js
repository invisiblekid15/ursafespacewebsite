const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = dev ? "localhost" : "0.0.0.0";
const port = process.env.PORT || process.env.WEBSITES_PORT || 8080;

console.log(`Starting server in ${dev ? "development" : "production"} mode`);
console.log(`Hostname: ${hostname}, Port: ${port}`);

// Create Next.js app
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = createServer(async (req, res) => {
      try {
        // Add CORS headers for Azure
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
          "Access-Control-Allow-Methods",
          "GET, POST, PUT, DELETE, OPTIONS",
        );
        res.setHeader(
          "Access-Control-Allow-Headers",
          "Content-Type, Authorization",
        );

        // Handle preflight requests
        if (req.method === "OPTIONS") {
          res.writeHead(200);
          res.end();
          return;
        }

        // Parse the URL
        const parsedUrl = parse(req.url, true);
        const { pathname } = parsedUrl;

        console.log(`${req.method} ${pathname} - ${new Date().toISOString()}`);

        // Handle API routes
        if (pathname.startsWith("/api/")) {
          await handle(req, res, parsedUrl);
          return;
        }

        // Handle static files and assets
        if (
          pathname.startsWith("/_next/") ||
          pathname.startsWith("/assets/") ||
          pathname.startsWith("/favicon.ico") ||
          pathname.startsWith("/robots.txt") ||
          pathname.match(
            /\.(png|jpg|jpeg|gif|svg|css|js|json|ico|woff|woff2|ttf|eot)$/,
          )
        ) {
          await handle(req, res, parsedUrl);
          return;
        }

        // Handle all other routes through Next.js
        await handle(req, res, parsedUrl);
      } catch (err) {
        console.error("Error occurred handling", req.url, err);
        res.statusCode = 500;
        res.end("Internal Server Error");
      }
    });

    server.once("error", (err) => {
      console.error("Server error:", err);
      if (err.code === "EADDRINUSE") {
        console.log(
          `Port ${port} is already in use. Trying port ${port + 1}...`,
        );
        server.listen(port + 1, hostname);
      } else {
        process.exit(1);
      }
    });

    server.listen(port, hostname, () => {
      console.log(`> Server ready on http://${hostname}:${port}`);
      console.log(`> Environment: ${process.env.NODE_ENV}`);
      console.log(`> Time: ${new Date().toISOString()}`);
    });

    // Health check endpoint for Azure
    server.on("request", (req, res) => {
      if (req.url === "/health" || req.url === "/api/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(
          JSON.stringify({
            status: "healthy",
            timestamp: new Date().toISOString(),
            port: port,
            hostname: hostname,
          }),
        );
      }
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err);
    process.exit(1);
  });

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM signal received: closing HTTP server");
  process.exit(0);
});

process.on("SIGINT", () => {
  console.log("SIGINT signal received: closing HTTP server");
  process.exit(0);
});
