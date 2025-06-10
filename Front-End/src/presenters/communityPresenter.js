import '../styles/cardStyle.css';
import '../styles/cardPreviewStyles.css';
import generateCommunityView from '../views/communityView.js';
import CommunityModel from '../models/communityModel.js';
import { createCard } from '../components/card.js';
import { createCardPreviewComponent } from '../components/cardPreview.js';
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
    this.renderCommunityCards();
    this.renderLabels();
  }

  renderCommunityCards() {
    const container = this.rootElement.querySelector('#communityCards');
    container.innerHTML = '';

    let cards = this.model.getCards();
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
    try {
      const response = await fetch(`http://localhost:5000/cards/${cardId}`);
      if (!response.ok) {
        throw new Error('Failed to load card preview');
      }
      const data = await response.json();
      this.showCardPreview(data);
    } catch (err) {
      console.error(err);
    }
  }

  showCardPreview(data) {
    const container = this.rootElement.querySelector('#preview-container');
    container.innerHTML = '';
    const cardComponent = createCardPreviewComponent(data);
    container.appendChild(cardComponent);
  }
}
