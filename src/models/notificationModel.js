class NotificationModel {
  getNotifications() {
    return [
      {
        id: 1,
        user: 'You',
        message: 'just post a new flashcard “Bear Knowledge 101”',
        detail: 'Bears are large, powerful mammals with distinctive features like shaggy hair, plantigrade feet (walking flat-footed), and short tails. They have a large body size, stocky legs, a long snout, and small, rounded ears.',
      },
    ];
  }
}

export default new NotificationModel();
