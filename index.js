const express = require('express');
const app = express();
const port = 3000;

const CSE_TOKEN = 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

app.get('/token', (req, res) => {
  res.json({
    token: CSE_TOKEN,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});