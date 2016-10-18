
// Init all workers
export default function (app, env, io)
{
  require('./Check').default(app, env, io);
  require('./List').default(app, env, io);
  require('./Upload').default(app, env, io);
  require('./Delete').default(app, env, io);
  require('./Stats').default(app, env, io);
}
