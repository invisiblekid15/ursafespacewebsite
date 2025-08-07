const { spawn } = require('child_process');
const path = require('path');

// Set environment variables for Azure
process.env.NODE_ENV = process.env.NODE_ENV || 'production';
process.env.PORT = process.env.PORT || process.env.WEBSITES_PORT || 8080;

console.log('Azure Web App - Starting UrSafeSpace Next.js Application');
console.log('Node.js version:', process.version);
console.log('Working directory:', process.cwd());
console.log('PORT:', process.env.PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Check if we're in the right directory
const packageJsonPath = path.join(process.cwd(), 'package.json');
const serverJsPath = path.join(process.cwd(), 'server.js');

try {
  require.resolve(packageJsonPath);
  console.log('✓ package.json found');
} catch (err) {
  console.error('✗ package.json not found in:', process.cwd());
  process.exit(1);
}

try {
  require.resolve(serverJsPath);
  console.log('✓ server.js found');
} catch (err) {
  console.error('✗ server.js not found in:', process.cwd());
  process.exit(1);
}

// Start the Next.js server
console.log('Starting Next.js server...');

const child = spawn('node', ['server.js'], {
  stdio: 'inherit',
  env: process.env
});

child.on('error', (err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

child.on('exit', (code, signal) => {
  console.log(`Server process exited with code ${code} and signal ${signal}`);
  process.exit(code);
});

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  child.kill('SIGTERM');
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully');
  child.kill('SIGINT');
});
