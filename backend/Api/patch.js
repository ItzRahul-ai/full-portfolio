const express = require('express');
const router = express.Router();

// create patch api

router.patch('/patchdata', (req, res) => {
    const { name, email } = req.body;
    res.json({ message: `PATCH request received with name: ${name} and email: ${email}` });
});

module.exports = router;