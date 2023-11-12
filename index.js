const express = require('express');
const app = express();
const port = process.env.PORT || 3500;

const CSE_TOKEN = process.vercel.CSE_TOKEN;

app.get('/token', (req, res) => {
  res.json({
    token: CSE_TOKEN,
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});