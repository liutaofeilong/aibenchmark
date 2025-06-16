import { defineEventHandler, readBody } from 'h3'
import nodemailer from 'nodemailer'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { to, subject, content } = body

  // Create a test account if no email configuration is provided
  const testAccount = await nodemailer.createTestAccount()

  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || testAccount.user,
      pass: process.env.SMTP_PASS || testAccount.pass,
    },
  })

  try {
    // Send email
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM || '"AI Analysis" <analysis@example.com>',
      to: to || 'test@example.com',
      subject: subject || 'Company Analysis Report',
      html: content,
    })

    // If using ethereal email, return the preview URL
    const previewUrl = nodemailer.getTestMessageUrl(info)

    return {
      success: true,
      messageId: info.messageId,
      previewUrl: process.env.NODE_ENV === 'development' ? previewUrl : null
    }
  } catch (error) {
    console.error('Failed to send email:', error)
    return {
      success: false,
      error: 'Failed to send email'
    }
  }
}) 