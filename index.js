const express = require('express');
const app = express();

app.get('/api/token', (req, res) => {
    const token = process.env.CSE_NOTES;
    res.json({ token: token });
});

app.listen(process.env.PORT || 3000);
