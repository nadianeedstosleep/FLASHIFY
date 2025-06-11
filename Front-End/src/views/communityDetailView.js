import Sidebar from '../components/sidebar.js';
import Header from '../components/header.js';

export default function generateCommunityDetailView() {
  return `
    <div class="dashboard-container">
      ${Sidebar.render(true)}
      <div class="dashboard-main">
        ${Header.render()}
        <div id="preview-container"></div>
      </div>
    </div>
  `;
}
