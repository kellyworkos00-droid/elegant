# Email Invitation System Setup Guide

## Overview
The KellyOS system now includes automated email invitations that are sent to team members when they are added to the system. This guide explains how to configure and use the email functionality.

## Features
✅ **Automated Invitations**: Email invitations sent automatically when a new user is created  
✅ **Professional Templates**: Branded HTML email templates with Kelly OS styling  
✅ **Error Handling**: Graceful error handling if email fails to send  
✅ **User Feedback**: Toast notifications showing success/failure status  
✅ **Role-Based Emails**: Invitations include the assigned user role  

## Setup Instructions

### Step 1: Configure SMTP Email Service

The system uses Nodemailer for email delivery. You need to configure an SMTP server. **Gmail is recommended for testing:**

#### Using Gmail:
1. Go to [Google Account Security](https://myaccount.google.com/security)
2. Enable **2-Step Verification** (if not already enabled)
3. Create an **App Password**:
   - Go to [Google Account App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
4. Update `.env.local`:
   ```env
   SMTP_HOST="smtp.gmail.com"
   SMTP_PORT="587"
   SMTP_USER="your-email@gmail.com"
   SMTP_PASSWORD="your-16-character-app-password"
   SMTP_FROM="noreply@elegantsteelhw.com"
   SMTP_FROM_NAME="Elegant Steel Hardware"
   ```

#### Using Other Email Providers:
- **Microsoft 365**: Use `smtp.office365.com` port 587
- **SendGrid**: Use `smtp.sendgrid.net` port 587 with API key
- **AWS SES**: Use `email-smtp.region.amazonaws.com` port 587

### Step 2: Test Email Configuration

1. Navigate to the **Admin → Users** page
2. Click **"Add New User"**
3. Fill in user details:
   - Full Name: "Test User"
   - Email: A valid email address you can check
   - Phone: Any phone number
   - Role: Admin or Employee
4. Click **"Create User"**

### Expected Behavior

**Success Notification (Green):**
```
✓ User "Test User" created successfully! 
  Invitation email sent to test@example.com
```

**Error Notification (Red):**
```
✗ User "Test User" created, but email failed to send
  (SMTP authentication failed)
```

## Email Templates

### Invitation Email
When a new user is created, they receive an invitation email with:
- Welcome message with their name
- Assigned role information
- Company name (Elegant Steel Hardware)
- Link to join the system
- Kelly OS branding and contact information

### Welcome Email
(Configured but not yet integrated)
Sent after user accepts invitation with:
- Feature overview
- Getting started guide
- System capabilities

## Implementation Details

### Files Created/Modified

**`src/lib/email.ts`** - Email utility functions
- `sendInvitationEmail()` - Sends invitation emails to new users
- `sendWelcomeEmail()` - Sends welcome emails (prepared for future use)

**`src/app/api/users/route.ts`** - Updated API endpoint
- POST endpoint now calls `sendInvitationEmail()` after user creation
- Returns email status in response: `emailSent: true/false`
- Gracefully handles email failures without blocking user creation

**`src/app/admin/users/page.tsx`** - Updated UI
- Added notification system for success/error feedback
- Shows loading state during user creation and email sending
- Displays email status in toast notification
- Auto-dismisses notification after 5 seconds

### Environment Variables Required

```env
# Email Configuration
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="your-email@gmail.com"
SMTP_PASSWORD="your-app-password"
SMTP_FROM="noreply@elegantsteelhw.com"
SMTP_FROM_NAME="Elegant Steel Hardware"

# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"  # Update for production
```

## Troubleshooting

### Email Not Sending

**Issue**: "SMTP authentication failed"
- Verify SMTP_USER and SMTP_PASSWORD are correct
- If using Gmail, ensure App Password is 16 characters (not regular password)
- Check 2-Factor Authentication is enabled on Google Account

**Issue**: "getaddrinfo ENOTFOUND"
- Verify SMTP_HOST is correct
- Check internet connection

**Issue**: "Email timeout"
- Verify SMTP_PORT matches your email provider (usually 587 or 465)
- Check firewall/network blocking SMTP port

### Emails Going to Spam

- Gmail may mark emails as spam if sender domain doesn't have SPF/DKIM records
- For production, set up proper email authentication
- Consider using professional email services like SendGrid or AWS SES

## Production Deployment

For production use:

1. **Update NEXT_PUBLIC_APP_URL** in `.env.local` to your actual domain
2. **Use professional email service**:
   - SendGrid (free tier available)
   - AWS SES (cheapest option)
   - Mailgun
3. **Configure email authentication**:
   - Add SPF record to your domain
   - Add DKIM record to your domain
   - Add DMARC policy
4. **Update SMTP_FROM** to use your actual domain email address
5. **Test thoroughly** before going live

## Code Examples

### Sending Email Manually

```typescript
import { sendInvitationEmail } from '@/lib/email'

const result = await sendInvitationEmail({
  recipientEmail: 'user@example.com',
  recipientName: 'John Doe',
  senderName: 'Admin',
  role: 'Employee',
  companyName: 'Elegant Steel Hardware',
  systemUrl: 'http://localhost:3000'
})

if (result.success) {
  console.log('Email sent:', result.messageId)
} else {
  console.error('Email failed:', result.error)
}
```

## Future Enhancements

Planned features for email system:
- ✅ Invitation emails (COMPLETED)
- ⏳ Welcome emails after account activation
- ⏳ Order confirmation emails
- ⏳ Invoice/receipt emails
- ⏳ Task assignment notifications
- ⏳ Weekly project updates
- ⏳ Password reset emails
- ⏳ Email verification for new accounts

## Support

For issues with email configuration:
1. Check the console output for error messages
2. Verify all environment variables are set correctly
3. Test SMTP credentials with a tool like [Nodemailer Test](https://nodemailer.com/smtp/testing/)
4. Contact your email provider for SMTP settings

---

**Powered by Kelly Operating Systems (KellyOS)**  
Contact: 0798293831
