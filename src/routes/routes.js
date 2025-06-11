// src/routes/routes.js
import LandingPresenter from '../presenters/landingPresenter.js';  
import LoginPresenter from '../presenters/loginPresenter.js';  
import RegisterPresenter from '../presenters/registerPresenter.js';
import DashboardPresenter from '../presenters/dashboardPresenter.js';
import FlashcardPresenter from '../presenters/flashcardPresenter.js';
import MultipleChoicePresenter from '../presenters/multipleChoicePresenter.js';
import CollectionPresenter from '../presenters/collectionPresenter.js';
import NotificationPresenter from '../presenters/notificationPresenter.js';
import HistoryPresenter from '../presenters/historyPresenter.js';
import ProfilePresenter from '../presenters/profilePresenter.js';

export const routes = {
  '#/': LandingPresenter,  
  '#/login': LoginPresenter,
  '#/register': RegisterPresenter,
  '#/dashboard': DashboardPresenter,
  '#/flashcard': FlashcardPresenter,
  '#/multiple-choice': MultipleChoicePresenter, 
  '#/collection': CollectionPresenter,
  '#/notifications': NotificationPresenter,
  '#/history': HistoryPresenter,
  '#/profile': ProfilePresenter,
};
