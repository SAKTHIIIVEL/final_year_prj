import axios from "axios";

const BREVO_URL = "https://api.brevo.com/v3/smtp/email";

const sendEmail = async ({ to, subject, htmlContent, attachments = [], senderName = "DiPharma" }) => {
  const BREVO_HEADERS = {
    "api-key": process.env.BREVO_API_KEY,
    "Content-Type": "application/json",
  };

  const emailData = {
    sender: { email: process.env.SENDER_EMAIL, name: senderName },
    to: Array.isArray(to) ? to : [{ email: to }],
    subject,
    htmlContent,
  };

  if (attachments.length > 0) {
    emailData.attachment = attachments;
  }

  return axios.post(BREVO_URL, emailData, { headers: BREVO_HEADERS });
};

export const sendApplicationNotification = async ({ name, email, phone, countryCode, role, message }, fileBase64, fileName) => {
  await sendEmail({
    to: process.env.OWNER_EMAIL,
    subject: `New Job Application - ${role}`,
    senderName: "Career Portal",
    htmlContent: `<h3>New Job Application</h3><p><b>Name:</b> ${name}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${countryCode} ${phone}</p><p><b>Job Position:</b> ${role}</p><p><b>Message:</b><br/>${message}</p>`,
    attachments: fileBase64 ? [{ content: fileBase64, name: fileName }] : [],
  });

  await sendEmail({
    to: email,
    subject: "Application Received",
    senderName: "HR Team",
    htmlContent: `<p>Hi ${name},</p><p>Thank you for applying for the <b>${role}</b> position.</p><p>We have received your application and will get back to you shortly.</p><br/><p>Best regards,<br/>HR Team</p>`,
  });
};

export const sendContactNotification = async ({ firstName, lastName, email, phone, countryCode, subject, message }) => {
  await sendEmail({
    to: process.env.OWNER_EMAIL,
    subject: `New Contact Message: ${subject}`,
    senderName: "Website Contact Form",
    htmlContent: `<h3>New Contact Form Submission</h3><p><b>Name:</b> ${firstName} ${lastName}</p><p><b>Email:</b> ${email}</p><p><b>Phone:</b> ${countryCode} ${phone}</p><p><b>Subject:</b> ${subject}</p><p><b>Message:</b><br/>${message}</p>`,
  });

  await sendEmail({
    to: email,
    subject: "We received your message",
    senderName: "Support Team",
    htmlContent: `<p>Hi ${firstName},</p><p>Thank you for contacting us.</p><p>We've received your message regarding <b>${subject}</b> and will get back to you shortly.</p><br/><p>Best regards,<br/>Support Team</p>`,
  });
};

export const sendAdminCredentials = async ({ name, email, password }) => {
  await sendEmail({
    to: email,
    subject: "Welcome to DiPharma Admin Panel",
    senderName: "DiPharma Admin",
    htmlContent: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 520px; margin: 0 auto; background: #0d0f36; color: #e4e4f8; padding: 32px; border-radius: 16px;">
        <h2 style="color: #4846ff; margin-top: 0;">Welcome to DiPharma! 🎉</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Your admin account has been created. You can now log in to the DiPharma Admin Panel.</p>
        <div style="background: rgba(72, 70, 255, 0.1); border: 1px solid rgba(72, 70, 255, 0.3); border-radius: 12px; padding: 20px; margin: 20px 0;">
          <p style="margin: 0 0 8px 0;"><strong>Login URL:</strong> <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/login" style="color: #4846ff;">${process.env.FRONTEND_URL || 'http://localhost:5173'}/admin/login</a></p>
          <p style="margin: 0 0 8px 0;"><strong>Email:</strong> ${email}</p>
          <p style="margin: 0;"><strong>Password:</strong> ${password}</p>
        </div>
        <p style="color: #a3a3c2; font-size: 13px;">Please change your password after your first login for security.</p>
        <br/>
        <p>Best regards,<br/><strong>DiPharma Team</strong></p>
      </div>
    `,
  });
};
