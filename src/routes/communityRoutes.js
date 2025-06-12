const { getCommunityCardById } = require('../handlers/communityHandler');

const communityRoutes = [
  {
    method: 'GET',
    path: '/community/{id}',
    handler: getCommunityCardById,
  },
];

module.exports = communityRoutes;
