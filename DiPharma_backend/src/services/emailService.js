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

export const sendShortlistNotification = async ({ name, email, role }) => {
  await sendEmail({
    to: email,
    subject: `🎉 Congratulations! You've been shortlisted — ${role}`,
    senderName: "HR Team – DiPharma",
    htmlContent: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0d0f26; color: #e4e4f8; padding: 36px; border-radius: 16px; border: 1px solid rgba(72,70,255,0.2);">
        <div style="text-align: center; margin-bottom: 28px;">
          <div style="display: inline-block; background: linear-gradient(135deg, #4846ff, #6d28d9); border-radius: 14px; padding: 14px 24px;">
            <span style="font-size: 2rem;">🎉</span>
          </div>
        </div>
        <h2 style="color: #a78bfa; margin: 0 0 8px; font-size: 1.5rem;">You've been Shortlisted!</h2>
        <p style="color: #c4c4e8; margin: 0 0 20px;">Hi <strong style="color: #fff;">${name}</strong>,</p>
        <p style="color: #c4c4e8; line-height: 1.7; margin: 0 0 16px;">
          We are pleased to inform you that after a careful review of your application, you have been
          <strong style="color: #a78bfa;">shortlisted</strong> for the position of
          <strong style="color: #fff;">${role}</strong> at <strong style="color: #fff;">DiPharma</strong>.
        </p>
        <div style="background: rgba(167,139,250,0.08); border: 1px solid rgba(167,139,250,0.2); border-radius: 12px; padding: 18px 20px; margin: 20px 0;">
          <p style="margin: 0; color: #c4c4e8; line-height: 1.7;">
            📞 Our <strong style="color: #a78bfa;">HR Team</strong> will be reaching out to you shortly to discuss the
            next steps in the selection process, including scheduling an interview.
          </p>
        </div>
        <p style="color: #c4c4e8; line-height: 1.7; margin: 0 0 8px;">
          Please keep an eye on your phone and email inbox. We look forward to connecting with you!
        </p>
        <br/>
        <p style="color: #c4c4e8; margin: 0;">Best regards,</p>
        <p style="color: #a78bfa; font-weight: 700; margin: 4px 0 0;">HR Team — DiPharma</p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0 16px;" />
        <p style="color: #555577; font-size: 11px; margin: 0;">
          This is an automated message from our recruitment system. Please do not reply to this email.
          For queries, contact us through the official DiPharma website.
        </p>
      </div>
    `,
  });
};

export const sendRejectionNotification = async ({ name, email, role }) => {
  await sendEmail({
    to: email,
    subject: `Your Application Update — ${role} | DiPharma`,
    senderName: "HR Team – DiPharma",
    htmlContent: `
      <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 560px; margin: 0 auto; background: #0d0f26; color: #e4e4f8; padding: 36px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.08);">
        <h2 style="color: #e4e4f8; margin: 0 0 8px; font-size: 1.4rem;">Application Status Update</h2>
        <p style="color: #c4c4e8; margin: 0 0 20px;">Hi <strong style="color: #fff;">${name}</strong>,</p>
        <p style="color: #c4c4e8; line-height: 1.7; margin: 0 0 16px;">
          Thank you for taking the time to apply for the position of
          <strong style="color: #fff;">${role}</strong> at <strong style="color: #fff;">DiPharma</strong>
          and for the interest you have shown in our organization.
        </p>
        <p style="color: #c4c4e8; line-height: 1.7; margin: 0 0 16px;">
          After careful consideration, we regret to inform you that we will not be moving forward
          with your application at this time. This was a difficult decision given the high calibre
          of candidates we received.
        </p>
        <div style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 18px 20px; margin: 20px 0;">
          <p style="margin: 0; color: #a3a3c2; line-height: 1.7;">
            💼 We encourage you to continue developing your skills and to watch for future openings at DiPharma
            that may be a better fit. We would be happy to consider your application again in the future.
          </p>
        </div>
        <p style="color: #c4c4e8; line-height: 1.7; margin: 0 0 8px;">
          We sincerely wish you the very best in your career journey.
        </p>
        <br/>
        <p style="color: #c4c4e8; margin: 0;">Best regards,</p>
        <p style="color: #a78bfa; font-weight: 700; margin: 4px 0 0;">HR Team — DiPharma</p>
        <hr style="border: none; border-top: 1px solid rgba(255,255,255,0.08); margin: 24px 0 16px;" />
        <p style="color: #555577; font-size: 11px; margin: 0;">
          This is an automated message from our recruitment system. Please do not reply to this email.
        </p>
      </div>
    `,
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
