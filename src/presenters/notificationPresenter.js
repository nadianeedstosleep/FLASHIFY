import NotificationModel from '../models/notificationModel.js';
import NotificationView from '../views/notificationView.js';

export default class NotificationPresenter {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  async render() {
    const notifications = await NotificationModel.getNotifications();
    return NotificationView.render(notifications);
  }

  async afterRender() {
    NotificationView.afterRender();
  }
}
