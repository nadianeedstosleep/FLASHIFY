// src/routes/routes.js
import LandingPresenter from '../presenters/landingPresenter.js';  
import LoginPresenter from '../presenters/loginPresenter.js';  
import RegisterPresenter from '../presenters/registerPresenter.js';
import DashboardPresenter from '../presenters/dashboardPresenter.js';

export const routes = {
  '#/': LandingPresenter,  
  '#/login': LoginPresenter,
  '#/register': RegisterPresenter,
  '#/dashboard': DashboardPresenter
};
