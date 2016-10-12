import fileUpload from 'express-fileupload';
import cors from 'cors';
import fs from 'fs';
import _ from 'lodash';

export default function buildWorker(app, env) {

  const retroPieConfig = require(`./config/retropie${env}.json`);
  const platforms = require(`./config/platforms.json`);

  // Add headers
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
  });

  app.get('/api', (req, res) => {
    throw new Error('invalid access');
  });

  app.get('/api/check', (req, res) => {
    const check = {};
    let count = Object.keys(platforms).length;
    platforms.map((platform) => {
      --count;
      const path = `${retroPieConfig.path}/${platform.path}/`;
      try {
        fs.accessSync(path, fs.F_OK);
        check[platform.name] = true;
      } catch (e) {
        check[platform.name] = false;
      }

      if (count == 0) {
        res.send(check);
      }
    });
  });

  app.use(fileUpload());

  app.post('/api/upload', cors(), (req, res, next) => {
    if (!req.files) {
      res.send({ result: false, error: 'No files were uploaded.' });
      return;
    }

    const platform = JSON.parse(req.body.platform);
    const files = req.files;

    let remaining = Object.keys(files).length;
    _.forEach(files, (file) => {
      file.mv(`${retroPieConfig.path}/${platform.path}/${file.name}`, (err) => {
        --remaining;
        if (remaining === 0 || err) {
          const result = {
            result: err === null,
            error: err ? err.message : null,
          };

          if (err) {
            res.status(500);
          }

          res.send(result);
        }
      });
    });
  });

  app.get('/api/list/:platform', (req, res) => {
    const { platform } = req.params;
    const index = _.findIndex(platforms, (plt) => {
      return plt.name == platform;
    });
    if (index == -1) {
      res.status(404).send({ error: 'wrong platform name' });
      return;
    }

    const platformConfig = platforms[index];

    try {
      const fileList = fs.readdirSync(`${retroPieConfig.path}/${platformConfig.path}/`)

      res.send({
        platform,
        list: fileList,
      });
    } catch (e) {
      res.status(404)
         .send({
           platform,
           error: e.message
         })
    }
  });
}
