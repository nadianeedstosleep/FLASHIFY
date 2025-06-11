// routes.js
import LandingPresenter from '../presenters/landingPresenter.js';  
import LoginPresenter from '../presenters/loginPresenter.js';  
import RegisterPresenter from '../presenters/registerPresenter.js';
import DashboardPresenter from '../presenters/dashboardPresenter.js';
import CollectionPresenter from '../presenters/collectionPresenter.js';
import NotificationPresenter from '../presenters/notificationPresenter.js';
import ProfilePresenter from '../presenters/profilePresenter.js';
import DetailCollectionPresenter from '../presenters/detailCollectionPresenter.js';
import CommunityPresenter from '../presenters/communityPresenter.js';
import CommunityDetailPresenter from '../presenters/communityDetailPresenter.js';

export const routes = {
  '#/': LandingPresenter,
  '#/landing': LandingPresenter,
  '#/login': LoginPresenter,
  '#/register': RegisterPresenter,
  '#/dashboard': DashboardPresenter,
  '#/collection': CollectionPresenter,
  '#/notifications': NotificationPresenter,
  '#/profile': ProfilePresenter,
  '#/community': CommunityPresenter, // Assuming community is part of collections
};

export const dynamicRoutes = [
  {
    pattern: /^#\/collection\/(\d+)$/,
    presenter: DetailCollectionPresenter,
    paramKeys: ['id'],
  },
  {
    pattern: /^#\/community\/(\d+)$/,
    presenter: CommunityDetailPresenter,
    paramKeys: ['id'],
  }
];
