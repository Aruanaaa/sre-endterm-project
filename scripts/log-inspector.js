const { exec } = require('child_process');

const patterns = [
  'Database connection failed',
  'ECONNREFUSED',
  'error',
  'failed'
];

exec('docker compose logs', (error, stdout, stderr) => {
  if (error) {
    console.error(`Error: ${error.message}`);
    return;
  }

  console.log('Scanning logs for issues...\n');

  patterns.forEach(pattern => {
    if (stdout.toLowerCase().includes(pattern.toLowerCase())) {
      console.log(`Detected issue: ${pattern}`);
    }
  });

  console.log('\nLog scan completed.');
});