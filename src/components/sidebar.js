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

    const logo = sidebar.querySelector('.sidebar-logo');
    if (!logo) {
      console.warn('[Sidebar] Logo not found inside sidebar.');
      return;
    }

    toggleBtn.addEventListener('click', () => {
      const isExpanded = sidebar.classList.contains('expanded');
      sidebar.classList.toggle('expanded', !isExpanded);
      sidebar.classList.toggle('collapsed', isExpanded);
      logo.classList.toggle('expanded', !isExpanded);
      logo.classList.toggle('collapsed', isExpanded);
      localStorage.setItem('sidebarOpen', String(!isExpanded));
      document.dispatchEvent(new Event('sidebarToggled'));
    });
  }
};

export default Sidebar;
