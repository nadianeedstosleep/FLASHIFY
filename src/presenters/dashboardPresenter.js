import DashboardModel from '../models/dashboardModel.js';
import DashboardView from '../views/dashboardView.js';

export default class DashboardPresenter {
  constructor(rootElement) {
    this.rootElement = rootElement;
    this.model = DashboardModel;
    this.view = DashboardView;
  }

  async render() {
    const loggedIn = localStorage.getItem('isLoggedIn');
    if (!loggedIn) {
        window.location.hash = '#/login';
        return '<p>Redirecting to login...</p>';
    }

    const collections = this.model.getCollections();
    const history = await DashboardModel.getHistory(); 

    return this.view.render({ collections, history });
  }

  async afterRender() {
    this.view.afterRender();
  }
}