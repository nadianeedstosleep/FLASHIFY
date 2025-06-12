const cardHandler = require('../handlers/cardHandler');

module.exports = [
  {
    method: 'GET',
    path: '/cards',
    handler: cardHandler.getCardsList
  }]