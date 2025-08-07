# Local Azure Deployment Guide

This guide explains how to deploy the UrSafe Space Next.js application to Azure App Service using local deployment scripts instead of GitHub Actions.

## Prerequisites

1. **Azure CLI**: Install Azure CLI on your machine
   ```bash
   # macOS
   brew install azure-cli
   
   # Windows
   # Download from: https://aka.ms/installazurecliwindows
   
   # Linux
   curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
   ```

2. **Login to Azure**:
   ```bash
   az login
   ```

3. **Verify your subscription**:
   ```bash
   az account show
   ```

## Deployment Options

### Option 1: Full Deployment Script (Recommended)

Use the comprehensive deployment script with logging and error handling:

```bash
./deploy-to-azure.sh
```

**Available commands:**
- `./deploy-to-azure.sh` - Full build and deployment (default)
- `./deploy-to-azure.sh build-only` - Only build the application
- `./deploy-to-azure.sh logs` - Show real-time logs
- `./deploy-to-azure.sh status` - Check deployment status
- `./deploy-to-azure.sh help` - Show help message

### Option 2: Quick Deployment

For rapid deployments without detailed logging:

```bash
./quick-deploy.sh
```

## What the Scripts Do

1. **Build Process**:
   - Install dependencies with `npm ci`
   - Build the Next.js application with `npm run build`
   - Verify the build completed successfully

2. **Package Creation**:
   - Create a deployment package with all necessary files
   - Include `.next`, `src`, `public` directories
   - Copy configuration files (package.json, web.config, etc.)
   - Make startup scripts executable

3. **Azure Deployment**:
   - Create a ZIP file for deployment
   - Upload to Azure App Service using `az webapp deployment source config-zip`
   - Verify deployment status

## Configuration

The scripts are configured for:
- **App Name**: `ursafespace`
- **Resource Group**: `ursafespace_group`

To modify these settings, edit the variables at the top of the scripts:

```bash
APP_NAME="your-app-name"
RESOURCE_GROUP="your-resource-group"
```

## Troubleshooting

### Build Failures

If the build fails:
1. Check that all dependencies are properly installed
2. Ensure environment variables are set correctly
3. Run `npm run build` locally to debug issues

### Deployment Failures

If deployment fails:
1. Check Azure CLI login: `az account show`
2. Verify app exists: `az webapp show --name ursafespace --resource-group ursafespace_group`
3. Check recent logs: `./deploy-to-azure.sh logs`

### Common Issues

1. **"App Service not found"**:
   - Verify the app name and resource group in the script
   - Check if you have access to the Azure subscription

2. **"Build failed"**:
   - Ensure all dependencies are in the correct location (dependencies vs devDependencies)
   - Check for TypeScript or linting errors

3. **"Deployment timeout"**:
   - The ZIP deployment method is more reliable than GitHub Actions
   - Monitor with `az webapp log tail --name ursafespace --resource-group ursafespace_group`

## Environment Variables

Environment variables should be set in the Azure portal under:
**App Service > Configuration > Application settings**

Required variables:
- `NEXTAUTH_URL`: Your app URL (e.g., `https://ursafespace.azurewebsites.net`)
- `NEXTAUTH_SECRET`: Random secret for NextAuth
- `GMAIL_USER`: Gmail address for notifications
- `GMAIL_APP_PASSWORD`: Gmail app password
- `OWNER_EMAIL`: Email to receive notifications

## Monitoring

### View Logs
```bash
# Real-time logs
az webapp log tail --name ursafespace --resource-group ursafespace_group

# Download logs
az webapp log download --name ursafespace --resource-group ursafespace_group
```

### Check App Status
```bash
az webapp show --name ursafespace --resource-group ursafespace_group --query "state"
```

### Restart App
```bash
az webapp restart --name ursafespace --resource-group ursafespace_group
```

## Advantages of Local Deployment

1. **Direct Control**: No dependency on GitHub Actions infrastructure
2. **Faster Debugging**: Immediate feedback and error messages
3. **Reliable**: ZIP deployment is more stable than CI/CD pipelines
4. **Flexible**: Easy to modify deployment process as needed
5. **Local Testing**: Can test deployment package before uploading

## Best Practices

1. **Test Locally First**: Always run `npm run build` locally before deploying
2. **Monitor Deployments**: Use the logs command to monitor deployment progress
3. **Keep Scripts Updated**: Update app name and resource group as needed
4. **Environment Variables**: Set sensitive data in Azure portal, not in code
5. **Regular Backups**: Consider backing up your app before major deployments

## Support

If you encounter issues:
1. Check the deployment logs using the provided commands
2. Verify all prerequisites are met
3. Ensure your Azure CLI is up to date: `az upgrade`
4. Test with the quick deploy script for simpler debugging