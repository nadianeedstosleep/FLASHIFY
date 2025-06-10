import '../styles/sidebarStyle.css';
import '../styles/main.css';

const Sidebar = {
  render() {
    const isOpen = localStorage.getItem('sidebarOpen') !== 'false';
    const currentHash = window.location.hash;

    return `
      <nav class="sidebar ${isOpen ? 'expanded' : 'collapsed'}">
        <div class="sidebar-header">
          <button id="toggleSidebar" class="sidebar-toggle">&#9776;</button>
          <img src="/assets/icons/flashify-logo.svg" alt="Flashify Logo" class="sidebar-logo ${isOpen ? 'expanded' : 'collapsed'}" />
        </div>
        <ul class="sidebar-menu">
          ${this.renderMenuItem('Dashboard', 'home', isOpen, currentHash === '#/dashboard')}
          ${this.renderMenuItem('Community', 'users', isOpen, currentHash === '#/community')}
          ${this.renderMenuItem('Notifications', 'bell', isOpen, currentHash === '#/notifications')}
          <hr />
          ${this.renderMenuItem('History', 'clock', isOpen, currentHash === '#/history')}
          ${this.renderMenuItem('Collection', 'folder', isOpen, currentHash === '#/collection')}
        </ul>
      </nav>
    `;
  },

  renderMenuItem(label, iconName, isOpen, isActive = false) {
    const icon = this.getIcon(iconName);
    const route = '#/' + label.toLowerCase(); 
    return `
      <li class="${isActive ? 'active' : ''}">
        <a href="${route}" class="sidebar-link">
          <span class="sidebar-icon">${icon}</span>
          <span class="sidebar-label ${isOpen ? '' : 'collapsed'}">${label}</span>
        </a>
      </li>
    `;
  },

  getIcon(name) {
    const icons = {
      home: '<i class="fa-solid fa-house"></i>',
      users: '<i class="fa-solid fa-users"></i>',
      bell: '<i class="fa-solid fa-bell"></i>',
      clock: '<i class="fa-solid fa-clock"></i>',
      folder: '<i class="fa-solid fa-folder"></i>',
    };
    return icons[name] || '';
  },

  afterRender() {
    const sidebar = document.querySelector('.sidebar');
    const toggleBtn = document.getElementById('toggleSidebar');

    if (!sidebar || !toggleBtn) {
      console.warn('[Sidebar] Sidebar or toggle button not found.');
      return;
    }

    // Create overlay element for small screen sidebar
    let overlay = document.querySelector('.sidebar-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.classList.add('sidebar-overlay');
      document.body.appendChild(overlay);
    }

    const logo = sidebar.querySelector('.sidebar-logo');
    if (!logo) {
      console.warn('[Sidebar] Logo not found inside sidebar.');
      return;
    }

    toggleBtn.addEventListener('click', () => {
      console.log('Sidebar toggle clicked');
      const isExpanded = sidebar.classList.contains('expanded');
      console.log('Sidebar isExpanded:', isExpanded);
      sidebar.classList.toggle('expanded', !isExpanded);
      sidebar.classList.toggle('collapsed', isExpanded);
      logo.classList.toggle('expanded', !isExpanded);
      logo.classList.toggle('collapsed', isExpanded);
      localStorage.setItem('sidebarOpen', String(!isExpanded));
      document.dispatchEvent(new Event('sidebarToggled'));

      // Toggle overlay visibility
      if (!isExpanded) {
        overlay.classList.add('active');
        toggleBtn.style.left = '250px'; // Move toggle button right when sidebar open
      } else {
        overlay.classList.remove('active');
        toggleBtn.style.left = '1rem'; // Reset toggle button position when sidebar closed
      }
    });

    // Force sidebar expanded on small devices for testing
    if (window.innerWidth < 768) {
      sidebar.classList.add('expanded');
      sidebar.classList.remove('collapsed');
      logo.classList.add('expanded');
      logo.classList.remove('collapsed');
      overlay.classList.add('active');
    }

    // Close sidebar when clicking on overlay
    overlay.addEventListener('click', () => {
      sidebar.classList.remove('expanded');
      sidebar.classList.add('collapsed');
      logo.classList.remove('expanded');
      logo.classList.add('collapsed');
      localStorage.setItem('sidebarOpen', 'false');
      overlay.classList.remove('active');
      document.dispatchEvent(new Event('sidebarToggled'));
    });
  }
};

export default Sidebar;
