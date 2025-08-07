# Azure Scripts Usage Guide

## Overview

This guide explains how to use the Azure diagnostic and auto-fix scripts to resolve deployment issues with your UrSafeSpace application.

## Scripts Included

1. **`azure-check.sh`** - Comprehensive diagnostic script
2. **`azure-autofix.sh`** - Automatic fix application script

## Prerequisites

### 1. Install Azure CLI
```bash
# macOS
brew install azure-cli

# Windows
winget install Microsoft.AzureCLI

# Linux
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### 2. Login to Azure
```bash
az login
```

### 3. Verify Access
```bash
az account show
az webapp list --query "[].{name:name, resourceGroup:resourceGroup}" -o table
```

## Configuration

Before running the scripts, update these variables in both files:

```bash
# Edit azure-check.sh and azure-autofix.sh
RESOURCE_GROUP="your-actual-resource-group"  # e.g., "rg-ursafespace-prod"
APP_NAME="ursafespace"                        # Your app service name
SUBSCRIPTION_ID="your-subscription-id"        # Optional but recommended

# For azure-autofix.sh only - Email configuration
GMAIL_USER="your-email@gmail.com"
GMAIL_APP_PASSWORD="your-16-char-app-password"
OWNER_EMAIL="owner@ursafespace.com"
NEXTAUTH_SECRET="your-secure-random-secret"
```

## Finding Your Configuration Values

### Resource Group Name
```bash
az group list --query "[].name" -o table
```

### App Service Name
```bash
az webapp list --query "[].name" -o table
```

### Subscription ID
```bash
az account show --query "id" -o tsv
```

## Usage Instructions

### Step 1: Make Scripts Executable
```bash
chmod +x azure-check.sh
chmod +x azure-autofix.sh
```

### Step 2: Run Diagnostic Check
```bash
./azure-check.sh
```

**What it does:**
- ✅ Verifies Azure CLI setup
- ✅ Checks app service configuration
- ✅ Reviews application settings
- ✅ Tests deployment status
- ✅ Checks application health
- ✅ Verifies file structure
- ✅ Provides detailed recommendations

**Sample Output:**
```
=== Azure UrSafeSpace Deployment Diagnostic ===
✅ Azure CLI is installed
✅ Logged into Azure CLI
✅ App service 'ursafespace' exists
⚠️  NODE_ENV: NOT SET
❌ WEBSITES_NODE_DEFAULT_VERSION: NOT SET
```

### Step 3: Apply Automatic Fixes
```bash
./azure-autofix.sh
```

**What it does:**
- 🔧 Sets required application settings
- 🔧 Configures startup command
- 🔧 Enables detailed logging
- 🔧 Sets platform configuration
- 🔧 Configures CORS
- 🔧 Restarts application
- 🔧 Tests application health

**Sample Output:**
```
=== Azure UrSafeSpace Auto-Fix Script ===
✅ Basic application settings configured
✅ Startup command configured
✅ Application logging enabled
✅ Application restarted
🎉 SUCCESS: Your application should be working now!
```

### Step 4: Verify Results
```bash
./azure-check.sh
```

Run the diagnostic script again to verify all fixes were applied successfully.

## Common Scenarios

### Scenario 1: First Time Setup
```bash
# 1. Configure scripts with your values
nano azure-autofix.sh  # Update configuration variables

# 2. Run auto-fix
./azure-autofix.sh

# 3. Verify everything is working
./azure-check.sh
```

### Scenario 2: Application Error After Deployment
```bash
# 1. Check what's wrong
./azure-check.sh

# 2. Apply fixes
./azure-autofix.sh

# 3. Monitor logs if still failing
az webapp log tail --resource-group YOUR_RG --name ursafespace
```

### Scenario 3: Email Not Working
```bash
# 1. Update email configuration in azure-autofix.sh
GMAIL_USER="your-real-email@gmail.com"
GMAIL_APP_PASSWORD="your-actual-app-password"

# 2. Apply email settings
./azure-autofix.sh

# 3. Test email functionality on the website
```

## Troubleshooting the Scripts

### Permission Denied
```bash
chmod +x azure-check.sh azure-autofix.sh
```

### Azure CLI Not Found
```bash
# Install Azure CLI first
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

### Not Logged In
```bash
az login
# Follow browser authentication
```

### Resource Not Found
```bash
# List available resources
az group list -o table
az webapp list -o table

# Update script configuration with correct names
```

### Script Variables Not Updated
```bash
# Edit the scripts and update these lines:
RESOURCE_GROUP="your-actual-resource-group-name"
APP_NAME="your-actual-app-name"
```

## Advanced Usage

### Custom Resource Group
```bash
# Override resource group for one-time use
RESOURCE_GROUP="my-custom-rg" ./azure-check.sh
```

### Different Subscription
```bash
# Set specific subscription
az account set --subscription "your-subscription-id"
./azure-check.sh
```

### Verbose Output
```bash
# Enable debug mode
set -x
./azure-check.sh
```

### Save Output to File
```bash
./azure-check.sh > diagnosis.log 2>&1
./azure-autofix.sh > fix-results.log 2>&1
```

## Manual Commands Reference

If you prefer manual control, here are the key commands:

### Check App Status
```bash
az webapp show --resource-group YOUR_RG --name ursafespace --query state
```

### Set Startup Command
```bash
az webapp config set --resource-group YOUR_RG --name ursafespace --startup-file "node server.js"
```

### Enable Logging
```bash
az webapp log config --resource-group YOUR_RG --name ursafespace --application-logging filesystem --level information
```

### Restart App
```bash
az webapp restart --resource-group YOUR_RG --name ursafespace
```

### View Live Logs
```bash
az webapp log tail --resource-group YOUR_RG --name ursafespace
```

### Set App Settings
```bash
az webapp config appsettings set --resource-group YOUR_RG --name ursafespace --settings NODE_ENV=production WEBSITES_NODE_DEFAULT_VERSION=20-lts
```

## Success Indicators

### ✅ Everything Working
- `azure-check.sh` shows all green checkmarks
- Application URL loads UrSafeSpace website
- Health endpoint returns JSON response
- No errors in live logs

### ⚠️ Partially Working
- App loads but some features broken
- Check specific error messages in logs
- Verify email configuration
- Test contact forms

### ❌ Not Working
- Application Error page
- Health endpoint not responding
- Check startup command and file structure
- Verify all required app settings

## Getting Help

### Check Logs
```bash
az webapp log tail --resource-group YOUR_RG --name ursafespace
```

### Access Kudu Console
1. Go to: `https://ursafespace.scm.azurewebsites.net`
2. Debug Console → CMD
3. Navigate to `site/wwwroot`
4. Check files and try `node server.js`

### Azure Portal
1. Go to Azure Portal
2. Find your App Service
3. Check Configuration → Application settings
4. Check Monitoring → Log stream

## Best Practices

1. **Always run diagnostic first** before applying fixes
2. **Update script configuration** before first use
3. **Save script outputs** for troubleshooting
4. **Test after each change** to isolate issues
5. **Monitor logs** during and after deployment
6. **Keep email credentials secure** in the scripts

## Security Notes

- Never commit scripts with real credentials to version control
- Use environment variables for sensitive data
- Regularly rotate Gmail app passwords
- Review Azure access permissions regularly