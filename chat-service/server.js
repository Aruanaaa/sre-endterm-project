const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Chat Service is running');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/messages', (req, res) => {
  res.json([
    { id: 1, message: "Hello!" },
    { id: 2, message: "Welcome to chat service" }
  ]);
});

app.listen(3005, () => {
  console.log('Chat Service running on port 3005');
});