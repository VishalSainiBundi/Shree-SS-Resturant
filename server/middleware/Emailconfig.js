const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user_email,
    pass: process.env.user_pass.trim(), // trim in case of accidental spaces in .env
  },
});

// Verify SMTP connection once at startup — logs clearly if credentials are wrong
transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Email transporter connection failed:", error.message);
    console.error("   Check user_email and user_pass in server/.env");
  } else {
    console.log("✅ Email transporter ready — SMTP connected successfully");
  }
});

module.exports = transporter;
