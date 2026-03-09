const sendOtp = require("../Auth/sendOtp");

router.post("/send-otp", async (req, res) => {

  const { email } = req.body;

  const otp = Math.floor(100000 + Math.random() * 900000);

  await sendOtp(email, otp);

  res.json({
    message: "OTP sent to email"
  });

});