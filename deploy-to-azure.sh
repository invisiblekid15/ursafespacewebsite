#!/bin/bash

# Azure Deployment Script for UrSafe Space Next.js App
# This script builds and deploys the application to Azure App Service using Azure CLI

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
APP_NAME="ursafespace"
RESOURCE_GROUP="ursafespace_group"
DEPLOYMENT_PACKAGE="deployment-package"
ZIP_FILE="deployment.zip"

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to check if Azure CLI is installed and logged in
check_azure_cli() {
    print_status "Checking Azure CLI..."

    if ! command -v az &> /dev/null; then
        print_error "Azure CLI is not installed. Please install it first:"
        print_error "https://docs.microsoft.com/en-us/cli/azure/install-azure-cli"
        exit 1
    fi

    if ! az account show &> /dev/null; then
        print_error "Not logged into Azure CLI. Please run 'az login' first."
        exit 1
    fi

    print_success "Azure CLI is ready"
}

# Function to clean up previous deployment artifacts
cleanup() {
    print_status "Cleaning up previous deployment artifacts..."
    rm -rf $DEPLOYMENT_PACKAGE
    rm -f $ZIP_FILE
    print_success "Cleanup completed"
}

# Function to install dependencies and build the application
build_app() {
    print_status "Installing dependencies..."
    npm ci

    print_status "Building Next.js application..."
    npm run build

    if [ ! -d ".next" ]; then
        print_error "Build failed - .next directory not found"
        exit 1
    fi

    print_success "Application built successfully"
}

# Function to create deployment package
create_deployment_package() {
    print_status "Creating deployment package..."

    mkdir -p $DEPLOYMENT_PACKAGE

    # Copy essential files and directories
    cp -r .next $DEPLOYMENT_PACKAGE/
    cp -r src $DEPLOYMENT_PACKAGE/
    cp -r public $DEPLOYMENT_PACKAGE/

    # Copy configuration files
    cp package*.json $DEPLOYMENT_PACKAGE/
    cp web.config $DEPLOYMENT_PACKAGE/
    cp server.js $DEPLOYMENT_PACKAGE/
    cp run.js $DEPLOYMENT_PACKAGE/
    cp startup.sh $DEPLOYMENT_PACKAGE/
    cp .deployment $DEPLOYMENT_PACKAGE/
    cp next.config.js $DEPLOYMENT_PACKAGE/
    cp tsconfig.json $DEPLOYMENT_PACKAGE/
    cp postcss.config.mjs $DEPLOYMENT_PACKAGE/
    cp eslint.config.mjs $DEPLOYMENT_PACKAGE/
    cp next-env.d.ts $DEPLOYMENT_PACKAGE/

    # Make startup script executable
    chmod +x $DEPLOYMENT_PACKAGE/startup.sh

    print_status "Deployment package contents:"
    ls -la $DEPLOYMENT_PACKAGE/

    print_success "Deployment package created"
}

# Function to create ZIP file for deployment
create_zip() {
    print_status "Creating ZIP file for deployment..."

    cd $DEPLOYMENT_PACKAGE
    zip -r ../$ZIP_FILE ./*
    cd ..

    if [ ! -f "$ZIP_FILE" ]; then
        print_error "Failed to create ZIP file"
        exit 1
    fi

    print_success "ZIP file created: $ZIP_FILE ($(du -h $ZIP_FILE | cut -f1))"
}

# Function to deploy to Azure App Service
deploy_to_azure() {
    print_status "Deploying to Azure App Service..."

    # Check if the app exists
    if ! az webapp show --name $APP_NAME --resource-group $RESOURCE_GROUP &> /dev/null; then
        print_error "App Service '$APP_NAME' not found in resource group '$RESOURCE_GROUP'"
        print_error "Please check your app name and resource group"
        exit 1
    fi

    print_status "Uploading and deploying package..."

    # Deploy using ZIP deployment
    az webapp deployment source config-zip \
        --resource-group $RESOURCE_GROUP \
        --name $APP_NAME \
        --src $ZIP_FILE \
        --verbose

    if [ $? -eq 0 ]; then
        print_success "Deployment completed successfully!"
        print_status "App URL: https://$APP_NAME.azurewebsites.net"
    else
        print_error "Deployment failed"
        exit 1
    fi
}

# Function to check deployment status
check_deployment() {
    print_status "Checking deployment status..."

    # Get app status
    APP_STATE=$(az webapp show --name $APP_NAME --resource-group $RESOURCE_GROUP --query "state" -o tsv)
    print_status "App State: $APP_STATE"

    # Get recent logs
    print_status "Recent deployment logs:"
    az webapp log deployment list --name $APP_NAME --resource-group $RESOURCE_GROUP --query "[0:3].[id,status,message]" -o table
}

# Function to set environment variables (if needed)
set_environment_variables() {
    print_status "Checking environment variables..."

    # You can uncomment and modify these as needed
    # az webapp config appsettings set \
    #     --resource-group $RESOURCE_GROUP \
    #     --name $APP_NAME \
    #     --settings NEXTAUTH_URL="https://$APP_NAME.azurewebsites.net" \
    #     NODE_ENV="production"

    print_status "Environment variables are configured via Azure portal"
}

# Main deployment function
main() {
    print_status "Starting Azure deployment for $APP_NAME..."
    echo "=================================================="

    check_azure_cli
    cleanup
    build_app
    create_deployment_package
    create_zip
    set_environment_variables
    deploy_to_azure
    check_deployment

    echo "=================================================="
    print_success "Deployment process completed!"
    print_status "You can monitor your app at: https://$APP_NAME.azurewebsites.net"
    print_status "View logs with: az webapp log tail --name $APP_NAME --resource-group $RESOURCE_GROUP"
}

# Handle script arguments
case "${1:-deploy}" in
    "deploy")
        main
        ;;
    "build-only")
        print_status "Building application only..."
        check_azure_cli
        cleanup
        build_app
        create_deployment_package
        print_success "Build completed. Run './deploy-to-azure.sh' to deploy."
        ;;
    "logs")
        print_status "Fetching recent logs..."
        az webapp log tail --name $APP_NAME --resource-group $RESOURCE_GROUP
        ;;
    "status")
        check_deployment
        ;;
    "help")
        echo "Usage: $0 [deploy|build-only|logs|status|help]"
        echo ""
        echo "Commands:"
        echo "  deploy     - Full build and deployment (default)"
        echo "  build-only - Only build the application"
        echo "  logs       - Show real-time logs"
        echo "  status     - Check deployment status"
        echo "  help       - Show this help message"
        ;;
    *)
        print_error "Unknown command: $1"
        echo "Run '$0 help' for usage information"
        exit 1
        ;;
esac
