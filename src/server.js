const Hapi = require('@hapi/hapi');
const routes = require('./routes/routes');
const communityRoutes = require('./routes/communityRoutes');
const cardPreviewRoutes = require('./routes/cardPreview');
const flashcardsRoutes = require('./routes/flashcardRoutes');

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
  server.route(communityRoutes);
  server.route(cardPreviewRoutes);
  server.route(flashcardsRoutes);

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

init();
