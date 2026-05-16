const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Product Service is running');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get('/products', (req, res) => {
  res.json([
    { id: 1, name: "Laptop" },
    { id: 2, name: "Phone" }
  ]);
});

app.get('/products-with-orders', async (req, res) => {
  try {
    const orders = await axios.get('http://order-service:3003/orders');

    res.json({
      products: [
        { id: 1, name: "Laptop" },
        { id: 2, name: "Phone" }
      ],
      orders: orders.data
    });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch orders from order-service',
      details: error.message
    });
  }
});

app.listen(3001, () => {
  console.log('Product Service running on port 3001');
});