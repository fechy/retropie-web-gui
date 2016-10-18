import fs from 'fs';
import cors from 'cors';

export default function (app, env, io) {
  const retroPieConfig = require(`../config/retropie${env}.json`);
  const systems = require(`../config/systems.json`);

  app.post('/api/deletefile/:system', cors(), (req, res) => {
    let result = false;
    let error = null;

    const { system } = req.params;
    const index = _.findIndex(systems, (plt) => {
      return plt.name == system;
    });

    if (index > -1) {
      if (req.body.file) {
        const fileName = req.body.file;
        const systemConfig = systems[index];
        const path = `${retroPieConfig.path}/${systemConfig.path}/${fileName}`;

        try {
          fs.unlinkSync(path);
          result = true;
        } catch (e) {
          error = e.message;
        }
      } else {
        error = 'No file sent';
      }
    } else {
      error = 'Unknown system name';
    }

    if (error) {
      res.status(400);
    }

    res.send({ result, error });
  });
}
