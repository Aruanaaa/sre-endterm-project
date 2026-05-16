const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3008;
const services = {
  auth: 'http://auth-service:3002/health',
  product: 'http://product-service:3001/health',
  order: 'http://order-service:3003/ready',
  user: 'http://user-service:3004/health',
  chat: 'http://chat-service:3005/health',
  payment: 'http://payment-service:3006/health',
  notification: 'http://notification-service:3007/health'
};
app.get('/', (_, res) => res.send('API Gateway is running'));
app.get('/health', (_, res) => res.status(200).send('OK'));
app.get('/system-status', async (_, res) => {
  const results = {};
  await Promise.all(Object.entries(services).map(async ([name, url]) => {
    try { await axios.get(url, { timeout: 1500 }); results[name] = 'healthy'; }
    catch (e) { results[name] = 'unhealthy'; }
  }));
  res.json(results);
});
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
