import '../styles/headerStyle.css';

const Header = {
  render() {
    return `
    <header class="app-header">
        <div class="header-logo">
        <img src="/assets/icons/flashify-logo.svg" alt="Flashify Logo" class="logo" />
        </div>

        <div class="header-search">
        <input type="text" placeholder="Search Flashcard" />
        <img src="/assets/icons/search-icon.svg" alt="Search" class="search-icon" />
        </div>

        <div class="header-right">
        <button id="notifBtn" class="notif-button">
            <img src="/assets/icons/bell-icon.svg" alt="Notifications" />
        </button>

        <div class="profile-wrapper">
            <button id="profileBtn" class="profile-button">
            <img src="https://ui-avatars.com/api/?name=User&background=DAAAD6&color=fff" alt="User" class="avatar" />
            <img src="/assets/icons/dropdown-icon.svg" alt="Dropdown" class="dropdown-icon" />
            </button>
            <div id="profileDropdown" class="profile-dropdown hidden">
            <a href="#/profile-pic-edit">Profile Picture</a>
            <a href="#/" id="logoutLink">Logout</a>
            </div>
        </div>
        </div>
    </header>
    `;
  },

afterRender() {
  const profileBtn = document.getElementById('profileBtn');
  const dropdown = document.getElementById('profileDropdown');
  const logoutLink = document.getElementById('logoutLink');

  profileBtn.addEventListener('click', () => {
    dropdown.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.add('hidden');
    }
  });

  logoutLink.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.hash = '#/login';
  });
}
};

export default Header;

