import fileUpload from 'express-fileupload';
import cors from 'cors';
import _ from 'lodash';

export default function (app, env, io) {
  const retroPieConfig = require(`../config/retropie${env}.json`);

  app.use(fileUpload());

  app.post('/api/upload', cors(), (req, res, next) => {
    if (!req.files) {
      res.send({ result: false, error: 'No files were uploaded.' });
      return;
    }

    const system = JSON.parse(req.body.system);
    const files = req.files;

    let remaining = Object.keys(files).length;
    _.forEach(files, (file) => {
      file.mv(`${retroPieConfig.path}/${system.path}/${file.name}`, (err) => {
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
}
