const Hapi = require('@hapi/hapi');
const routes = require('./routes/routes');

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  server.route(routes);
  const profileRoutes = require('./routes/profileRoutes');
  server.route(profileRoutes);
  
  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
