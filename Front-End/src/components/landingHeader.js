import '../styles/landingHeaderStyle.css';

export function createHeader() {
  const header = document.createElement('header');
  header.className = 'header';

  const logo = document.createElement('div');
  logo.className = 'header__logo';
  logo.textContent = 'Flashify';

  const loginBtn = document.createElement('a');
  loginBtn.className = 'header__login-btn';
  loginBtn.href = '#/login';
  loginBtn.textContent = 'Have an Account?';

  header.appendChild(logo);
  header.appendChild(loginBtn);

  return header;
}
