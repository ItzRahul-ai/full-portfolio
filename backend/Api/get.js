const exprees = require('express');
const router = exprees.Router();

// create get api

router.get('/getdata', (req, res) => {
    res.json({ message: 'GET request received' });
});

module.exports = router;