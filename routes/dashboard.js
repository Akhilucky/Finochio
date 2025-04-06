const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
    // Render the dashboard page or send dashboard data
    res.render('dashboard', { user: req.user });
});

module.exports = router;
