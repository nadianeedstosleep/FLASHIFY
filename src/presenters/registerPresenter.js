import generateRegisterView, {
  afterRender as registerViewAfterRender,
  showSuccessModal,
  showErrorModal,
} from '../views/registerView.js';

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
    registerViewAfterRender(async ({ name, email, password }) => {
      if (!name || !email || !password) {
        alert('All fields are required!');
        return;
      }

      try {
        const result = await AuthService.register({ email, password });
        console.log('Registration successful:', result);
        showSuccessModal();
      } catch (err) {
        console.error('Registration failed:', err.message);
        showErrorModal(err.message);
      }
    });
  }
}
