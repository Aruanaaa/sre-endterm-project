const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());

const PORT = 3003;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

let requestCount = 0;
let errorCount = 0;
let requestDurationSum = 0;

app.use((req, res, next) => {
  if (req.path === '/metrics') {
    return next();
  }

  const start = process.hrtime.bigint();

  res.on('finish', () => {
    const end = process.hrtime.bigint();
    const durationSeconds = Number(end - start) / 1e9;

    requestCount += 1;
    requestDurationSum += durationSeconds;

    if (res.statusCode >= 500) {
      errorCount += 1;
    }
  });

  next();
});

app.get('/', (req, res) => {
  res.send('Order Service is running');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/ready', async (req, res) => {
  try {
    await pool.query('SELECT 1');

    res.status(200).json({
      status: 'ready',
      service: 'order-service',
      database: 'connected'
    });
  } catch (error) {
    res.status(503).json({
      status: 'not ready',
      service: 'order-service',
      database: 'disconnected',
      details: error.message
    });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      message: 'Order data retrieved successfully',
      database_time: result.rows[0].now,
      orders: [
        { id: 1, product: 'Laptop', status: 'created' },
        { id: 2, product: 'Phone', status: 'shipped' }
      ]
    });
  } catch (error) {
    res.status(500).json({
      error: 'Database connection failed',
      details: error.message
    });
  }
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');

  res.send(`# HELP request_count Total number of HTTP requests
# TYPE request_count counter
request_count ${requestCount}

# HELP error_count Total number of failed HTTP requests
# TYPE error_count counter
error_count ${errorCount}

# HELP request_duration_seconds_sum Total request duration in seconds
# TYPE request_duration_seconds_sum counter
request_duration_seconds_sum ${requestDurationSum.toFixed(6)}

# HELP request_duration_seconds_count Total number of measured HTTP requests
# TYPE request_duration_seconds_count counter
request_duration_seconds_count ${requestCount}

# HELP process_uptime_seconds Node.js process uptime in seconds
# TYPE process_uptime_seconds gauge
process_uptime_seconds ${process.uptime().toFixed(2)}
`);
});

app.listen(PORT, () => {
  console.log(`Order Service running on port ${PORT}`);
});