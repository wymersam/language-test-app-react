import nodemailer from "nodemailer";

export async function handler(event, context) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { name, email, course, media, level } = JSON.parse(event.body);

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: false, // true if using 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Course App" <${process.env.SMTP_USER}>`,
      to: process.env.TARGET_EMAIL,
      subject: `New ${level} course request`,
      text: `
        Name: ${name}
        Email: ${email}
        Course: ${course}
        Media: ${media}
        Level: ${level}
      `,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Error sending email:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
}
