import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendOtpEmail(email: string, otp: string) {
  const result = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "OTP",
    html: `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <title>Kode OTP Verifikasi</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f6f9fc;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }
    .header {
      background-color: #0f766e;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .content {
      padding: 30px;
      color: #333;
    }
    .otp-box {
      font-size: 28px;
      letter-spacing: 6px;
      font-weight: bold;
      text-align: center;
      background: #f0fdfa;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
      color: #0f766e;
    }
    .footer {
      font-size: 12px;
      color: #888;
      text-align: center;
      padding: 20px;
      background: #f9fafb;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #0f766e;
      color: white;
      text-decoration: none;
      border-radius: 6px;
      margin-top: 15px;
    }
  </style>
</head>
<body>

  <div class="container">

    <div class="header">
      <h2>Verifikasi Akun</h2>
      <p>Rumah Sakit Sentosa Makmur</p>
    </div>

    <div class="content">
      <p>Halo <strong>${email}</strong>,</p>

      <p>Kami menerima permintaan untuk verifikasi akun Anda pada sistem layanan Rumah Sakit Sentosa Makmur.</p>

      <p>Gunakan kode OTP berikut untuk melanjutkan proses verifikasi:</p>

      <div class="otp-box">
        ${otp}
      </div>

      <p>Kode OTP ini berlaku selama <strong>5 menit</strong>. Jangan berikan kode ini kepada siapa pun, termasuk pihak yang mengatasnamakan rumah sakit.</p>

      <p>Jika Anda tidak merasa melakukan permintaan ini, abaikan email ini.</p>

      <p>Terima kasih,<br>
      Tim IT Rumah Sakit Sentosa Makmur</p>

    </div>

    <div class="footer">
      Email ini dikirim otomatis. Mohon tidak membalas email ini.<br>
      © 2026 Rumah Sakit Sentosa Makmur. All rights reserved.
    </div>

  </div>

</body>
</html>`,
  });

  console.log("RESEND RESULT:", result);
}
