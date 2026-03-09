const express = require('express');
const router = express.Router();

// create put api

router.put('/putdata', (req, res) => {
    const { name, email } = req.body;
    res.json({ message: `PUT request received with name: ${name} and email: ${email}` });
});

module.exports = router;