const communityCards = [
  {
    id: 1,
    title: 'Methamphetamin 101',
    category: 'Chemistry',
    author: 'Walter White',
    views: 2000,
    qaCount: 32,
  },
  {
    id: 2,
    title: 'Introduction to Algorithms',
    category: 'Computer Science',
    author: 'Thomas Cormen',
    views: 1500,
    qaCount: 45,
  },
  {
    id: 3,
    title: 'Basic Algebra',
    category: 'Math',
    author: 'Isaac Newton',
    views: 1800,
    qaCount: 28,
  },
  {
    id: 4,
    title: 'World Geography',
    category: 'Geography',
    author: 'National Geographic',
    views: 1200,
    qaCount: 35,
  },
];

const getCommunityCardById = (request, h) => {
  const id = parseInt(request.params.id, 10);
  const card = communityCards.find(c => c.id === id);
  if (!card) {
    return h.response({ message: 'Community card not found' }).code(404);
  }
  return h.response(card).code(200);
};

module.exports = { getCommunityCardById };
