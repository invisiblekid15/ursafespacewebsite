#!/bin/bash

# Azure UrSafeSpace Deployment Diagnostic Script
# This script uses Azure CLI to check and diagnose deployment issues

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration - UPDATE THESE VALUES
RESOURCE_GROUP="ursafespace"
APP_NAME="ursafespace"
SUBSCRIPTION_ID="712152f8-8710-4454-acac-3095d3def3dc"

echo -e "${BLUE}=== Azure UrSafeSpace Deployment Diagnostic ===${NC}"
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

# Check if Azure CLI is installed and logged in
print_section "Azure CLI Status"
if ! command -v az &> /dev/null; then
    print_error "Azure CLI is not installed"
    exit 1
fi

print_success "Azure CLI is installed"

# Check login status
if ! az account show &> /dev/null; then
    print_error "Not logged into Azure CLI. Run: az login"
    exit 1
fi

print_success "Logged into Azure CLI"

# Set subscription
if [ ! -z "$SUBSCRIPTION_ID" ] && [ "$SUBSCRIPTION_ID" != "your-subscription-id" ]; then
    az account set --subscription "$SUBSCRIPTION_ID"
    print_success "Subscription set to: $SUBSCRIPTION_ID"
fi

# Check if resource group exists
print_section "Resource Group Check"
if az group show --name "$RESOURCE_GROUP" &> /dev/null; then
    print_success "Resource group '$RESOURCE_GROUP' exists"
else
    print_error "Resource group '$RESOURCE_GROUP' not found"
    echo "Available resource groups:"
    az group list --query "[].name" -o table
    exit 1
fi

# Check if app service exists
print_section "App Service Check"
if az webapp show --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" &> /dev/null; then
    print_success "App service '$APP_NAME' exists"
else
    print_error "App service '$APP_NAME' not found in resource group '$RESOURCE_GROUP'"
    echo "Available app services in resource group:"
    az webapp list --resource-group "$RESOURCE_GROUP" --query "[].name" -o table
    exit 1
fi

# Get app service details
print_section "App Service Configuration"
APP_CONFIG=$(az webapp show --resource-group "$RESOURCE_GROUP" --name "$APP_NAME")
APP_STATE=$(echo "$APP_CONFIG" | jq -r '.state')
APP_URL=$(echo "$APP_CONFIG" | jq -r '.defaultHostName')
RUNTIME_VERSION=$(echo "$APP_CONFIG" | jq -r '.siteConfig.nodeVersion // "Not set"')

echo "State: $APP_STATE"
echo "URL: https://$APP_URL"
echo "Node Version: $RUNTIME_VERSION"

if [ "$APP_STATE" = "Running" ]; then
    print_success "App service is running"
else
    print_warning "App service state: $APP_STATE"
fi

# Check application settings
print_section "Application Settings"
APP_SETTINGS=$(az webapp config appsettings list --resource-group "$RESOURCE_GROUP" --name "$APP_NAME")

# Required settings to check
REQUIRED_SETTINGS=("NODE_ENV" "WEBSITES_NODE_DEFAULT_VERSION" "GMAIL_USER" "GMAIL_APP_PASSWORD" "OWNER_EMAIL")

for setting in "${REQUIRED_SETTINGS[@]}"; do
    if echo "$APP_SETTINGS" | jq -e ".[] | select(.name == \"$setting\")" > /dev/null; then
        value=$(echo "$APP_SETTINGS" | jq -r ".[] | select(.name == \"$setting\") | .value")
        if [ "$setting" = "GMAIL_APP_PASSWORD" ]; then
            print_success "$setting: [HIDDEN - $(echo $value | wc -c) characters]"
        else
            print_success "$setting: $value"
        fi
    else
        print_error "$setting: NOT SET"
    fi
done

# Check startup command
print_section "Startup Configuration"
STARTUP_FILE=$(az webapp config show --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" --query "appCommandLine" -o tsv)
if [ -z "$STARTUP_FILE" ] || [ "$STARTUP_FILE" = "null" ]; then
    print_warning "No startup command set"
    echo "Recommended: Set startup command to 'node server.js'"
else
    print_success "Startup command: $STARTUP_FILE"
fi

# Check deployment status
print_section "Recent Deployments"
DEPLOYMENTS=$(az webapp deployment list --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" --query "[0:3].[id,status,start_time,end_time]" -o table)
echo "$DEPLOYMENTS"

# Get latest deployment logs
print_section "Latest Deployment Logs"
LATEST_DEPLOYMENT=$(az webapp deployment list --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" --query "[0].id" -o tsv)
if [ ! -z "$LATEST_DEPLOYMENT" ] && [ "$LATEST_DEPLOYMENT" != "null" ]; then
    echo "Latest deployment ID: $LATEST_DEPLOYMENT"
    echo "Getting deployment logs..."
    az webapp log deployment show --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" --deployment-id "$LATEST_DEPLOYMENT" --query "[].message" -o table 2>/dev/null || echo "Could not retrieve deployment logs"
else
    print_warning "No deployments found"
fi

# Check application logs
print_section "Application Logs Configuration"
LOG_CONFIG=$(az webapp log config show --resource-group "$RESOURCE_GROUP" --name "$APP_NAME")
APP_LOG_ENABLED=$(echo "$LOG_CONFIG" | jq -r '.applicationLogs.fileSystem.level // "Off"')
WEB_LOG_ENABLED=$(echo "$LOG_CONFIG" | jq -r '.httpLogs.fileSystem.enabled // false')

echo "Application Logging: $APP_LOG_ENABLED"
echo "Web Server Logging: $WEB_LOG_ENABLED"

if [ "$APP_LOG_ENABLED" = "Off" ]; then
    print_warning "Application logging is disabled"
    echo "Enable with: az webapp log config --resource-group $RESOURCE_GROUP --name $APP_NAME --application-logging filesystem --level information"
fi

# Test application health
print_section "Application Health Check"
echo "Testing main URL: https://$APP_URL"
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$APP_URL" || echo "000")
echo "HTTP Status: $HTTP_STATUS"

if [ "$HTTP_STATUS" = "200" ]; then
    print_success "Main application is responding"
elif [ "$HTTP_STATUS" = "000" ]; then
    print_error "Cannot connect to application"
else
    print_warning "Application returned HTTP $HTTP_STATUS"
fi

# Test health endpoint
echo "Testing health endpoint: https://$APP_URL/api/health"
HEALTH_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://$APP_URL/api/health" || echo "000")
echo "Health endpoint status: $HEALTH_STATUS"

if [ "$HEALTH_STATUS" = "200" ]; then
    print_success "Health endpoint is responding"
    HEALTH_RESPONSE=$(curl -s "https://$APP_URL/api/health" 2>/dev/null || echo "{}")
    echo "Health response: $HEALTH_RESPONSE"
else
    print_warning "Health endpoint not responding (HTTP $HEALTH_STATUS)"
fi

# Check current application logs
print_section "Recent Application Logs"
echo "Fetching recent logs..."
az webapp log tail --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" --timeout 10 2>/dev/null | head -20 || print_warning "Could not fetch application logs"

# File system check via Kudu
print_section "File System Check (via Kudu API)"
KUDU_URL="https://$APP_NAME.scm.azurewebsites.net"
echo "Kudu URL: $KUDU_URL"

# Get Kudu credentials
PUBLISH_PROFILE=$(az webapp deployment list-publishing-profiles --resource-group "$RESOURCE_GROUP" --name "$APP_NAME" --xml)
KUDU_USER=$(echo "$PUBLISH_PROFILE" | grep -o 'userName="[^"]*"' | head -1 | cut -d'"' -f2)
KUDU_PASS=$(echo "$PUBLISH_PROFILE" | grep -o 'userPWD="[^"]*"' | head -1 | cut -d'"' -f2)

if [ ! -z "$KUDU_USER" ] && [ ! -z "$KUDU_PASS" ]; then
    echo "Checking file structure..."
    FILES_RESPONSE=$(curl -s -u "$KUDU_USER:$KUDU_PASS" "$KUDU_URL/api/vfs/site/wwwroot/" || echo "[]")

    # Check for required files
    REQUIRED_FILES=("package.json" "server.js" ".next")
    for file in "${REQUIRED_FILES[@]}"; do
        if echo "$FILES_RESPONSE" | jq -e ".[] | select(.name == \"$file\")" > /dev/null 2>&1; then
            print_success "File exists: $file"
        else
            print_error "File missing: $file"
        fi
    done
else
    print_warning "Could not retrieve Kudu credentials for file system check"
fi

# Summary and recommendations
print_section "Summary and Recommendations"

echo -e "\n${BLUE}Quick Fix Commands:${NC}"
echo "1. Set startup command:"
echo "   az webapp config set --resource-group $RESOURCE_GROUP --name $APP_NAME --startup-file 'node server.js'"

echo -e "\n2. Enable logging:"
echo "   az webapp log config --resource-group $RESOURCE_GROUP --name $APP_NAME --application-logging filesystem --level information"

echo -e "\n3. Set required app settings:"
echo "   az webapp config appsettings set --resource-group $RESOURCE_GROUP --name $APP_NAME --settings NODE_ENV=production WEBSITES_NODE_DEFAULT_VERSION=20-lts"

echo -e "\n4. Restart application:"
echo "   az webapp restart --resource-group $RESOURCE_GROUP --name $APP_NAME"

echo -e "\n5. View live logs:"
echo "   az webapp log tail --resource-group $RESOURCE_GROUP --name $APP_NAME"

echo -e "\n${BLUE}Manual checks:${NC}"
echo "1. Kudu Console: $KUDU_URL/DebugConsole"
echo "2. Application URL: https://$APP_URL"
echo "3. Health Check: https://$APP_URL/api/health"

print_section "Diagnostic Complete"
echo -e "${GREEN}Run this script again after making changes to verify fixes.${NC}"
