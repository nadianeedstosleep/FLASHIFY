import generateRegisterView from '../views/registerView.js';
import AuthService from '../services/authService.js';
import RegisterModel from '../models/registerModel.js';

export default class RegisterPresenter {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  async render() {
    return generateRegisterView();
  }

  async afterRender() {
    const form = document.querySelector('#register-form');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = form.querySelector('#name').value;
      const email = form.querySelector('#email').value;
      const password = form.querySelector('#password').value;

      RegisterModel.setName(name);
      RegisterModel.setEmail(email);
      RegisterModel.setPassword(password);

      try {
        await AuthService.register({ name, email, password });
        RegisterModel.clear();
        alert('Register success! Redirecting...');
        window.location.hash = '#/login';
      } catch (err) {
        alert('Register failed: ' + err.message);
      }
    });
  }
}
