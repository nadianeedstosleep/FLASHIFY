const cardsMC = require('../../data/cards.json');
const cardsFlashcard = require('../../data/cards-flashcard.json');

const cards = [...cardsMC, ...cardsFlashcard];

exports.getCardPreview = (request, h) => {
  const { id } = request.params;
  const cardSet = cards.find(card => card.id === parseInt(id, 10));

  if (!cardSet) {
    return h.response({ error: 'Card not found' }).code(404);
  }

  return {
    id: cardSet.id,
    type: cardSet.type || 'multiple-choice',
    title: cardSet.title,
    category: cardSet.category || 'Unknown',
    author: cardSet.author || 'Unknown',
    views: cardSet.views || 0,
    description: cardSet.description || '',
    totalQuestions: cardSet.questions.length,
    questions: cardSet.questions.map(q => {
      if (cardSet.type === 'flashcard') {
        return {
          question: q.question,
          answer: q.answer
        };
      } else {
        return {
          question: q.question,
          answers: q.answers
        };
      }
    })
  };
};

exports.getCardsList = (request, h) => {
  const minimalCards = cards.map(card => {
    const questionCount = card.questions && Array.isArray(card.questions) ? card.questions.length : 0;
    return {
      id: card.id,
      type: card.type || 'multiple-choice',
      title: card.title,
      category: card.category,
      author: card.author,
      views: card.views,
      qaCount: questionCount
    };
  });
  return minimalCards;
};
