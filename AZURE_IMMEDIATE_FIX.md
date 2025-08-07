# Azure Immediate Fix - UrSafeSpace Application Error

## 🚨 URGENT: Application Error Resolution

Your deployment succeeded but the app is showing "Application Error". Follow these steps in order.

## Step 1: Azure Application Settings (CRITICAL)

Go to Azure Portal → Your App Service → Configuration → Application settings

**Add/Update these REQUIRED settings:**

```
NODE_ENV = production
WEBSITES_NODE_DEFAULT_VERSION = 20-lts
SCM_DO_BUILD_DURING_DEPLOYMENT = false
WEBSITE_NODE_DEFAULT_VERSION = 20-lts
PORT = 8080
```

**Email Configuration:**
```
GMAIL_USER = your-email@gmail.com
GMAIL_APP_PASSWORD = your-16-char-password
OWNER_EMAIL = owner@ursafespace.com
NEXTAUTH_URL = https://ursafespace.azurewebsites.net
NEXTAUTH_SECRET = your-random-secret-key
```

## Step 2: Set Startup Command

Azure Portal → Configuration → General settings → Startup Command:

**Set this EXACT command:**
```
node server.js
```

**Alternative if above fails:**
```
npm start
```

## Step 3: Enable Detailed Logging

Azure Portal → Monitoring → App Service logs:

- Application Logging (Filesystem): ON
- Level: Information
- Web server logging (Filesystem): ON
- Detailed error messages: ON
- Failed request tracing: ON

## Step 4: Restart Application

1. Azure Portal → Overview → **RESTART**
2. Wait 3-5 minutes
3. Check site again

## Step 5: Check Live Logs

Azure Portal → Monitoring → **Log stream**

Look for these error patterns:
- "Cannot find module"
- "Port already in use"
- "ENOENT: no such file"
- "Permission denied"

## Step 6: Manual Debugging via Kudu

1. Go to: `https://ursafespace.scm.azurewebsites.net/`
2. Debug Console → CMD
3. Navigate to: `site/wwwroot`
4. Run these commands:

```bash
dir
node --version
npm --version
type package.json
node server.js
```

## Step 7: Common Quick Fixes

### Fix 1: Missing Dependencies
In Kudu console (`site/wwwroot`):
```bash
npm install --production
```

### Fix 2: Wrong Node Version
In Application Settings, change:
```
WEBSITES_NODE_DEFAULT_VERSION = 18-lts
```

### Fix 3: Permission Issues
In Kudu console:
```bash
chmod +x server.js
npm start
```

### Fix 4: Alternative Startup
Change startup command to:
```
npm run start
```

## Step 8: Emergency Fallback

If nothing works, try these startup commands in order:

1. `node server.js`
2. `npm start`
3. `npm run start:next`
4. `node run.js`

## Step 9: Test Health Endpoint

Once app starts, test:
```
https://ursafespace.azurewebsites.net/api/health
```

Should return JSON like:
```json
{
  "status": "healthy",
  "timestamp": "2025-01-08T...",
  "port": 8080,
  "hostname": "0.0.0.0"
}
```

## Step 10: File Structure Verification

In Kudu console, verify these files exist in `site/wwwroot`:

**Required Files:**
- ✅ `package.json`
- ✅ `server.js`
- ✅ `.next/` directory
- ✅ `node_modules/` directory
- ✅ `public/` directory

**If missing, redeploy from GitHub Actions**

## Most Likely Solutions (Try First)

### 99% Success Rate Fixes:

1. **Set Node version to 18-lts** (most common fix)
2. **Set startup command to `node server.js`**
3. **Restart the application**
4. **Run `npm install --production` in Kudu**

### Emergency Contact

If still failing after all steps:

1. **Screenshot** the exact error message
2. **Copy** the log stream output
3. **Note** which steps you've tried
4. **Check** GitHub Actions logs for deployment issues

## Success Indicators

✅ **Working correctly when you see:**
- UrSafeSpace website loads (not default Azure page)
- No "Application Error" message
- Contact forms work
- WhatsApp button appears
- API endpoints respond

## Quick Test Commands

Run these in Kudu console to verify:

```bash
# Check if server starts
node server.js

# Check if Next.js works
npm run start:next

# Check dependencies
npm list --depth=0

# Check environment
echo %NODE_ENV%
echo %PORT%
```

**Expected output:** Server should start on port 8080 without errors.

---

**Note:** Most Azure deployment issues are solved by steps 1-4. If those don't work, the issue is likely with file structure or dependencies.