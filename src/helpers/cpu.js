const os = require('os');

export function cpuAverage() {
  let totalIdle = 0;
  let totalTick = 0;

  const cpus = os.cpus();
  const all = [];

  for (let i = 0, len = cpus.length; i < len; i++) {

    //Select CPU core
    let cpu = cpus[i];
    let totalTickCpu = 0;

    //Total up the time in the cores tick
    for (let type in cpu.times) {
      totalTick += cpu.times[type];
      totalTickCpu += cpu.times[type];
    }

    //Total up the idle time of the core
    totalIdle += cpu.times.idle;
    all.push({
      idle: cpu.times.idle,
      total: totalTickCpu,
      percentage: (cpu.times.idle * 100) / totalTickCpu,
    })
  }

  const idle  = totalIdle / cpus.length;
  const total = totalTick / cpus.length;
  const percentage = (idle * 100) / total;

  return {
    idle,
    total,
    percentage,
    all
  }
}

export function cpuLoadInit() {
  const start = cpuAverage();
  const end = cpuAverage();
  const diff = {};

  diff.idle = end.idle - start.idle;
  diff.total = end.total - start.total;

  diff.percent = 1 - diff.idle / diff.total;

  return diff;
}

export const cpuLoad = cpuLoadInit();
