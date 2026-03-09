const express = require('express');
const router = express.Router();

// create delete api

router.delete('/deletedata', (req, res) => {
    const { name, email } = req.body;
    res.json({ message: `DELETE request received with name: ${name} and email: ${email}` });
});

module.exports = router;