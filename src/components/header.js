import '../styles/headerStyle.css';

const Header = {
  render() {
    const user = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    const storedPic = localStorage.getItem('profilePicture') || 'https://ui-avatars.com/api/?name=User&background=DAAAD6&color=fff';

    return `
    <header class="app-header">
        <div class="header-logo">
          <button id="burgerMenuBtn" class="burger-menu-btn" aria-label="Toggle sidebar">&#9776;</button>
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
            <img src="${storedPic}" alt="User" class="avatar" />
            <img src="/assets/icons/dropdown-icon.svg" alt="Dropdown" class="dropdown-icon" />
            </button>
            <div id="profileDropdown" class="profile-dropdown hidden">
            <a href="#/profile" id="profileLink">Profile</a>
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
    const profileLink = document.getElementById('profileLink');
    const burgerMenuBtn = document.getElementById('burgerMenuBtn');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    if (!profileBtn || !dropdown || !logoutLink || !profileLink) {
      console.warn('Some header elements not found in DOM');
      return;
    }

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

    profileLink.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.hash = '#/profile';
    });

    if (burgerMenuBtn && sidebar && overlay) {
      burgerMenuBtn.addEventListener('click', () => {
        const isExpanded = sidebar.classList.contains('expanded');
        sidebar.classList.toggle('expanded', !isExpanded);
        sidebar.classList.toggle('collapsed', isExpanded);
        if (!isExpanded) {
          overlay.classList.add('active');
        } else {
          overlay.classList.remove('active');
        }
      });

      overlay.addEventListener('click', () => {
        sidebar.classList.remove('expanded');
        sidebar.classList.add('collapsed');
        overlay.classList.remove('active');
      });
    }
  }
};

export default Header;

