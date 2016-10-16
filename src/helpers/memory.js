const os = require('os');

export default function () {
  const free = os.freemem();
  const total = os.totalmem();
  return {
    free,
    total,
    percentage: (free * 100) / total
  }
}
