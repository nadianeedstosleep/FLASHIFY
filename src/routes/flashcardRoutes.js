const { getFlashcardsFromJson } = require('../handlers/flashcardsHandler');

module.exports = [
  {
    method: 'GET',
    path: '/flashcards/{sectionId}',
    handler: getFlashcardsFromJson,
  }
];
