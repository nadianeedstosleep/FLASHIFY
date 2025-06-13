// src/models/historyModel.js
const BASE_URL = 'http://127.0.0.1:8000';

export default {
  async getHistories() {
    try {
      const response = await fetch(`${BASE_URL}/history`);
      const data = await response.json();

      // Cek jika data bukan array
      if (!Array.isArray(data)) {
        console.warn('⚠️ getHistories: Expected array but got:', data);
        return [];
      }

      // Ubah ke bentuk sesuai kebutuhan
      return data.map(item => ({
        id: item.id || item._id || Date.now().toString(), // fallback
        title: item.title || 'Untitled',
        reviewed: item.reviewed || 0,
        total: item.total || 1,
        lastAccess: item.timestamp || new Date().toISOString(), // ⬅️ ambil dari timestamp
      }));
    } catch (err) {
      console.error('❌ Gagal fetch history:', err);
      return [];
    }
  },

  deleteHistory(id) {
    // nanti bisa pakai API backend juga
  }
};
