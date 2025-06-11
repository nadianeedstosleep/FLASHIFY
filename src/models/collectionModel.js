// src/models/collectionModel.js
class CollectionModel {
  getCollections() {
    return [
      { id: 1, title: 'My Collection 1', count: 2, image: '/assets/images/collection-1.png' },
      { id: 2, title: 'My Collection 2', count: 10, image: '/assets/images/collection-1.png' },
      { id: 3, title: 'My Collection 3', count: 10, image: '/assets/images/collection-1.png'},
      { id: 4, title: 'My Collection 4', count: 10, image: '/assets/images/collection-1.png' },
    ];
  }
}

export default new CollectionModel();
