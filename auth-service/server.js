const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Auth Service is running');
});

app.post('/login', (req, res) => {
  res.json({
    message: 'User authenticated successfully',
    token: 'sample-token'
  });
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(3002, () => {
  console.log('Auth Service running on port 3002');
});