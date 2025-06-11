class RegisterModel {
  constructor() {
    this._name = '';
    this._email = '';
    this._password = '';
  }

  setName(name) {
    this._name = name;
  }

  getName() {
    return this._name;
  }

  setEmail(email) {
    this._email = email;
  }

  getEmail() {
    return this._email;
  }

  setPassword(password) {
    this._password = password;
  }

  getPassword() {
    return this._password;
  }

  clear() {
    this._name = '';
    this._email = '';
    this._password = '';
  }
}

export default new RegisterModel();
