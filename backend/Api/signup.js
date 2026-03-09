const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// create signup api
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body; 
    try {
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
        // Here you would typically save the user to your database
        // For demonstration, we'll just return the hashed password
        res.json({ message: `Signup successful for name: ${name} and email: ${email}`, hashedPassword });
    } catch (error) {
        res.status(500).json({ message: 'Error signing up', error: error.message });
    }   
});

module.exports = router;