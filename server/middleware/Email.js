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


// 📧 Shree SS Restaurant – Luxury Gold Theme (Color Upgrade Only)
const Send_booking = async (bookData) => {
  console.log(bookData)
  try {
    const formattedDate = new Date(bookData.bookingDate).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reservation Confirmed – Shree SS</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap');

          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            background: #FFF8F0;
            font-family: 'Inter', 'Helvetica Neue', sans-serif;
            padding: 30px 20px;
            margin: 0;
            line-height: 1.5;
            color: #1F2937;
          }

          .email-wrapper {
            max-width: 640px;
            margin: 0 auto;
            background: #FFFFFF;
            border-radius: 40px;
            box-shadow: 0 30px 80px rgba(217, 119, 6, 0.10), 0 10px 30px rgba(0,0,0,0.03);
            overflow: hidden;
            border: 1px solid #FCD34D;
          }

          .header {
            background: linear-gradient(135deg, #D97706, #F59E0B);
            padding: 48px 40px 36px;
            text-align: center;
            position: relative;
            border-bottom: none;
          }

          .header::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: linear-gradient(90deg, transparent, #FCD34D, #FFF8F0, #FCD34D, transparent);
          }

          .header-content {
            position: relative;
            z-index: 1;
          }

          .header .logo-icon {
            font-size: 48px;
            display: block;
            margin-bottom: 6px;
            filter: drop-shadow(0 2px 8px rgba(0,0,0,0.1));
          }

          .header h1 {
            font-family: 'Cormorant Garamond', serif;
            font-weight: 700;
            font-size: 38px;
            letter-spacing: 3px;
            color: #FFFFFF;
            margin: 0;
            text-shadow: 0 2px 8px rgba(0,0,0,0.1);
          }

          .header .restaurant-name {
            font-family: 'Cormorant Garamond', serif;
            font-weight: 400;
            font-size: 20px;
            letter-spacing: 8px;
            color: #FFF8F0;
            margin-top: 2px;
            text-transform: uppercase;
          }

          .header .cream-line {
            width: 70px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            margin: 14px auto 0;
            border-radius: 2px;
          }

          .content {
            padding: 40px 42px 32px;
            background: #FFFFFF;
          }

          .greeting {
            font-family: 'Cormorant Garamond', serif;
            font-weight: 700;
            font-size: 28px;
            color: #1F2937;
            margin-bottom: 2px;
            letter-spacing: 0.5px;
          }

          .greeting-sub {
            font-size: 15px;
            color: #6B7280;
            margin-bottom: 28px;
            font-weight: 300;
          }

          .reservation-id-box {
            background: #FFFBF5;
            border-radius: 16px;
            padding: 14px 24px;
            display: inline-block;
            font-size: 14px;
            color: #1F2937;
            border-left: 6px solid #D97706;
            margin-bottom: 32px;
            border: 1px solid #FCD34D;
            border-left-width: 6px;
          }

          .reservation-id-box strong {
            color: #D97706;
            font-weight: 700;
          }

          .detail-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px 28px;
            margin-bottom: 24px;
          }

          .detail-item {
            border-bottom: 1px solid #FCD34D;
            padding-bottom: 10px;
          }

          .detail-item .label {
            font-size: 10px;
            text-transform: uppercase;
            letter-spacing: 1.6px;
            color: #6B7280;
            font-weight: 600;
            display: block;
            margin-bottom: 2px;
          }

          .detail-item .value {
            font-size: 17px;
            font-weight: 400;
            color: #1F2937;
          }

          .detail-item .value .icon {
            color: #D97706;
            margin-right: 6px;
          }

          .status-section {
            margin: 8px 0 18px;
          }

          /* === CHANGED: Confirmed badge color to Gold === */
          .status-badge {
            display: inline-flex;
            align-items: center;
            background: #D97706;  /* Changed from green to gold */
            color: #FFFFFF;
            font-weight: 600;
            font-size: 13px;
            padding: 6px 20px 6px 16px;
            border-radius: 50px;
            border: none;
            letter-spacing: 0.3px;
          }

          .status-badge::before {
            content: '◆';
            margin-right: 8px;
            font-size: 10px;
            color: #FFFFFF;
          }

          .special-request-box {
            background: #FFFBF5;
            border-radius: 20px;
            padding: 18px 24px;
            border: 1px solid #FCD34D;
            margin: 16px 0 32px;
          }

          .special-request-box .label {
            font-size: 11px;
            text-transform: uppercase;
            letter-spacing: 1.4px;
            color: #6B7280;
            font-weight: 600;
            display: block;
            margin-bottom: 4px;
          }

          .special-request-box .request-text {
            font-family: 'Cormorant Garamond', serif;
            font-size: 20px;
            color: #1F2937;
            margin: 0;
            font-weight: 400;
            line-height: 1.4;
          }

          .special-request-box .request-text::before {
            content: '“';
            color: #D97706;
            font-size: 26px;
            margin-right: 4px;
          }

          .special-request-box .request-text::after {
            content: '”';
            color: #D97706;
            font-size: 26px;
            margin-left: 4px;
          }

          .note {
            font-size: 14px;
            color: #6B7280;
            border-top: 1px solid #FCD34D;
            padding-top: 24px;
            margin-top: 4px;
            text-align: center;
            font-weight: 300;
          }

          .note strong {
            color: #D97706;
            font-weight: 600;
          }

          .footer {
            background: #111827;
            padding: 30px 40px 26px;
            text-align: center;
            border-top: 3px solid #D97706;
          }

          .footer .contact-row {
            font-size: 14px;
            color: #E5E7EB;
            margin-bottom: 10px;
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 10px 20px;
          }

          .footer .contact-row a {
            color: #F59E0B;
            text-decoration: none;
            font-weight: 500;
            border-bottom: 1px dotted #D97706;
            padding-bottom: 1px;
            transition: border-color 0.2s;
          }

          .footer .contact-row a:hover {
            border-bottom: 1px solid #F59E0B;
          }

          .footer .social-links {
            margin: 12px 0 8px;
            font-size: 16px;
            letter-spacing: 12px;
            color: #D97706;
            opacity: 0.7;
          }

          .footer .tagline {
            font-family: 'Cormorant Garamond', serif;
            font-size: 22px;
            color: #E5E7EB;
            margin: 6px 0 2px;
            letter-spacing: 1px;
          }

          .footer .copyright {
            font-size: 12px;
            color: #6B7280;
            margin-top: 14px;
            letter-spacing: 0.3px;
          }

          @media (max-width: 520px) {
            .header {
              padding: 32px 20px 26px;
            }
            .header h1 {
              font-size: 30px;
            }
            .content {
              padding: 24px 20px 20px;
            }
            .detail-grid {
              grid-template-columns: 1fr;
              gap: 12px;
            }
            .footer {
              padding: 20px 20px;
            }
            .reservation-id-box {
              font-size: 13px;
              padding: 10px 16px;
            }
            .special-request-box .request-text {
              font-size: 18px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            <div class="header-content">
              <span class="logo-icon">🍽️</span>
              <h1>Reservation Confirmed</h1>
              <div class="restaurant-name">Shree SS Restaurant</div>
              <div class="cream-line"></div>
            </div>
          </div>

          <div class="content">
            <div class="greeting">Dear ${bookData.customerName || bookData.name},</div>
            <div class="greeting-sub">We are delighted to confirm your reservation.</div>

            <div class="reservation-id-box">
              <strong>Reservation ID</strong> &nbsp; #${bookData.reservationId || bookData._id}
            </div>

            <div class="detail-grid">
              <div class="detail-item">
                <span class="label">📞 Phone</span>
                <span class="value">${bookData.phone}</span>
              </div>
              <div class="detail-item">
                <span class="label">✉️ Email</span>
                <span class="value">${bookData.email}</span>
              </div>
              <div class="detail-item">
                <span class="label">🍽️ Table</span>
                <span class="value">${bookData.tableNo}</span>
              </div>
              <div class="detail-item">
                <span class="label">🏷️ Category</span>
                <span class="value">${bookData.category}</span>
              </div>
              <div class="detail-item">
                <span class="label">👥 Guests</span>
                <span class="value">${bookData.capecity}</span>
              </div>
              <div class="detail-item">
                <span class="label">📅 Date</span>
                <span class="value">${formattedDate}</span>
              </div>
              <div class="detail-item">
                <span class="label">⏰ Time</span>
                <span class="value">${bookData.bookingTime}</span>
              </div>
            </div>

            <div class="status-section">
              <!-- Updated: gold background for confirmed -->
              <span class="status-badge">${bookData.status ? 'Confirmed' : 'Pending'}</span>
            </div>

            ${bookData.specialRequest ? `
            <div class="special-request-box">
              <span class="label">📝 Special Request</span>
              <p class="request-text">${bookData.specialRequest}</p>
            </div>
            ` : ''}

            <div class="note">
              We look forward to welcoming you. <br>
              For any changes, please <strong>contact us</strong>.
            </div>
          </div>

          <div class="footer">
            <div class="contact-row">
              <a href="tel:+919876543210">📞 +91 98765 43210</a>
              <a href="mailto:info@shreessrestaurant.com">✉️ info@shreessrestaurant.com</a>
            </div>
            <div class="social-links">✦ ✦ ✦</div>
            <div class="tagline">Taste that stays in your heart ❤️</div>
            <div class="copyright">
              © ${new Date().getFullYear()} Shree SS Restaurant — All rights reserved.
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    const textContent = `
      ✨ RESERVATION CONFIRMED – SHREE SS RESTAURANT ✨
      -------------------------------------------------
      ID: ${bookData.reservationId || bookData._id}
      Name: ${bookData.customerName || bookData.name}
      Phone: ${bookData.phone}
      Email: ${bookData.email}
      Table: ${bookData.tableNo}
      Category: ${bookData.category}
      Guests: ${bookData.capecity}
      Date: ${formattedDate}
      Time: ${bookData.bookingTime}
      Status: ${bookData.status ? 'Confirmed' : 'Pending'}
      Special Request: ${bookData.specialRequest || 'None'}
      -------------------------------------------------
      Contact: +91 98765 43210 | info@shreessrestaurant.com
      Taste that stays in your heart ❤️
    `;

    const info = await transporter.sendMail({
      from: '"Shree SS Restaurant" <sainisss1244@gmail.com>',
      to: bookData.email,
      subject: `✨ Reservation Confirmed – Shree SS (ID: ${bookData.reservationId || bookData._id})`,
      text: textContent,
      html: htmlContent,
    });

    console.log(`✅ Booking email sent to ${bookData.email} (Message ID: ${info.messageId})`);
    return info;
  } catch (error) {
    console.error('❌ Failed to send booking email:', error);
    throw error;
  }
};




module.exports = {Send_VerifyCode, Send_booking};