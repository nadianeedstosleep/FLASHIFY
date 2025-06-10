import { landingModel } from '../models/landingModel.js';
import { renderLanding } from '../views/landingView.js';
import { createHeader } from '../components/landingHeader.js';
import { createFooter } from '../components/footer.js';
import '../styles/landingHeaderStyle.css';
import '../styles/footerStyle.css';
import '../styles/landingStyle.css';
import '../../public/assets/images/landing-1.png'

export default class LandingPresenter {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  async render() {
    // Clear rootElement content
    this.rootElement.innerHTML = '';

    // Insert landingHeader at the top of rootElement
    const header = createHeader();
    this.rootElement.appendChild(header);

    // Create main content container
    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';
    this.rootElement.appendChild(mainContent);

    // Render landing content inside mainContent
    renderLanding(landingModel, mainContent);

    // Insert footer component at the bottom of rootElement
    const footer = createFooter();
    this.rootElement.appendChild(footer);

    return '';
  }

  async afterRender() {
    // Bind any redirects or event handlers
    // Assuming landingView.bindRedirects exists
    if (typeof window.landingView !== 'undefined' && typeof window.landingView.bindRedirects === 'function') {
      window.landingView.bindRedirects();
    }
  }
}
