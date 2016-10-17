const os = require('os');

function cpuAverage() {
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

function calculateDiff(start, end) {
  //Calculate the difference in idle and total time between the measures
  const idleDifference = end.idle - start.idle;
  const totalDifference = end.total - start.total;

  //Calculate the average percentage CPU usage
  const percentageCPU = 100 - ~~(100 * idleDifference / totalDifference);

  return {
    idle: idleDifference,
    total: totalDifference,
    percentage: percentageCPU
  }
}

let startMeasure = cpuAverage();

export default function measureCPUUsage() {
  return new Promise((resolve) => {
    // Set delay for second Measure
    setTimeout(function () {

      // Grab second Measure
      const endMeasure = cpuAverage();

      const overall = calculateDiff(startMeasure, endMeasure);
      const all = [];

      startMeasure.all.map((cpu, i) => {
        all.push(calculateDiff(cpu, endMeasure.all[i]))
      });

      startMeasure = cpuAverage();

      // Return results
      resolve({ overall, all });

    }, 100);
  });
}
