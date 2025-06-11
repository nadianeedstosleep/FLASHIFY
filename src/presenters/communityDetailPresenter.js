import generateCommunityDetailView from '../views/communityDetailView.js';
import Sidebar from '../components/sidebar.js';
import Header from '../components/header.js';
import { fetchAndRenderCards } from '../utils/fetchAndRenderCards.js';

export default class CommunityDetailPresenter {
  constructor(rootElement, params) {
    this.rootElement = rootElement;
    this.cardId = params && params.id ? params.id : null;
  }

  async render() {
    this.rootElement.innerHTML = generateCommunityDetailView();

    Sidebar.afterRender();
    Header.afterRender();

    if (this.cardId) {
      const previewContainer = this.rootElement.querySelector('#preview-container');
      await fetchAndRenderCards([this.cardId], previewContainer);
    } else {
      const mainDiv = this.rootElement.querySelector('.dashboard-main');
      if (mainDiv) {
        mainDiv.innerHTML = '<p>No card selected.</p>';
      }
    }
  }
}
