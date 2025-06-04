class DashboardModel {
  constructor() {
    this.collections = [];
    this.history = [];
  }

  getCollections() {
    return [
      { title: 'My Collection 1', count: 2, image: '/assets/images/collection-1.png' },
      { title: 'My Collection 2', count: 10, image: '/assets/images/collection-1.png' },
    ];
  }

  getHistory() {
    return [
      { type: 'Multiple Choice', title: 'English Conversation', time: '1 Hour Ago', completion: 80 },
      { type: 'Front-Back', title: 'Business and Technology', time: '2 Hour Ago', completion: 50 },
      { type: 'Multiple Choice', title: 'Algebra Quiz', time: '3 Hour Ago', completion: 100 },
    ];
  }
}

export default new DashboardModel();
