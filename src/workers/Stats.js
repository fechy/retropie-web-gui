import measureCPUUsage from '../helpers/cpu';
import memory from '../helpers/memory';

const interval = 5000; // 5 sec

function calculate(socket) {
  const disk = require('diskusage');

  disk.check('/', (err, info) => {
    const availablePercentage = ((info.available / info.total) * 100).toFixed(2);
    const disk = {
      availablePercentage,
      ...info
    };

    const mem = memory();

    measureCPUUsage().then(cpu => {
      const date = new Date().getTime();
      socket.emit('system_health', date, { disk, cpu, memory: mem });
    });
  });
}

export default function (app, env, io)
{
  io.sockets.on('connection', (socket) => {
    // First call
    calculate(socket);

    // Update every x seconds
    setInterval(calculate.bind(this, socket), interval);
  });
}
