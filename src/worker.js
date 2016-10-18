import init from './workers/index';

export default function buildWorker(app, env, io) {

  // Add headers
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

    next();
  });

  // Set the api root
  app.get('/api', () => {
    throw new Error('invalid access');
  });

  // Init all workers
  init(app, env, io);
}
