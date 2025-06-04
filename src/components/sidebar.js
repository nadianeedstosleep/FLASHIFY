import '../styles/sidebarStyle.css';
import '../styles/main.css';

const Sidebar = {
  render(isOpen = true) {
   return `
    <nav class="sidebar ${isOpen ? 'expanded' : 'collapsed'}">
        <div class="sidebar-header">
        <button id="toggleSidebar" class="sidebar-toggle">&#9776;</button>
        <img src="/assets/icons/flashify-logo.svg" alt="Flashify Logo" class="sidebar-logo ${isOpen ? 'expanded' : 'collapsed'}" />
        </div>
        <ul class="sidebar-menu">
        ${this.renderMenuItem('Home', 'home', isOpen, true)}
        ${this.renderMenuItem('Community', 'users', isOpen)}
        ${this.renderMenuItem('Notifications', 'bell', isOpen)}
        <hr />
        ${this.renderMenuItem('History', 'clock', isOpen)}
        ${this.renderMenuItem('Collection', 'folder', isOpen)}
        </ul>
    </nav>
    `;
  },

  renderMenuItem(label, iconName, isOpen, isActive = false) {
    const icon = this.getIcon(iconName);
    return `
      <li class="${isActive ? 'active' : ''}">
        <span class="sidebar-icon">${icon}</span>
        <span class="sidebar-label ${isOpen ? '' : 'collapsed'}">${label}</span>
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

    toggleBtn.addEventListener('click', () => {
      sidebar.classList.toggle('expanded');
      sidebar.classList.toggle('collapsed');

      document.dispatchEvent(new Event('sidebarToggled'));
    });
  }
};

export default Sidebar;
