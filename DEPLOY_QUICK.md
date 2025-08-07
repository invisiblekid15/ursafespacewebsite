# Quick Deployment Guide

## ✅ Working Solution

Use the **minimal deployment script** for fast, reliable deployments:

```bash
./deploy-minimal.sh
```

**Time:** ~2 minutes total
**Status:** ✅ Tested and working

## What it does:
1. Builds the Next.js app (`npm run build`)
2. Creates a minimal ZIP with only essential files
3. Deploys to Azure App Service using `az webapp deployment`
4. Cleans up temporary files

## Prerequisites

```bash
# Login to Azure (one time)
az login

# Verify you're logged in
az account show
```

## Files Included in Deployment

- `.next/` - Built Next.js application
- `src/` - Source code
- `public/` - Static assets
- `package.json` - Dependencies
- `server.js` - Custom server
- `web.config` - Azure configuration

## Troubleshooting

**Build fails?**
```bash
npm run build
# Fix any errors, then deploy
```

**Deployment fails?**
```bash
# Check Azure login
az account show

# Restart the app service
az webapp restart --name ursafespace --resource-group ursafespace
```

**Check deployment status:**
```bash
# View logs
az webapp log tail --name ursafespace --resource-group ursafespace

# Check app status
az webapp show --name ursafespace --resource-group ursafespace --query "state"
```

## App URL
🌐 **https://ursafespace.azurewebsites.net**

---

**Note:** This replaces the stuck GitHub Actions workflow with a fast, local deployment process.