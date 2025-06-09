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
            <div class="detail-header">
              <h1>${collection.title}</h1>
              <p class="description">Your Description Here</p>
            </div>

            <div class="collection-toolbar">
                <div class="search-bar-container">
                    <input type="text" placeholder="Search Flashcards" />
                    <span class="icon search-icon">
                    <i class="fa fa-search"></i>
                    </span>
                </div>
                <div class="settings-container">
                <button id="settings-btn" class="icon settings-icon">
                    <i class="fa-solid fa-sliders"></i>
                </button>
                <div id="settings-dropdown" class="dropdown hidden">
                    <button id="edit-btn">Edit Collection</button>
                    <button class="danger">Delete Collection</button>
                </div>
                </div>
            </div>

            <section class="flashcard-list">
              <p style="text-align: center; opacity: 0.6;">(No cards yet in this collection)</p>
            </section>

            <div id="edit-modal" class="modal-overlay hidden">
            <div class="modal-content">
                <button id="close-modal" class="close-btn">&times;</button>
                <h2>Edit Collection Details</h2>

                <div class="edit-form">
                <div class="edit-photo" id="uploadPhoto">
                    <i class="fa-solid fa-image"></i>
                    <p>Edit Photo</p>
                    <input type="file" accept="image/*" hidden />
                </div>

                <div class="edit-fields">
                    <label for="collection-name">Name</label>
                    <input type="text" id="collection-name" value="Change My Collection 1" />

                    <label for="collection-desc">Description</label>
                    <textarea id="collection-desc" rows="3">Change My Collection 1 Description.</textarea>

                    <button class="update-btn">Update Collection</button>
                </div>
                </div>
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

    document.getElementById('settings-btn').addEventListener('click', () => {
    document.getElementById('settings-dropdown').classList.toggle('hidden');
    });

    document.getElementById('edit-btn').addEventListener('click', () => {
    document.getElementById('edit-modal').classList.remove('hidden');
    document.getElementById('settings-dropdown').classList.add('hidden');
    });


    document.getElementById('uploadPhoto').addEventListener('click', () => {
    document.querySelector('#uploadPhoto input[type="file"]').click();
    });

    document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('edit-modal').classList.add('hidden');
    });
  }
};

export default DetailCollectionView;
