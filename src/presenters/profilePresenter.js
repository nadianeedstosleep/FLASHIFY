import profileView from '../views/profileView.js';
import ProfileModel from '../models/profileModel.js';

export default class ProfilePresenter {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  async render() {
    const user = ProfileModel.getUser();
    return profileView.render(user);
  }

  async afterRender() {
    profileView.afterRender();
    const form = document.getElementById('profileForm');
    const imageInput = document.getElementById('profileImageInput');
    const previewImage = document.getElementById('previewImage');

    if (!imageInput || !previewImage) {
        console.warn('[Profile] Input image or preview image not found.');
        return;
    }

    imageInput.addEventListener('change', () => {
        const file = imageInput.files[0];
        if (file) {
        previewImage.src = URL.createObjectURL(file);
        }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.tempImageUrl) {
        ProfileModel.updateProfilePicture(this.tempImageUrl);
        alert('Profile picture updated!');
      } else {
        alert('Please select a picture first.');
      }
    });

    let tempImageUrl = null;

    imageInput.addEventListener('change', async () => {
    const file = imageInput.files[0];
    if (file) {
        const base64 = await convertToBase64(file);
        previewImage.src = base64;
        localStorage.setItem('profilePicture', base64); 
    }
    });

    form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (tempImageUrl) {
        ProfileModel.updateProfilePicture(tempImageUrl);
        alert('Profile picture updated!');
    } else {
        alert('Please select a picture first.');
    }
    });
  }
}

function convertToBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

