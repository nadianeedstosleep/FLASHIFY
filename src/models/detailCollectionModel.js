const mockCollections = [
  {
    id: '1',
    title: 'My Collection 1',
    description: 'Your Description Here',
    flashcards: [],
  },
  {
    id: '2',
    title: 'Another Set',
    description: 'Description for another set',
    flashcards: [],
  },
];

const DetailCollectionModel = {
  getCollectionById(id) {
    return mockCollections.find((c) => c.id === id);
  },
};

export default DetailCollectionModel;
