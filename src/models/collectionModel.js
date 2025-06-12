class CollectionModel {
  constructor() {
    this._collections = [
      { id: 1, title: 'My Collection 1', description: 'Your Description Here', count: 2, image: '/assets/images/collection-1.png' },
      { id: 2, title: 'My Collection 2', description: 'Your Description Here', count: 10, image: '/assets/images/collection-1.png' },
      { id: 3, title: 'My Collection 3', description: 'Your Description Here', count: 10, image: '/assets/images/collection-1.png' },
      { id: 4, title: 'My Collection 4', description: 'Your Description Here', count: 10, image: '/assets/images/collection-1.png' },
    ];
  }

  getCollections() {
    return this._collections;
  }

  getCollectionById(id) {
    return this._collections.find(c => c.id === Number(id));
  }
}

export default new CollectionModel();
