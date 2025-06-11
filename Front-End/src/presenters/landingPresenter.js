import LandingModel from '../models/landingModel.js';
import LandingView from '../views/landingView.js';
import { createHeader } from '../components/landingHeader.js';
import { createFooter } from '../components/footer.js';
import '../styles/landingHeaderStyle.css';
import '../styles/footerStyle.css';
import '../styles/landingStyle.css';

export default class LandingPresenter {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.model = new LandingModel();
    this.view = new LandingView();
  }

  async render() {
    const features = this.model.getFeatures();
    const callToAction = this.model.getCallToAction();
    const benefits = this.model.getBenefits();

    this.rootElement.innerHTML = '';

    // Insert header
    const header = createHeader();
    this.rootElement.appendChild(header);

    // Create main content container
    const mainContent = document.createElement('div');
    mainContent.id = 'main-content';
    mainContent.innerHTML = this.view.render({ features, callToAction, benefits });
    this.rootElement.appendChild(mainContent);

    // Insert footer
    const footer = createFooter();
    this.rootElement.appendChild(footer);

    return '';
  }

  async afterRender() {
    this.view.afterRender();
  }
}
