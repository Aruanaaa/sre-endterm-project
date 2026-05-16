const http = require('http');

const URL = 'http://localhost:3003/orders';
const TOTAL_REQUESTS = 200;
const CONCURRENT_REQUESTS = 20;

let completed = 0;
let successful = 0;
let failed = 0;
let durations = [];

function sendRequest() {
  return new Promise((resolve) => {
    const start = Date.now();

    const req = http.get(URL, (res) => {
      res.on('data', () => {});
      res.on('end', () => {
        const duration = Date.now() - start;
        durations.push(duration);

        if (res.statusCode >= 200 && res.statusCode < 300) {
          successful++;
        } else {
          failed++;
        }

        completed++;
        resolve();
      });
    });

    req.on('error', () => {
      failed++;
      completed++;
      resolve();
    });

    req.setTimeout(5000, () => {
      req.destroy();
      failed++;
      completed++;
      resolve();
    });
  });
}

async function runLoadTest() {
  console.log('Starting load test...');
  console.log(`Target URL: ${URL}`);
  console.log(`Total requests: ${TOTAL_REQUESTS}`);
  console.log(`Concurrent requests: ${CONCURRENT_REQUESTS}`);

  const startTime = Date.now();

  while (completed < TOTAL_REQUESTS) {
    const batch = [];

    for (let i = 0; i < CONCURRENT_REQUESTS && completed + batch.length < TOTAL_REQUESTS; i++) {
      batch.push(sendRequest());
    }

    await Promise.all(batch);

    console.log(`Completed: ${completed}/${TOTAL_REQUESTS}`);
  }

  const totalTimeSeconds = (Date.now() - startTime) / 1000;
  const averageLatency =
    durations.reduce((sum, value) => sum + value, 0) / durations.length;

  console.log('\nLoad test finished.');
  console.log(`Successful requests: ${successful}`);
  console.log(`Failed requests: ${failed}`);
  console.log(`Total time: ${totalTimeSeconds.toFixed(2)} seconds`);
  console.log(`Average latency: ${averageLatency.toFixed(2)} ms`);
  console.log(`Approximate RPS: ${(TOTAL_REQUESTS / totalTimeSeconds).toFixed(2)}`);
}

runLoadTest();