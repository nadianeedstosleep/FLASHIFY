class ProfileModel {
  constructor() {
    this.user = JSON.parse(localStorage.getItem('loggedInUser')) || {};
  }

  getUser() {
    return this.user;
  }

  updateProfilePicture(fileUrl) {
    this.user.profileImage = fileUrl;
    localStorage.setItem('loggedInUser', JSON.stringify(this.user));
  }
}

export default new ProfileModel();
