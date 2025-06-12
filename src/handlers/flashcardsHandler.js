const fs = require('fs');
const path = require('path');

const getFlashcardsFromJson = (request, h) => {
  const { sectionId } = request.params;
  const filePath = path.join(__dirname, '../../data/flashcards', `${sectionId}.json`);
  if (!fs.existsSync(filePath)) {
    return h.response({ message: 'Not found' }).code(404);
  }
  const raw = fs.readFileSync(filePath);
  const data = JSON.parse(raw);
  return h.response(data).code(200);
};

module.exports = { getFlashcardsFromJson };
