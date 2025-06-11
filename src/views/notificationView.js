import Sidebar from '../components/sidebar.js';
import Header from '../components/header.js';
import '../styles/notificationStyle.css';

const NotificationView = {
  render(notifications) {
    return `
      <div class="dashboard-container">
        ${Sidebar.render(true)}
        <div class="dashboard-main">
          ${Header.render()}
          <main class="notification-page">
            <h1>Notifications</h1>
            <div class="notification-list">
              ${notifications.map(n => `
                <div class="notification-card">
                  <div class="notification-content">
                    <strong>${n.user} ${n.message}</strong>
                    <p>${n.detail}</p>
                    <button class="see-btn">See Flashcard</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </main>
        </div>
      </div>
    `;
  },

  afterRender() {
    Sidebar.afterRender();
    Header.afterRender();
  }
};

export default NotificationView;
