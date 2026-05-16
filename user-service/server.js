const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('User Service is running');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/users', (req, res) => {
  res.json([
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" }
  ]);
});

app.listen(3004, () => {
  console.log('User Service running on port 3004');
});