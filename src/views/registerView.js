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
  `;
}
