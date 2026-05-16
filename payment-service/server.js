const express = require('express');
const app = express();
app.use(express.json());
const PORT = 3006;
let requestCount = 0;
let errorCount = 0;
app.use((req, res, next) => {
  if (req.path !== '/metrics') requestCount += 1;
  res.on('finish', () => { if (res.statusCode >= 500) errorCount += 1; });
  next();
});
app.get('/', (_, res) => res.send('Payment Service is running'));
app.get('/health', (_, res) => res.status(200).send('OK'));
app.post('/payments', (req, res) => res.json({ status: 'approved', amount: req.body.amount || 100, transactionId: 'TXN-1001' }));
app.get('/metrics', (_, res) => {
  res.type('text/plain').send(`# HELP request_count Total number of HTTP requests\n# TYPE request_count counter\nrequest_count ${requestCount}\n# HELP error_count Total number of failed HTTP requests\n# TYPE error_count counter\nerror_count ${errorCount}\n# HELP process_uptime_seconds Node.js process uptime in seconds\n# TYPE process_uptime_seconds gauge\nprocess_uptime_seconds ${process.uptime().toFixed(2)}\n`);
});
app.listen(PORT, () => console.log(`Payment Service running on port ${PORT}`));
