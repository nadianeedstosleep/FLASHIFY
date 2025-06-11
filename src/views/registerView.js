import '../styles/registerStyle.css';

export default function generateRegisterView() {
  return `
    <div class="logo-wrapper">
        <img src="/assets/icons/flashify-logo.svg" alt="Flashify Logo" class="logo" />
    </div>

    <section class="register-container">
      <div class="register-illustration">
        <img src="/assets/images/register-illustration.png" alt="Register Illustration" />
      </div>

      <div class="register-form-wrapper">
        <h1>Start Your Flashcard</h1>
        <p>Register to get access to all our services!</p>

        <form id="register-form" class="register-form">
          <label for="name">Name</label>
          <input type="text" id="name" placeholder="Enter your name" required />
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />
          <button type="submit">Create an Account</button>
        </form>
        <small>Already have an account? <a href="#/login">Login</a></small>
      </div>
    </section>
    
    <div id="registerSuccessModal" class="modal hidden">
      <div class="modal-backdrop"></div>
      <div class="modal-box centered">
        <button id="closeSuccessModal" class="modal-close">&times;</button>
        <img src="/assets/icons/success-icon.png" alt="Success" class="modal-icon" />
        <h2 class="modal-title">Account Created Successfully!</h2>
        <p>Now you can log in to get access to all our services!</p>
        <button class="modal-btn" id="goToLoginBtn">Log In</button>
      </div>
    </div>

    <div id="registerFailedModal" class="modal hidden">
    <div class="modal-backdrop"></div>
    <div class="modal-box centered">
      <button id="closeFailedModal" class="modal-close">&times;</button>
      <img src="/assets/icons/failed-icon.png" alt="Failed" class="modal-icon" />
      <h2 class="modal-title">Account Failed to Create!</h2>
      <p id="registerErrorMessage">*error message*</p>
      <button class="modal-btn" id="tryAgainBtn">Try Again</button>
    </div>
  </div>

  `;
}

export function afterRender(onSubmitCallback) {
  const form = document.querySelector('#register-form');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#name').value;
    const email = form.querySelector('#email').value;
    const password = form.querySelector('#password').value;

    if (onSubmitCallback) {
      onSubmitCallback({ name, email, password });
    }
  });
}

export function showSuccessModal() {
  const modal = document.getElementById('registerSuccessModal');
  const closeBtn = document.getElementById('closeSuccessModal');
  const loginBtn = modal.querySelector('.modal-btn');

  modal.classList.remove('hidden');

  closeBtn?.addEventListener('click', () => modal.classList.add('hidden'));
  loginBtn?.addEventListener('click', () => {
    modal.classList.add('hidden');
    window.location.hash = '#/login';
  });
}

export function showErrorModal(message = 'Something went wrong.') {
  const modal = document.getElementById('registerFailedModal');
  const closeBtn = document.getElementById('closeFailedModal');
  const tryAgainBtn = document.getElementById('tryAgainBtn');
  const messageEl = document.getElementById('registerErrorMessage');

  if (!modal || !messageEl) {
    alert('Registration failed: ' + message);
    return;
  }

  messageEl.textContent = message;
  modal.classList.remove('hidden');

  closeBtn?.addEventListener('click', () => modal.classList.add('hidden'));
  tryAgainBtn?.addEventListener('click', () => modal.classList.add('hidden'));
}

