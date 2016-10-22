import fs from 'fs';
import sys from 'util';
import { exec } from 'child_process';

const interval = 1000;

let child;

function calculate(cmd, socket) {
  child = exec(cmd, (error, stdout, stderr)  => {
    if (error !== null) {
      socket.emit('temperatureUpdate', {
        error: Object.assign({}, error, { message: stderr })
      });
    } else {
      const temp = parseFloat(stdout) / 1000;
      socket.emit('temperatureUpdate', { temp });
    }
  });
}

export default function (app, env, io) {

  const retroPieConfig = require(`../config/retropie${env}.json`);

  // Once Socket is connected, we start publishing the temp
  io.sockets.on('connection', (socket) => {
    // First call
    calculate(retroPieConfig.temp_cmd, socket);

    // Update every x seconds
    setInterval(calculate.bind(this, retroPieConfig.temp_cmd, socket), interval);
  });
}
