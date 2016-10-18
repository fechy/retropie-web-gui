import fs from 'fs';
import _ from 'lodash';

export default function (app, env, io) {

  app.get('/api/list/:system', (req, res) => {
    const { system } = req.params;

    const retroPieConfig = require(`../config/retropie${env}.json`);
    const systems = require(`../config/systems.json`);

    const index = _.findIndex(systems, (plt) => {
      return plt.name == system;
    });

    let error = null;
    let available = false;
    let fileList = [];

    if (index > -1) {
      const systemConfig = systems[index];
      const path = `${retroPieConfig.path}/${systemConfig.path}/`;
      try {
        try {
          fs.accessSync(path, fs.F_OK);
          available = true;
        } catch (e) {
          error = e.message;
        }

        if (available) {
          fileList = fs.readdirSync(path);
        }
      } catch (e) {
        error = e.message;
      }
    } else {
      error = 'Unknown system name';
    }

    if (error) {
      res.status(400)
    }

    res.send({ system, available, error, fileList });
  });
}
