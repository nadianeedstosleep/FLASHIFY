import Sidebar from '../components/sidebar.js';
import Header from '../components/header.js';
import '../styles/profileStyle.css';



const ProfileView = {
  render(user) {
    const storedPic = localStorage.getItem('profilePicture') || 'https://ui-avatars.com/api/?name=User&background=DAAAD6&color=fff';
    return `
      <div class="dashboard-container">
        ${Sidebar.render(true)}
        <div class="dashboard-main">
          ${Header.render()}
          <main class="edit-profile-page">
            <h1>Edit Your Profile</h1>
            <p class="subtitle">Upload your new profile picture below</p>

            <form id="profileForm" class="edit-profile-form">
              <label for="profileImageInput" class="image-upload">
                <img id="previewImage" src="${storedPic}" || '/assets/icons/user-placeholder.svg'}" alt="Profile" />
                <p>Choose Profile Picture</p>
                <input type="file" id="profileImageInput" accept="image/*" hidden />
              </label>

              <button type="submit" class="save-btn">Save Profile</button>
            </form>
          </main>
        </div>
      </div>
    `;
  },

  afterRender({ onImageChange, onSubmit }) {
    Sidebar.afterRender();
    Header.afterRender();

    const form = document.getElementById('profileForm');
    const imageInput = document.getElementById('profileImageInput');
    const previewImage = document.getElementById('previewImage');

    if (!imageInput || !previewImage || !form) {
      console.warn('[ProfileView] Missing form or image elements');
      return;
    }

    imageInput.addEventListener('change', async () => {
      const file = imageInput.files[0];
      if (file) {
        const base64 = await convertToBase64(file);
        previewImage.src = base64;
        onImageChange?.(base64); 
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      onSubmit?.();
    });
  },
};

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default ProfileView;
