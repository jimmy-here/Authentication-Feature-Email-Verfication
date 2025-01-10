const nodemailer = require("nodemailer");

module.exports = async (email, subject, param) => {
  try {
    // Define the protocol and domain based on the environment
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
    const domain = process.env.NODE_ENV === 'production' ? 'yourdomain.com' : 'localhost:8080';

    // Construct the verification link dynamically using the provided parameters
    const verificationLink = `${protocol}://${domain}/api/users/${encodeURIComponent(param.id)}/verify/${encodeURIComponent(param.token)}`;

    // Create the transporter for nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: Number(process.env.EMAIL_PORT),
      secure: Boolean(process.env.SECURE),
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    // Send the email with the dynamic verification link
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: `Click the link to verify your account: ${verificationLink}`,
      html: `<p>Click the link to verify your account: <a href="${verificationLink}" target="_blank">Verify your account</a></p>`, // Ensure it's an anchor tag
    });

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Email not sent!");
    console.log(error);
    return error;
  }
};
