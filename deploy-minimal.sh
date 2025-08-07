#!/bin/bash

# Minimal Azure Deployment - Only Essential Files
set -e

echo "⚡ Minimal Deploy Starting..."

# Build
npm run build

# Create tiny package with only essentials
rm -f minimal.zip
zip -q -r minimal.zip .next src public package.json server.js web.config

# Deploy with force
az webapp deployment source config-zip \
    --resource-group ursafespace \
    --name ursafespace \
    --src minimal.zip

# Cleanup
rm minimal.zip

echo "✅ Minimal deployment complete!"
echo "🌐 https://ursafespace.azurewebsites.net"
