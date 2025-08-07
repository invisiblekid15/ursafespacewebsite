#!/bin/bash

# Azure UrSafeSpace Auto-Fix Script
# This script automatically applies common fixes for Azure Web App deployment issues

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration - UPDATE THESE VALUES
RESOURCE_GROUP="your-resource-group-name"
APP_NAME="ursafespace"
SUBSCRIPTION_ID="your-subscription-id"

# Your actual email configuration
GMAIL_USER="your-email@gmail.com"
GMAIL_APP_PASSWORD="your-16-char-app-password"
OWNER_EMAIL="owner@ursafespace.com"
NEXTAUTH_SECRET="your-secure-random-secret"

echo -e "${BLUE}=== Azure UrSafeSpace Auto-Fix Script ===${NC}"
echo -e "${BLUE}Resource Group: ${RESOURCE_GROUP}${NC}"
echo -e "${BLUE}App Name: ${APP_NAME}${NC}"
echo ""

# Function to print section headers
print_section() {
    echo -e "\n${BLUE}=== $1 ===${NC}"
}

# Function to print success
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

# Function to print warning
print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

# Function to print error
print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Function to print info
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Check prerequisites
print_section "Prerequisites Check"

if ! command -v az &> /dev/null; then
    print_error "Azure CLI is not installed"
    exit 1
fi
print_success "Azure CLI is installed"

if ! az account show &> /dev/null; then
    print_error "Not logged into Azure CLI. Run: az login"
    exit 1
fi
print_success "Logged into Azure CLI"

# Validate configuration
if [ "$RESOURCE_GROUP" = "your-resource-group-name" ] || [ "$APP_NAME" = "ursafespace" ]; then
    print_warning "Please update the configuration variables at the top of this script"
    echo "Current values:"
    echo "  RESOURCE_GROUP: $RESOURCE_GROUP"
    echo "  APP_NAME: $APP_NAME"
    echo ""
    read -p "Continue anyway? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Set subscription if provided
if [ ! -z "$SUBSCRIPTION_ID" ] && [ "$SUBSCRIPTION_ID" != "your-subscription-id" ]; then
    az account set --subscription "$SUBSCRIPTION_ID"
    print_success "Subscription set to: $SUBSCRIPTION_ID"
fi

# Verify app service exists
print_section "Verifying App Service"
if ! az webapp show --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" &> /dev/null; then
    print_error "App service '$APP_NAME' not found in resource group '$RESOURCE_GROUP'"
    exit 1
fi
print_success "App service found"

# Fix 1: Set Application Settings
print_section "Fix 1: Setting Application Configuration"

print_info "Setting required application settings..."
az webapp config appsettings set \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --settings \
        NODE_ENV=production \
        WEBSITES_NODE_DEFAULT_VERSION=20-lts \
        WEBSITE_NODE_DEFAULT_VERSION=20-lts \
        SCM_DO_BUILD_DURING_DEPLOYMENT=false \
        PORT=8080 \
    --output none

print_success "Basic application settings configured"

# Set email configuration if provided
if [ "$GMAIL_USER" != "your-email@gmail.com" ] && [ "$GMAIL_APP_PASSWORD" != "your-16-char-app-password" ]; then
    print_info "Setting email configuration..."
    az webapp config appsettings set \
        --resource-group "$RESOURCE_GROUP" \
        --name "$APP_NAME" \
        --settings \
            GMAIL_USER="$GMAIL_USER" \
            GMAIL_APP_PASSWORD="$GMAIL_APP_PASSWORD" \
            OWNER_EMAIL="$OWNER_EMAIL" \
            NEXTAUTH_URL="https://$APP_NAME.azurewebsites.net" \
            NEXTAUTH_SECRET="$NEXTAUTH_SECRET" \
        --output none
    print_success "Email configuration set"
else
    print_warning "Email configuration not set - update variables in script"
fi

# Fix 2: Set Startup Command
print_section "Fix 2: Setting Startup Command"

print_info "Setting startup command to 'node server.js'..."
az webapp config set \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --startup-file "node server.js" \
    --output none

print_success "Startup command configured"

# Fix 3: Enable Logging
print_section "Fix 3: Enabling Application Logging"

print_info "Enabling detailed application logging..."
az webapp log config \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --application-logging filesystem \
    --level information \
    --web-server-logging filesystem \
    --output none

print_success "Application logging enabled"

# Fix 4: Configure Platform Settings
print_section "Fix 4: Platform Configuration"

print_info "Setting platform configuration..."
az webapp config set \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --use-32bit-worker-process false \
    --output none

print_success "Platform configuration updated"

# Fix 5: Set CORS if needed
print_section "Fix 5: CORS Configuration"

print_info "Configuring CORS for API endpoints..."
az webapp cors add \
    --resource-group "$RESOURCE_GROUP" \
    --name "$APP_NAME" \
    --allowed-origins "*" \
    --output none 2>/dev/null || print_warning "CORS might already be configured"

print_success "CORS configuration updated"

# Fix 6: Restart Application
print_section "Fix 6: Restarting Application"

print_info "Stopping application..."
az webapp stop --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" --output none

print_info "Waiting 10 seconds..."
sleep 10

print_info "Starting application..."
az webapp start --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" --output none

print_success "Application restarted"

# Fix 7: Verify Configuration
print_section "Fix 7: Verification"

print_info "Waiting 30 seconds for application to fully start..."
sleep 30

# Get app URL
APP_URL=$(az webapp show --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" --query "defaultHostName" -o tsv)

print_info "Testing application health..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$APP_URL" --max-time 30 || echo "000")

if [ "$HTTP_STATUS" = "200" ]; then
    print_success "Application is responding correctly!"
    echo "✅ Site URL: https://$APP_URL"
elif [ "$HTTP_STATUS" = "000" ]; then
    print_warning "Application is not responding yet (may still be starting)"
else
    print_warning "Application returned HTTP $HTTP_STATUS"
fi

# Test health endpoint
print_info "Testing health endpoint..."
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$APP_URL/api/health" --max-time 15 || echo "000")

if [ "$HEALTH_STATUS" = "200" ]; then
    print_success "Health endpoint is working!"
    echo "✅ Health URL: https://$APP_URL/api/health"
else
    print_warning "Health endpoint not responding yet"
fi

# Additional Diagnostics
print_section "Additional Information"

echo -e "\n${BLUE}Useful URLs:${NC}"
echo "🌐 Application: https://$APP_URL"
echo "🔍 Health Check: https://$APP_URL/api/health"
echo "🛠️  Kudu Console: https://$APP_NAME.scm.azurewebsites.net"
echo "📊 Azure Portal: https://portal.azure.com"

echo -e "\n${BLUE}Monitoring Commands:${NC}"
echo "📋 View live logs:"
echo "   az webapp log tail --resource-group $RESOURCE_GROUP --name $APP_NAME"
echo ""
echo "📋 Check app status:"
echo "   az webapp show --resource-group $RESOURCE_GROUP --name $APP_NAME --query state"
echo ""
echo "📋 List app settings:"
echo "   az webapp config appsettings list --resource-group $RESOURCE_GROUP --name $APP_NAME"

echo -e "\n${BLUE}Troubleshooting:${NC}"
echo "If the application is still not working:"
echo "1. Check live logs for specific error messages"
echo "2. Use Kudu console to verify file structure"
echo "3. Try alternative startup commands:"
echo "   - npm start"
echo "   - npm run start:next"
echo "   - node run.js"

print_section "Auto-Fix Complete"

if [ "$HTTP_STATUS" = "200" ]; then
    echo -e "${GREEN}🎉 SUCCESS: Your application should be working now!${NC}"
    echo -e "${GREEN}Visit: https://$APP_URL${NC}"
else
    echo -e "${YELLOW}⏳ Application may still be starting. Wait a few more minutes and check again.${NC}"
    echo -e "${YELLOW}If issues persist, check the logs:${NC}"
    echo -e "${YELLOW}az webapp log tail --resource-group $RESOURCE_GROUP --name $APP_NAME${NC}"
fi

echo ""
echo -e "${BLUE}💡 Tip: Run azure-check.sh to get detailed diagnostics${NC}"
