# Azure Deployment Configuration Guide

This guide explains how to deploy the UrSafeSpace Next.js application to Azure Web Apps with proper email functionality.

## Overview

The application is configured for Azure deployment with:
- Custom server setup for Next.js API routes
- Environment variable management
- Email functionality using Gmail SMTP
- Automated GitHub Actions deployment

## Prerequisites

1. **Azure Web App** created and configured
2. **GitHub repository** with proper secrets configured
3. **Gmail account** with App Password generated
4. **Azure CLI** (optional, for manual deployment)

## GitHub Secrets Configuration

In your GitHub repository, go to **Settings > Secrets and variables > Actions** and add the following secrets:

### Azure Secrets (Already configured)
```
AZUREAPPSERVICE_CLIENTID_87FEFBE2234841E0B2D30248C5EAD5F1
AZUREAPPSERVICE_TENANTID_B9C75E24027E40CBAD4B41312C0B8B87
AZUREAPPSERVICE_SUBSCRIPTIONID_20553EF97A1040CD9F6F655DD94AE874
```

### Email Configuration Secrets (Add these)
```
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
OWNER_EMAIL=owner@ursafespace.com
NEXTAUTH_URL=https://ursafespace.azurewebsites.net
NEXTAUTH_SECRET=your-secure-random-string
```

## Azure App Service Configuration

### Environment Variables

In the Azure Portal, go to your App Service and configure these **Application Settings**:

```
NODE_ENV=production
GMAIL_USER=your-email@gmail.com
GMAIL_APP_PASSWORD=your-16-character-app-password
OWNER_EMAIL=owner@ursafespace.com
NEXTAUTH_URL=https://ursafespace.azurewebsites.net
NEXTAUTH_SECRET=your-secure-random-string
WEBSITE_NODE_DEFAULT_VERSION=20.x
```

### General Settings

- **Runtime stack**: Node 20 LTS
- **Platform**: 64 Bit
- **Always On**: Enabled (recommended)
- **ARR Affinity**: Disabled (for better performance)

## Deployment Process

### Automatic Deployment (Recommended)

1. **Push to main branch** - GitHub Actions will automatically:
   - Install dependencies
   - Build the Next.js application
   - Run tests (if available)
   - Deploy to Azure

2. **Monitor deployment** in GitHub Actions tab

### Manual Deployment

If needed, you can deploy manually:

```bash
# Build the application
npm install
npm run build

# Deploy using Azure CLI
az webapp deployment source config-zip \
  --resource-group your-resource-group \
  --name ursafespace \
  --src deployment.zip
```

## File Structure for Deployment

The deployment package includes:

```
deployment-package/
├── .next/                 # Built Next.js application
├── public/               # Static assets
├── node_modules/         # Dependencies
├── package.json          # Package configuration
├── package-lock.json     # Dependency lock file
├── web.config           # IIS/Azure configuration
└── server.js            # Custom server for Azure
```

## Configuration Files

### web.config
- Configures IIS URL rewriting for Next.js routes
- Handles API routes properly
- Sets security headers
- Enables compression
- Protects sensitive files

### server.js
- Custom Node.js server for Azure
- Handles Next.js API routes
- Manages static file serving
- Provides proper error handling

## Email Functionality

### Gmail Setup
1. Enable 2-Step Verification on your Gmail account
2. Generate an App Password:
   - Google Account → Security → App passwords
   - Select "Mail" and generate password
3. Use the 16-character password (not your regular Gmail password)

### Email Flow
1. User submits appointment/contact form
2. API validates input and sends emails via Gmail SMTP
3. Owner receives notification email
4. Client receives confirmation email

## Troubleshooting

### Common Issues

**Build Failures:**
- Check that all environment variables are set in GitHub Secrets
- Verify Node.js version compatibility
- Review build logs in GitHub Actions

**Email Not Working:**
- Verify Gmail App Password is correct
- Check that GMAIL_USER and OWNER_EMAIL are properly set
- Ensure 2-Step Verification is enabled on Gmail account

**Routing Issues:**
- Verify web.config is included in deployment
- Check that server.js is properly configured
- Review Azure App Service logs

**Environment Variables:**
- Ensure all secrets are set in both GitHub and Azure
- Verify NEXTAUTH_URL matches your domain
- Check that NODE_ENV is set to "production"

### Debugging

**View Logs:**
- Azure Portal → App Service → Log stream
- GitHub Actions → View workflow logs
- Browser developer tools for client-side issues

**Test Email Functionality:**
```bash
# Test API endpoints locally
curl -X POST http://localhost:3000/api/book-appointment \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","serviceType":"individual"}'
```

## Security Considerations

### Environment Variables
- Never commit sensitive data to the repository
- Use GitHub Secrets for CI/CD
- Use Azure App Settings for production environment variables
- Rotate secrets regularly

### Email Security
- Use App Passwords instead of regular Gmail passwords
- Monitor Gmail account for suspicious activity
- Consider using a dedicated business email account

### Application Security
- Keep dependencies updated
- Monitor for security vulnerabilities
- Use HTTPS in production (enabled by default on Azure)

## Performance Optimization

### Caching
- Azure CDN for static assets (optional)
- Browser caching configured in web.config
- Next.js static optimization enabled

### Monitoring
- Enable Application Insights (recommended)
- Monitor response times and error rates
- Set up alerts for critical issues

## Maintenance

### Regular Tasks
- Monitor deployment status
- Review application logs
- Update dependencies
- Backup important data
- Test email functionality

### Updates
- Push changes to main branch for automatic deployment
- Monitor GitHub Actions for successful deployments
- Test functionality after updates

## Support

### Resources
- [Azure App Service Documentation](https://docs.microsoft.com/en-us/azure/app-service/)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

### Getting Help
- Check Azure App Service logs
- Review GitHub Actions workflow logs
- Verify all environment variables are properly set
- Test email configuration with Gmail

---

## Quick Deployment Checklist

- [ ] Azure Web App created
- [ ] GitHub Secrets configured
- [ ] Gmail App Password generated
- [ ] Environment variables set in Azure
- [ ] Code pushed to main branch
- [ ] Deployment successful in GitHub Actions
- [ ] Website accessible at Azure URL
- [ ] Email functionality tested
- [ ] All forms working properly

The application should now be successfully deployed and fully functional on Azure! 🚀