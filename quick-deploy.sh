#!/bin/bash

# Quick Azure Deployment Script
# Simple version for fast deployments

set -e

APP_NAME="ursafespace"
RESOURCE_GROUP="ursafespace_group"

echo "🚀 Quick deploying to Azure..."

# Check if logged in to Azure
if ! az account show &> /dev/null; then
    echo "❌ Please login to Azure first: az login"
    exit 1
fi

# Build the app
echo "📦 Building application..."
npm run build

# Create deployment zip
echo "🗜️ Creating deployment package..."
rm -f deploy.zip
zip -r deploy.zip .next src public package*.json web.config server.js run.js startup.sh .deployment next.config.js tsconfig.json postcss.config.mjs eslint.config.mjs next-env.d.ts

# Deploy to Azure
echo "☁️ Deploying to Azure..."
az webapp deployment source config-zip \
    --resource-group $RESOURCE_GROUP \
    --name $APP_NAME \
    --src deploy.zip

echo "✅ Deployment complete!"
echo "🌐 App URL: https://$APP_NAME.azurewebsites.net"

# Cleanup
rm -f deploy.zip

echo "🎉 Done!"
