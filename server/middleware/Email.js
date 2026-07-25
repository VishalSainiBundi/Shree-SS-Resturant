const transporter = require("./Emailconfig");

const Send_VerifyCode = async (email, verifycode) => {
  console.log("📧 Sending verify code to:", email, "| Code:", verifycode);

  try {
    const response = await transporter.sendMail({
      from: '"Shree SS Restaurant" <sainisss1244@gmail.com>',
      to: email,
      subject: "Your Verification Code - Shree SS Restaurant",
      text: `Your verification code is: ${verifycode}`,
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Verify Your Account - Shree SS</title>
</head>
<body style="margin:0;padding:0;background:#f8f4f0;font-family:'Segoe UI',Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4f0;padding:40px 20px;">
<tr>
<td align="center">

<!-- Main Container -->
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.08);">

<!-- Header -->
<tr>
<td style="background:linear-gradient(135deg,#e67e22,#f39c12);padding:45px 30px;text-align:center;">
  <h1 style="margin:0;color:#ffffff;font-size:32px;font-weight:700;letter-spacing:1px;">
    🍽️ Shree SS
  </h1>
  <p style="margin:8px 0 0;color:#fff5e6;font-size:16px;font-weight:300;letter-spacing:2px;">
    RESTAURANT
  </p>
  <p style="margin:12px 0 0;color:#ffd9b3;font-size:14px;font-weight:300;">
    Taste that stays in your heart ❤️
  </p>
</td>
</tr>

<!-- Body -->
<tr>
<td style="padding:45px 40px 30px;">

  <h2 style="margin-top:0;color:#2c3e50;font-size:28px;font-weight:600;">
    Hello, Guest!
  </h2>

  <p style="font-size:16px;color:#5d6d7e;line-height:28px;margin:10px 0 0;">
    Thank you for choosing <strong style="color:#e67e22;">Shree SS Restaurant</strong>.
    Please use the verification code below to complete your registration.
  </p>

  <!-- Code Card -->
  <table width="100%" cellpadding="0" cellspacing="0" style="margin:35px 0;">
    <tr>
      <td align="center">
        <div style="
          display:inline-block;
          padding:30px 50px;
          border-radius:16px;
          background:linear-gradient(135deg,#fff9f0,#fef0e0);
          border:2px solid #f39c12;
          box-shadow:0 8px 25px rgba(243,156,18,0.15);
        ">
          <p style="
            margin:0 0 10px;
            font-size:13px;
            color:#8e7a6a;
            letter-spacing:3px;
            text-transform:uppercase;
            font-weight:600;
          ">
            Your Verification Code
          </p>
          <h1 style="
            margin:0;
            font-size:48px;
            letter-spacing:12px;
            color:#d35400;
            font-weight:700;
            font-family:'Courier New',monospace;
          ">
            ${verifycode}
          </h1>
          <p style="
            margin:10px 0 0;
            font-size:13px;
            color:#a0856a;
          ">
            Valid for 10 minutes
          </p>
        </div>
      </td>
    </tr>
  </table>

  <!-- Security Notice -->
  <div style="
    background:#fef9f4;
    padding:20px 24px;
    border-left:5px solid #e67e22;
    border-radius:10px;
    margin:10px 0 20px;
  ">
    <p style="margin:0;font-size:14px;color:#5d6d7e;line-height:24px;">
      🔒 For your security, <strong>never share</strong> this code with anyone.
      If you didn't request this, please ignore this email.
    </p>
  </div>

  <!-- Optional CTA Button (if you have a verification page) -->
  <table width="100%" cellpadding="0" cellspacing="0" style="margin:30px 0 10px;">
    <tr>
      <td align="center">
        <a href="https://shreess.com/verify?code=${verifycode}" 
           style="
             display:inline-block;
             padding:14px 45px;
             background:linear-gradient(135deg,#e67e22,#f39c12);
             color:#ffffff;
             font-size:16px;
             font-weight:600;
             text-decoration:none;
             border-radius:50px;
             box-shadow:0 8px 20px rgba(230,126,34,0.3);
             transition:0.3s;
           ">
          ✅ Verify Now
        </a>
      </td>
    </tr>
  </table>

  <p style="font-size:14px;color:#95a5a6;text-align:center;margin:20px 0 0;">
    If the button doesn't work, copy and paste the code manually.
  </p>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="
  background:#faf8f7;
  padding:30px 40px;
  text-align:center;
  border-top:1px solid #eee8e3;
">

  <h3 style="
    margin:0;
    color:#e67e22;
    font-size:20px;
    font-weight:600;
  ">
    Shree SS Restaurant
  </h3>

  <p style="
    margin:10px 0 0;
    font-size:14px;
    color:#8e7a6a;
    line-height:24px;
  ">
    Authentic Indian Cuisine • Warm Hospitality
  </p>

  <p style="
    margin:15px 0 0;
    font-size:13px;
    color:#b0a094;
  ">
    📞 +91 98765 43210 &nbsp;|&nbsp; 📧 hello@shreess.com
  </p>

  <div style="
    margin:18px 0 0;
    font-size:22px;
    letter-spacing:12px;
    color:#d35400;
  ">
    ⭐ ⭐ ⭐ ⭐ ⭐
  </div>

  <p style="
    margin:20px 0 0;
    font-size:12px;
    color:#bfb2a6;
  ">
    © ${new Date().getFullYear()} Shree SS Restaurant. All rights reserved.
    <br>
    <span style="color:#d35400;">❤️</span> Taste that stays in your heart
  </p>

</td>
</tr>

</table>

</td>
</tr>
</table>

</body>
</html>
`,
    });

    console.log("✅ Email Sent Successfully");
    console.log("Message ID:", response.messageId);
    console.log("Accepted:", response.accepted);
    console.log("Rejected:", response.rejected);

    return { success: true, info: response };
  } catch (error) {
    console.error("❌ Email Error:", error.message);
    throw error;
  }
};

module.exports = Send_VerifyCode;