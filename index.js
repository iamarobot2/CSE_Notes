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