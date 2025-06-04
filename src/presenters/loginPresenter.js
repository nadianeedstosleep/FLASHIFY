import AuthService from '../services/authService.js';
import LoginModel from '../models/loginModel.js';
import generateLoginView from '../views/loginView.js';

export default class LoginPresenter {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  render() {
    return generateLoginView();
  }

  afterRender() {
    setTimeout(() => {
      const form = this.rootElement.querySelector('#login-form');
      if (!form) {
        console.error('Login form not found in afterRender');
        return;
      }
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = form.querySelector('#email').value;
        const password = form.querySelector('#password').value;

        try {
          const result = await AuthService.login({ email, password });

          LoginModel.setEmail(result.user.email);
          localStorage.setItem('isLoggedIn', 'true');

          window.location.hash = '#/dashboard';
        } catch (err) {
          alert('Login failed: ' + err.message);
        }
      });
    }, 0);
  }
}
