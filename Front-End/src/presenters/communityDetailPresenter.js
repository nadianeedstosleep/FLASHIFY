import CommunityDetailModel from '../models/communityDetailModel.js';
import generateCommunityDetailView from '../views/communityDetailView.js';
import Sidebar from '../components/sidebar.js';
import Header from '../components/header.js';

export default class CommunityDetailPresenter {
  constructor(rootElement, params) {
    this.rootElement = rootElement;
    this.model = new CommunityDetailModel();
    this.id = params && params.id ? parseInt(params.id, 10) : null;
  }

  async render() {
    const card = await this.model.getCardById(this.id);
    if (!card) {
      this.rootElement.innerHTML = '<p>Community card not found.</p>';
      return;
    }
    this.rootElement.innerHTML = `
      <div class="dashboard-container">
        ${Sidebar.render(true)}
        <div class="dashboard-main">
          ${Header.render()}
        </div>
      </div>
    `;

    const detailView = await generateCommunityDetailView(card);
    this.rootElement.querySelector('.dashboard-main').appendChild(detailView);
  }
}
