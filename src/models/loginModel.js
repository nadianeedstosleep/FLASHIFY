class LoginModel {
  constructor() {
    this._email = '';
    this._token = '';
  }

  setEmail(email) {
    this._email = email;
  }

  getEmail() {
    return this._email;
  }

  setToken(token) {
    this._token = token;
    localStorage.setItem('token', token);
  }

  getToken() {
    return this._token || localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.getToken();
  }

  logout() {
    this._email = '';
    this._token = '';
    localStorage.removeItem('token');
  }
}

export default new LoginModel();