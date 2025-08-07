# Azure Web App Troubleshooting Guide for UrSafeSpace

## Current Issue: Default Azure Screen

You're seeing the default Azure screen instead of your Next.js application. This guide will help you resolve this issue.

## Quick Fixes to Try First

### 1. Check Azure Application Settings

In Azure Portal → Your App Service → Configuration → Application settings:

**Required Settings:**
```
NODE_ENV = production
WEBSITES_NODE_DEFAULT_VERSION = 20.x
SCM_DO_BUILD_DURING_DEPLOYMENT = true
WEBSITE_NODE_DEFAULT_VERSION = 20.x
```

**Email Settings:**
```
GMAIL_USER = your-email@gmail.com
GMAIL_APP_PASSWORD = your-16-char-password
OWNER_EMAIL = owner@ursafespace.com
NEXTAUTH_URL = https://ursafespace.azurewebsites.net
NEXTAUTH_SECRET = your-secret-here
```

### 2. Update Startup Command

Azure Portal → Your App Service → Configuration → General settings:

**Startup Command:**
```
node server.js
```

**Alternative if above doesn't work:**
```
pm2 start server.js --name "ursafespace" --no-daemon
```

### 3. Enable Logging

Azure Portal → Your App Service → App Service logs:
- Application Logging: File System
- Level: Information
- Web server logging: File System

## Step-by-Step Resolution

### Step 1: Check Current Logs

Go to Azure Portal → Your App Service → Log stream

Look for:
- Application startup messages
- Error messages
- Port binding issues
- File not found errors

### Step 2: Manual File Check via Kudu

1. Go to `https://ursafespace.scm.azurewebsites.net/`
2. Navigate to Debug console → CMD
3. Go to `site/wwwroot`
4. Verify these files exist:
   - `package.json`
   - `server.js`
   - `.next/` directory
   - `node_modules/` directory

### Step 3: Test Server Manually

In Kudu console (`site/wwwroot`):
```bash
# Check Node.js version
node --version

# Check if server.js can start
node server.js
```

### Step 4: Force Application Restart

1. Azure Portal → Your App Service → Overview
2. Click "Restart"
3. Wait 2-3 minutes
4. Check the site again

## Common Issues and Solutions

### Issue 1: "Cannot find module 'next'"

**Cause:** Dependencies not properly installed

**Solution:**
```bash
# In Kudu console (site/wwwroot)
npm install --production
```

**Or update deployment to include:**
```yaml
# In GitHub workflow
- name: Install production dependencies
  run: npm ci --production
```

### Issue 2: Port Binding Issues

**Symptoms:** App starts but shows default screen

**Solution:** Update `server.js`:
```javascript
const port = process.env.PORT || process.env.WEBSITES_PORT || 8080;
const hostname = '0.0.0.0'; // Important for Azure
```

### Issue 3: Build Files Missing

**Symptoms:** ".next directory not found"

**Solution:** Ensure GitHub workflow includes:
```yaml
- name: Build and package
  run: |
    npm run build
    cp -r .next deployment-package/
```

### Issue 4: Environment Variables Not Loading

**Symptoms:** Email functionality broken, app errors

**Solution:**
1. Set in Azure Portal Application Settings
2. Restart the app
3. Verify in Kudu console:
```bash
echo $NODE_ENV
echo $GMAIL_USER
```

## Advanced Debugging

### Enable Detailed Logging

Add to your `server.js`:
```javascript
console.log('=== AZURE DEBUG INFO ===');
console.log('Process:', process.env.WEBSITES_CONTAINER_START_TIME_LIMIT);
console.log('Port:', process.env.PORT);
console.log('Working Dir:', process.cwd());
console.log('Files:', require('fs').readdirSync('.'));
console.log('========================');
```

### Check Application Insights

If enabled, check Application Insights for:
- Failed requests
- Exceptions
- Performance issues

### Manual Deployment Test

1. Download your deployment package from GitHub Actions
2. Extract and verify contents
3. Test locally:
```bash
npm install
npm run build
npm start
```

## Alternative Deployment Approach

If the current approach fails, try this simpler method:

### Option 1: Standard Next.js Deployment

1. Remove custom `server.js`
2. Update `package.json`:
```json
{
  "scripts": {
    "start": "next start"
  }
}
```
3. Set startup command to: `npm start`

### Option 2: Use Azure's Built-in Node.js Support

1. Ensure these files are in root:
   - `package.json`
   - `.next/` directory
   - `next.config.js`

2. Let Azure auto-detect and start the app

## Emergency Checklist

If nothing works, verify these essentials:

- [ ] Node.js 20.x is set in Azure
- [ ] `package.json` exists in wwwroot
- [ ] `.next` directory exists and has content
- [ ] `node_modules` directory exists
- [ ] Environment variables are set in Azure
- [ ] Startup command is set to `node server.js`
- [ ] App Service logs are enabled
- [ ] Application has been restarted

## Getting Real-Time Help

### Live Debugging Steps:

1. **Enable Live Logs:**
   ```bash
   # In local terminal
   az webapp log tail --name ursafespace --resource-group your-rg
   ```

2. **SSH into Container:**
   - Azure Portal → Development Tools → SSH
   - Navigate to `/home/site/wwwroot`
   - Run: `ls -la` to see files
   - Run: `node server.js` to test manually

3. **Check Process List:**
   ```bash
   ps aux | grep node
   ```

### Most Likely Fixes (in order of probability):

1. **Set startup command:** `node server.js`
2. **Add missing environment variable:** `WEBSITES_NODE_DEFAULT_VERSION = 20.x`
3. **Restart the application**
4. **Redeploy with correct file structure**

## Contact Support

If all else fails:

1. **Check GitHub Actions logs** for deployment issues
2. **Review Azure Activity Log** for platform issues
3. **Contact Azure Support** with these details:
   - Deployment logs
   - Application logs
   - Exact error messages
   - Steps already tried

## Success Indicators

You'll know it's working when:
- ✅ Site loads UrSafeSpace instead of default page
- ✅ All sections display properly
- ✅ Contact forms work (test with real email)
- ✅ WhatsApp button functions
- ✅ No console errors in browser

---

**Quick Test URL:** `https://ursafespace.azurewebsites.net/api/health`
This should return a JSON response if the server is running properly.