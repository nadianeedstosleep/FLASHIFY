import '../styles/cardStyle.css';
import '../styles/cardPreviewStyles.css';
import generateCommunityView from '../views/communityView.js';
import CommunityModel from '../models/communityModel.js';
import { createCard } from '../components/card.js';
import Sidebar from '../components/sidebar.js';
import Header from '../components/header.js';
import { renderLabelGroup } from '../components/label.js';

export default class CommunityPresenter {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.model = new CommunityModel();
    this.categories = ['All', 'Chemistry', 'Computer Science', 'Math', 'Social Science', 'Geography', 'English', 'French', 'Business', 'Physics'];
    this.activeCategory = 'All';
  }

  async render() {
    console.log('CommunityPresenter render started');
    this.rootElement.innerHTML = `
      <div class="dashboard-container">
        ${Sidebar.render(true)}
        <div class="dashboard-main">
          ${Header.render()}
          ${generateCommunityView()}
        </div>
      </div>
    `;

    Sidebar.afterRender();
    Header.afterRender();

    await this.model.fetchCards();
    console.log('Cards fetched:', this.model.getCards());
    this.renderCommunityCards();
    this.renderLabels();
  }

  renderCommunityCards() {
    console.log('Rendering community cards');
    const container = this.rootElement.querySelector('#communityCards');
    if (!container) {
      console.error('Community cards container not found');
      return;
    }
    container.innerHTML = '';

    let cards = this.model.getCards();
    console.log('Cards to render:', cards);
    if (this.activeCategory !== 'All') {
      cards = cards.filter(card => card.category === this.activeCategory);
    }

    cards.forEach(cardData => {
      const card = createCard(cardData);
      card.addEventListener('click', () => this.loadCardPreview(cardData.id));
      container.appendChild(card);
    });
  }

  renderLabels() {
    renderLabelGroup('filterLabels', this.categories, this.activeCategory, (selectedCategory) => {
      this.activeCategory = selectedCategory;
      this.renderCommunityCards();
      this.renderLabels();
    });
  }

  async loadCardPreview(cardId) {
    // Remove preview rendering from CommunityPresenter to avoid duplication
    // The detailed preview should be handled exclusively by CommunityDetailPresenter
    console.log('loadCardPreview called in CommunityPresenter, but preview rendering is disabled to avoid duplication.');
  }

  showCardPreview(data) {
    // This method is no longer used for preview rendering in CommunityPresenter
  }
}