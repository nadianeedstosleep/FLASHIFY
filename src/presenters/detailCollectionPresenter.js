import collectionModel from '../models/collectionModel.js';
import detailCollectionView from '../views/detailCollectionView.js';

export default class DetailCollectionPresenter {
  constructor(rootElement, params) {
    this.rootElement = rootElement;
    this.collectionId = params.id;
  }

  async render() {
    const collectionId = this.collectionId;
    const collection = collectionModel.getCollectionById(collectionId);

    if (!collection) {
      return `<p>Collection not found.</p>`;
    }

    this.rootElement.innerHTML = detailCollectionView.render(collection);
  }

  async afterRender() {
    detailCollectionView.afterRender();
  }
}
