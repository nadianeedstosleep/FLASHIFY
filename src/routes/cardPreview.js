const cardHandler = require('../handlers/cardHandler');

module.exports = [
  {
    method: 'GET',
    path: '/cards/{id}',
    handler: cardHandler.getCardPreview
  }
];
