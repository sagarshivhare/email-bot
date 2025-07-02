import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ...existing code...
export const forwardEmail = async (data) => {
  // Find the maximum length among all arrays
  const maxLength = Math.max(
    data.mobile?.length || 0,   
    data.emails?.length || 0
  );

  // Build table rows
  const tableRows = Array.from({ length: maxLength })
    .map(
      (_, i) => `
    <tr>
      <td>${data.mobile && data.mobile[i] ? data.mobile[i] : ""}</td>
      <td>${data.emails && data.emails[i] ? data.emails[i] : ""}</td>
    </tr>
  `
    )
    .join("");

  const htmlTable = `
    <p>Sender Name: ${data.name}</p>
    <p>From : ${data.from}</p>
    <table border="1" cellpadding="5" cellspacing="0">
      <thead>
        <tr>
          <th>Mobile</th>
          <th>Emails</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_FORWARD,
    subject: `Extracted Data: ${data.subject}`,
    html: htmlTable,
  });
};
// ...existing code...
