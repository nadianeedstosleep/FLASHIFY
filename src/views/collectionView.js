// src/views/collectionView.js
import '../styles/collectionStyle.css';
import Sidebar from '../components/sidebar.js';
import Header from '../components/header.js';

const CollectionView = {
  render(collections) {
    return `
      <div class="dashboard-container">
        ${Sidebar.render(true)}
        <div class="dashboard-main">
          ${Header.render()}
          <main class="collection-page">
            <h1>Your Flashcard Collections</h1>
            <p>Organize, review, and track your study sets in one place.</p>
            
            <div class="collection-toolbar">
              <button class="add-btn">+ Add Collection</button>

              <div class="search-wrapper">
                <input type="text" class="search-bar" placeholder="Search Collections" />
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
              </div>

              <i class="fa-solid fa-filter filter-icon"></i>
            </div>
            
            <div class="collection-grid">
            ${collections.map(c => `
                <a href="#/collections/${c.id}" class="collection-card-link">
                <div class="collection-card">
                    <img src="${c.image}" alt="${c.title}" />
                    <h3 class="collection-card-title">${c.title}</h3>
                    <p class="collection-card-count">${c.count} Flashcard</p>
                </div>
                </a>
            `).join('')}
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

export default CollectionView;
