const express = require('express');
const router = express.Router();

// create post api
router.post('/postdata', (req, res) => {
    const { name, email } = req.body;
    res.json({ message: `POST request received with name: ${name} and email: ${email}` });
});

module.exports = router;