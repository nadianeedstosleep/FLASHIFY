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

      if (!name || !email || !password) {
        alert('All fields are required!');
        return;
      }

      try {
        const result = await AuthService.register({ email, password });

        console.log('Registration successful:', result);

        const modal = document.getElementById('registerSuccessModal');
        const closeBtn = document.getElementById('closeSuccessModal');
        const loginBtn = modal.querySelector('.modal-btn');

        if (modal && closeBtn && loginBtn) {
          modal.classList.remove('hidden');

          closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
          });

          loginBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
            window.location.hash = '#/login';
          });
        }

      } catch (err) {
        console.error('Registration failed:', err.message);

        const modal = document.getElementById('registerFailedModal');
        const closeBtn = document.getElementById('closeFailedModal');
        const tryAgainBtn = document.getElementById('tryAgainBtn');
        const messageEl = document.getElementById('registerErrorMessage');

        if (modal && closeBtn && tryAgainBtn && messageEl) {
          messageEl.textContent = err.message || 'Something went wrong.';
          modal.classList.remove('hidden');

          closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
          });

          tryAgainBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
          });
        } else {
          alert('Registration failed: ' + err.message);
        }
      }
    });
  }
}
