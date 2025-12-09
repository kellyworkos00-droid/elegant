import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Create email transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_PORT === '465',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const {
      customerEmail,
      customerName,
      product,
      quantity,
      unitPrice,
      total,
      orderNo,
    } = await request.json()

    if (!customerEmail || !customerName || !product) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const subject = `Order Confirmation - ${orderNo} from Elegant Steel Hardware`

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
            .order-number { background-color: #f1f5f9; padding: 15px; border-radius: 6px; text-align: center; margin: 20px 0; }
            .order-number strong { color: #3b82f6; font-size: 20px; }
            .order-details { margin: 30px 0; }
            .detail-row { display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
            .detail-label { color: #64748b; font-weight: bold; }
            .detail-value { color: #1e293b; }
            .total-row { display: flex; justify-content: space-between; padding: 15px 0; background-color: #f1f5f9; padding: 15px; border-radius: 6px; margin-top: 20px; }
            .total-label { color: #1e293b; font-weight: bold; font-size: 16px; }
            .total-value { color: #10b981; font-weight: bold; font-size: 20px; }
            .button { display: inline-block; background-color: #3b82f6; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; }
            .button:hover { background-color: #2563eb; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b; font-size: 12px; }
            .powered-by { margin-top: 10px; font-weight: bold; color: #3b82f6; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Order Confirmation</h1>
              <p>Thank you for your order!</p>
            </div>
            
            <div class="order-number">
              <p style="margin: 0; color: #64748b; font-size: 12px;">Order Number</p>
              <strong>${orderNo}</strong>
            </div>
            
            <p>Hello <strong>${customerName}</strong>,</p>
            
            <p>We're pleased to confirm that your order has been received and is being processed. Here are your order details:</p>
            
            <div class="order-details">
              <div class="detail-row">
                <span class="detail-label">Product:</span>
                <span class="detail-value">${product}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Quantity:</span>
                <span class="detail-value">${quantity} unit${quantity > 1 ? 's' : ''}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">Unit Price:</span>
                <span class="detail-value">$${unitPrice.toFixed(2)}</span>
              </div>
              
              <div class="total-row">
                <span class="total-label">Order Total:</span>
                <span class="total-value">$${total.toFixed(2)}</span>
              </div>
            </div>
            
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Your order has been confirmed and is in our system</li>
              <li>We will begin fabrication and keep you updated on progress</li>
              <li>You will receive tracking information via email</li>
              <li>If you have any questions, please contact us immediately</li>
            </ul>
            
            <p><strong>Need help?</strong><br>
            For any inquiries about this order, please reply to this email or contact us at 0798293831</p>
            
            <div class="footer">
              <p>This is an automated order confirmation from Elegant Steel Hardware.</p>
              <div class="powered-by">Powered by Kelly Operating Systems (KellyOS)</div>
              <p>Contact: 0798293831</p>
              <p style="margin-top: 15px; color: #94a3b8;">Thank you for your business!</p>
            </div>
          </div>
        </body>
      </html>
    `

    const result = await transporter.sendMail({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM}>`,
      to: customerEmail,
      subject: subject,
      html: htmlContent,
      text: `Order Confirmation\n\nOrder Number: ${orderNo}\n\nProduct: ${product}\nQuantity: ${quantity}\nUnit Price: $${unitPrice.toFixed(2)}\nTotal: $${total.toFixed(2)}\n\nThank you for your order!`,
    })

    console.log('Order confirmation email sent:', result.messageId)
    return NextResponse.json({
      success: true,
      messageId: result.messageId,
      message: 'Order confirmation sent successfully'
    }, { status: 200 })
  } catch (error) {
    console.error('Error sending order confirmation email:', error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to send email',
      },
      { status: 500 }
    )
  }
}
