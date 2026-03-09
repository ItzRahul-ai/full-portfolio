const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../Database/db");
require("dotenv").config();

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // check email & password
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // find user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // compare password
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ message: "Wrong password" });
    }

    // check admin from env
    const role = email === process.env.ADMIN_EMAIL ? "admin" : "user";

    res.json({
      message: `${role} login success`,
      role: role,
      user: {
        id: user._id,
        email: user.email
      }
    });

  } catch (error) {

    console.error(error);
    res.status(500).json({ message: "Server error" });

  }

});

module.exports = router;