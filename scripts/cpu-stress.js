function stressCPU(durationSeconds) {
  console.log(`Starting CPU stress for ${durationSeconds} seconds...`);

  const end = Date.now() + durationSeconds * 1000;

  while (Date.now() < end) {
    Math.sqrt(Math.random());
  }

  console.log('CPU stress finished.');
}

stressCPU(10);