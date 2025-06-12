const { registerUser, loginUser } = require('../handlers/userHandler.js');  // Import the handler functions
const cardRoutes = require('./card.js');

const routes = [
  {
    method: 'POST',
    path: '/auth/register',
    handler: registerUser,
  },
  {
    method: 'POST',
    path: '/auth/login',
    handler: loginUser,
  },
  ...cardRoutes
];

module.exports = routes;
