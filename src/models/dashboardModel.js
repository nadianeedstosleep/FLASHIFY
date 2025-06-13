class DashboardModel {
  constructor() {
    this.collections = [];
    this.history = [];
  }

  getCollections() {
    return [
      { title: 'My Collection 1', count: 2, image: '/assets/images/collection-1.png', id: 'My_Collection_1' },
      { title: 'My Collection 2', count: 10, image: '/assets/images/collection-1.png', id: 'My_Collection_2' },
    ];
  }

  async getHistory() {
    try {
      const response = await fetch('http://127.0.0.1:8000/history');
      const result = await response.json();

      // Sort by lastAccess (descending) dan ambil 3 pertama
      const sorted = result
        .sort((a, b) => new Date(b.lastAccess) - new Date(a.lastAccess))
        .slice(0, 3);

      return sorted.map(item => ({
        title: item.title || 'Untitled',
        type: item.type || 'Flashcard',
        time: new Date(item.lastAccess).toLocaleTimeString('id-ID', {
          hour: '2-digit', minute: '2-digit', hour12: false
        }),
        completion: Math.round((item.reviewed / item.total) * 100),
      }));
    } catch (err) {
      console.error('❌ Gagal fetch history:', err);
      return [];
    }
  }
}

export default new DashboardModel();
