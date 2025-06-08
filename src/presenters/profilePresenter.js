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
    profileView.afterRender({
      onImageChange: async (base64) => {
        localStorage.setItem('profilePicture', base64);
        ProfileModel.updateProfilePicture(base64);
      },
      onSubmit: () => {
        alert('Profile picture updated!');
      },
    });
  }
}
