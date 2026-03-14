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
