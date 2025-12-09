import nodemailer from 'nodemailer'

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

interface InvitationEmailParams {
  recipientEmail: string
  recipientName: string
  senderName: string
  role: string
  companyName: string
  systemUrl: string
}

export async function sendInvitationEmail({
  recipientEmail,
  recipientName,
  senderName,
  role,
  companyName,
  systemUrl,
}: InvitationEmailParams) {
  try {
    const subject = `You're invited to join ${companyName} on KellyOS`
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #3b82f6; padding-bottom: 20px; }
            .header h1 { color: #1e293b; margin: 0; }
            .header p { color: #64748b; margin: 5px 0 0 0; }
            .content { margin: 30px 0; }
            .content h2 { color: #1e293b; }
            .content p { color: #475569; line-height: 1.6; }
            .info-box { background-color: #f1f5f9; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #3b82f6; }
            .info-box strong { color: #1e293b; }
            .button { display: inline-block; background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .button:hover { background-color: #2563eb; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; }
            .powered-by { margin-top: 10px; font-weight: bold; color: #3b82f6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to ${companyName}</h1>
              <p>Powered by KellyOS - Smart Business Management System</p>
            </div>
            
            <div class="content">
              <p>Hello <strong>${recipientName}</strong>,</p>
              
              <p>${senderName} has invited you to join <strong>${companyName}</strong> on the KellyOS platform!</p>
              
              <div class="info-box">
                <p><strong>Your Role:</strong> ${role}</p>
                <p><strong>Company:</strong> ${companyName}</p>
              </div>
              
              <p>KellyOS is a comprehensive business management system that helps teams:</p>
              <ul>
                <li>Manage projects and orders efficiently</li>
                <li>Track inventory and financial operations</li>
                <li>Monitor customer accounts and statements</li>
                <li>Collaborate on tasks and projects</li>
                <li>Access real-time business analytics</li>
              </ul>
              
              <p><strong>To accept this invitation and get started:</strong></p>
              <a href="${systemUrl}" class="button">Join Now</a>
              
              <p>If the button doesn't work, copy and paste this link in your browser:<br>
              <code>${systemUrl}</code></p>
            </div>
            
            <div class="footer">
              <p>This is an automated invitation email from KellyOS.</p>
              <p>If you didn't expect this invitation, please contact your administrator.</p>
              <div class="powered-by">Powered by Kelly Operating Systems (KellyOS)</div>
              <p>Contact: 0798293831</p>
            </div>
          </div>
        </body>
      </html>
    `

    const result = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
      text: `You're invited to join ${companyName}!\n\nRole: ${role}\n\nJoin here: ${systemUrl}`,
    })

    console.log('Email sent successfully:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

export async function sendWelcomeEmail({
  recipientEmail,
  recipientName,
  companyName,
}: {
  recipientEmail: string
  recipientName: string
  companyName: string
}) {
  try {
    const subject = `Welcome to ${companyName} - Your KellyOS Account is Ready`
    
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; background-color: #f5f5f5; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
            .header { text-align: center; margin-bottom: 30px; background: linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%); color: white; padding: 30px; border-radius: 6px; }
            .header h1 { margin: 0; }
            .content { margin: 30px 0; }
            .content h2 { color: #1e293b; }
            .content p { color: #475569; line-height: 1.6; }
            .features { margin: 20px 0; }
            .feature-item { background-color: #f1f5f9; padding: 15px; margin: 10px 0; border-radius: 6px; border-left: 4px solid #3b82f6; }
            .feature-item strong { color: #1e293b; }
            .button { display: inline-block; background-color: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .button:hover { background-color: #059669; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; }
            .powered-by { margin-top: 10px; font-weight: bold; color: #3b82f6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome, ${recipientName}! 🎉</h1>
              <p>Your account is ready to go</p>
            </div>
            
            <div class="content">
              <p>You're now part of the ${companyName} team on KellyOS!</p>
              
              <p>Here's what you can do:</p>
              
              <div class="features">
                <div class="feature-item">
                  <strong>📊 Dashboard</strong><br>
                  View real-time business metrics and analytics
                </div>
                <div class="feature-item">
                  <strong>📋 Project Management</strong><br>
                  Create and track projects, manage tasks and timelines
                </div>
                <div class="feature-item">
                  <strong>📦 Inventory Tracking</strong><br>
                  Monitor stock levels and material availability
                </div>
                <div class="feature-item">
                  <strong>💰 Financial Management</strong><br>
                  Track income, expenses, and profitability
                </div>
                <div class="feature-item">
                  <strong>👥 Team Collaboration</strong><br>
                  Work together on orders, quotes, and customer accounts
                </div>
              </div>
              
              <p><strong>Get Started:</strong></p>
              <a href="http://localhost:3000" class="button">Access Your Dashboard</a>
            </div>
            
            <div class="footer">
              <p>If you have any questions, contact your administrator or support team.</p>
              <div class="powered-by">Powered by Kelly Operating Systems (KellyOS)</div>
              <p>Contact: 0798293831</p>
            </div>
          </div>
        </body>
      </html>
    `

    const result = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
    })

    console.log('Welcome email sent:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}
