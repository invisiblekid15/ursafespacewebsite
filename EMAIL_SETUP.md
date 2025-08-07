# Email Setup Instructions for UrSafeSpace

This guide will help you configure Gmail with an App Password to enable the appointment booking email functionality.

## Prerequisites

- A Gmail account
- 2-Step Verification enabled on your Google Account

## Step-by-Step Setup

### 1. Enable 2-Step Verification (if not already enabled)

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click **2-Step Verification**
4. Follow the prompts to set up 2-Step Verification if it's not already enabled

### 2. Generate an App Password

1. Go to your [Google Account settings](https://myaccount.google.com/)
2. Click on **Security** in the left sidebar
3. Under "Signing in to Google", click **App passwords**
   - You may need to sign in again
4. At the bottom, click **Select app** and choose **Mail**
5. Click **Select device** and choose **Other (custom name)**
6. Type "UrSafeSpace Website" or any name you prefer
7. Click **Generate**
8. Google will display a 16-character password (e.g., `abcd efgh ijkl mnop`)
9. **Copy this password** - you won't be able to see it again

### 3. Configure Environment Variables

1. Open the `.env.local` file in your project root
2. Update the following variables with your actual values:

```env
# Your Gmail address
GMAIL_USER=your-actual-email@gmail.com

# Your Gmail App Password (16 characters, remove spaces)
GMAIL_APP_PASSWORD=abcdefghijklmnop

# Email where appointment requests will be sent (optional)
OWNER_EMAIL=your-business-email@domain.com
```

### 4. Important Security Notes

- **Never commit your `.env.local` file** to version control
- The `.env.local` file is already in `.gitignore`
- Use the App Password, not your regular Gmail password
- If you suspect the App Password is compromised, revoke it and generate a new one

### 5. Testing the Setup

1. Start your development server: `npm run dev`
2. Try booking an appointment through the website
3. Check that emails are received at the specified `OWNER_EMAIL`
4. Verify that confirmation emails are sent to the client

### 6. Troubleshooting

#### Common Issues:

**Error: "Invalid login"**
- Make sure you're using the App Password, not your regular password
- Ensure 2-Step Verification is enabled
- Remove any spaces from the App Password

**Error: "Authentication failed"**
- Double-check the Gmail address is correct
- Verify the App Password was copied correctly
- Try generating a new App Password

**Emails not being received**
- Check spam/junk folders
- Verify the `OWNER_EMAIL` is set correctly
- Check the server logs for error messages

#### Getting Help:

1. Check the browser console for error messages
2. Check the server logs in your terminal
3. Verify all environment variables are set correctly

### 7. Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add the environment variables to your hosting platform's environment variables section
2. Never include actual credentials in your code
3. Use the same Gmail App Password for production

### 8. Email Templates

The system sends two types of emails:

1. **To Owner**: Notification of new appointment requests with all client details
2. **To Client**: Confirmation email with appointment details and next steps

Both emails are automatically formatted with professional HTML templates.

---

## Security Best Practices

- Regularly review and rotate App Passwords
- Monitor your Gmail account for any suspicious activity
- Use a dedicated business Gmail account if possible
- Keep your environment variables secure and never share them

## Need Help?

If you encounter any issues with the email setup, check the troubleshooting section above or review the API routes in:
- `/src/app/api/book-appointment/route.ts`
- `/src/app/api/contact-support/route.ts`
