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
                <a href="#/collection/${c.id}" class="collection-card-link">
                <div class="collection-card">
                    <img src="${c.image}" alt="${c.title}" />
                    <h3 class="collection-card-title">${c.title}</h3>
                    <p class="collection-card-count">${c.count} Flashcard</p>
                </div>
                </a>
            `).join('')}
            </div>

            <!-- Modal Pop-Up -->
            <div id="addCollectionModal" class="modal hidden">
            <div class="modal-box">
              <button class="modal-close" id="closeCollectionModal">&times;</button>

              <h2 class="modal-title">Collection Details</h2>

              <div class="modal-columns">
                <label for="uploadInput" class="upload-area">
                  <img src="/assets/icons/pictures-folder-icon.svg" alt="Upload Icon" id="defaultIcon" />
                  <p>Choose Photo</p>
                  <input type="file" name="image" id="uploadInput" accept="image/*" />
                  <img id="previewImage" class="preview-image hidden" />
                </label>

                <div class="form-area">
                  <label for="title">Name</label>
                  <input type="text" name="title" placeholder="Add a name" required />

                  <label for="description">Description</label>
                  <textarea name="description" rows="3" placeholder="Add an optional description"></textarea>

                </div>
              </div>
              <button type="submit" class="modal-btn">Add Collection</button>
            </div>
          </div>

          </main>
        </div>
      </div>
    `;
  },

  afterRender() {
    Sidebar.afterRender();
    Header.afterRender();

    const addBtn = document.querySelector('.add-btn');
    const modal = document.getElementById('addCollectionModal');
    const closeBtn = document.getElementById('closeCollectionModal');
    const submitBtn = document.getElementById('submitCollection');

    if (addBtn) {
      addBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
      });
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });
    }

    const uploadInput = document.getElementById('uploadInput');
    const previewImage = document.getElementById('previewImage');
    const defaultIcon = document.getElementById('defaultIcon');

    if (uploadInput && previewImage && defaultIcon) {
      uploadInput.addEventListener('change', () => {
        const file = uploadInput.files[0];
        if (file && file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = () => {
            previewImage.src = reader.result;
            previewImage.classList.remove('hidden');
            defaultIcon.classList.add('hidden');
          };
          reader.readAsDataURL(file);
        } else {
          previewImage.classList.add('hidden');
          previewImage.src = '';
          defaultIcon.classList.remove('hidden');
        }
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener('click', () => {
        const title = document.getElementById('collectionTitle').value;
        const desc = document.getElementById('collectionDesc').value;
        const file = document.getElementById('uploadInput').files[0];

        console.log('Submitted:', { title, desc, file });
        alert('Collection submitted (simulasi, belum kirim ke backend)!');
        modal.classList.add('hidden');
      });
    }
  }
};

export default CollectionView;
