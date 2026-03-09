const nodemailer = require("nodemailer");

const sendOtp = async (email, name, otp) => {

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP Verification Code",
    html: `
      <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:20px;">
        
        <div style="max-width:500px; margin:auto; background:#ffffff; padding:30px; border-radius:10px; text-align:center;">
          
          <h2 style="color:#333;">Email Verification</h2>
          
          <p style="font-size:16px;">Hello <b>${name}</b>,</p>
          
          <p style="font-size:15px; color:#555;">
            Your email <b>${email}</b> requested verification.
          </p>
          
          <p style="font-size:15px; color:#555;">
            Use the OTP below to complete your verification.
          </p>

          <div style="
            font-size:30px;
            letter-spacing:5px;
            font-weight:bold;
            background:#f1f1f1;
            padding:15px;
            margin:20px 0;
            border-radius:8px;
            color:#333;">
            ${otp}
          </div>

          <p style="color:#777; font-size:14px;">
            This OTP is valid for 5 minutes.
          </p>

          <hr style="margin:20px 0">

          <p style="font-size:13px; color:#999;">
            If you did not request this OTP, please ignore this email.
          </p>

        </div>

      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendOtp;