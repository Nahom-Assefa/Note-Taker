const path = require('path');
const router = require('express').Router();

// Display notes.html to client
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

//Display index.html to client
router.get('*',(req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;