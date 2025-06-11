const histories = [
  {
    id: '1',
    title: 'Cara masuk Isekai',
    lastAccess: new Date(),
    reviewed: 10,
    total: 10,
  },
  {
    id: '2',
    title: 'Cara masuk Isekai',
    lastAccess: new Date(),
    reviewed: 8,
    total: 10,
  },
  {
    id: '3',
    title: 'Cara masuk Isekai',
    lastAccess: new Date('2025-05-16'),
    reviewed: 8,
    total: 10,
  }
];

export default {
  getHistories() {
    return histories;
  },
  deleteHistory(id) {
    const index = histories.findIndex(h => h.id === id);
    if (index > -1) {
      histories.splice(index, 1);
    }
  }
};