// src/presenters/collectionPresenter.js
import CollectionModel from '../models/collectionModel.js';
import CollectionView from '../views/collectionView.js';

export default class CollectionPresenter {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  async render() {
    const collections = CollectionModel.getCollections();
    return CollectionView.render(collections);
  }

  async afterRender() {
    CollectionView.afterRender();
  }
}
