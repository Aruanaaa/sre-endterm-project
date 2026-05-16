const requiredEnv = ['DATABASE_URL'];

let valid = true;

requiredEnv.forEach((env) => {
  if (!process.env[env]) {
    console.log(`Missing required environment variable: ${env}`);
    valid = false;
  }
});

if (valid) {
  console.log('Configuration is valid.');
} else {
  console.log('Configuration validation failed.');
}