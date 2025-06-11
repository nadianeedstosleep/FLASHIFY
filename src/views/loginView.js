import '../styles/loginStyle.css';

export default function generateLoginView() {
  return `
    <div class="logo-wrapper">
      <img src="/assets/icons/flashify-logo.svg" alt="Flashify Logo" class="logo" />
    </div>
      
    <section class="login-container">
      <div class="login-illustration">
       <img src="/assets/images/login-illustration.png" alt="Login Illustration" />
      </div>
      <div class="login-form-wrapper">
        <h1>Welcome Back!</h1>
        <p>Log in with your account to get access to our services.</p>
        
        <form id="login-form" class="login-form">
          <label for="email">Email</label>
          <input type="email" id="email" placeholder="Enter your email" required />
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Enter your password" required />
          <button type="submit">Login</button>
        </form>
        <small class="login-register">Don't have an account? <a href="#/register">Register</a></small>
      </div>
    </section>
  `;
}
