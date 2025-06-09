import Sidebar from '../components/sidebar.js';
import Header from '../components/header.js';
import '../styles/detailCollectionStyle.css';

const DetailCollectionView = {
  render(collection) {
    return `
      <div class="dashboard-container">
        ${Sidebar.render(true)}
        <div class="dashboard-main">
          ${Header.render()}
          <main class="detail-collection-page">
            <h1>${collection.title}</h1>
            <p class="subtitle">${collection.description || 'Your Description Here'}</p>

            <div class="detail-collection-toolbar">
              <input type="text" class="search-bar" placeholder="Search Flashcards" />
              <i class="fa-solid fa-magnifying-glass search-icon"></i>
              <i class="fa-solid fa-filter filter-icon"></i>
            </div>

            <div class="flashcard-list">
              <!-- Flashcard cards will go here -->
            </div>
          </main>
        </div>
      </div>
    `;
  },

  afterRender() {
    Sidebar.afterRender();
    Header.afterRender();
  }
};

export default DetailCollectionView;
