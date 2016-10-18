import fs from 'fs';

export default function (app, env, io) {

  app.get('/api/check', (req, res) => {
    const retroPieConfig = require(`../config/retropie${env}.json`);
    const systems = require(`../config/systems.json`);
    const check = {};

    let count = Object.keys(systems).length;
    systems.map((system) => {
      --count;
      const path = `${retroPieConfig.path}/${system.path}/`;
      try {
        fs.accessSync(path, fs.F_OK);
        check[system.name] = true;
      } catch (e) {
        check[system.name] = false;
      }

      if (count == 0) {
        res.send(check);
      }
    });
  });
}
