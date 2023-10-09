const express = require('express');
const app = express();

app.get('/api/token', (req, res) => {
    const token = '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';
    res.json({ token: token });
});

app.listen(process.env.PORT || 3000);
