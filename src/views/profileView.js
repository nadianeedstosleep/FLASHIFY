import Sidebar from '../components/sidebar.js';
import Header from '../components/header.js';
import '../styles/profileStyle.css';

const ProfileView = {
  render(user) {
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
                <img id="previewImage" src="${user.profileImage || '/assets/icons/user-placeholder.svg'}" alt="Profile" />
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

  afterRender() {
    Sidebar.afterRender();
    Header.afterRender();
  }
};

export default ProfileView;
