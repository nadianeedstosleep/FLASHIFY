// src/presenters/historyPresenter.js
import historyModel from '../models/historyModel.js';
import HistoryView from '../views/historyView.js';

export default class HistoryPresenter {
  constructor(rootElement) {
    this.root = rootElement;
  }

  async render() {
    this.histories = await historyModel.getHistories(); // ← harus `await`
    this.root.innerHTML = HistoryView.render(this.histories);
    await this.afterRender();
  }

  async afterRender() {
    HistoryView.afterRender();

    this.root.querySelector('#search-history')?.addEventListener('input', async (e) => {
      const query = e.target.value.toLowerCase();
      const filtered = this.histories.filter(h => h.title.toLowerCase().includes(query));
      this.root.innerHTML = HistoryView.render(filtered);
      await this.afterRender();
    });
  }

  async refresh() {
    this.histories = await historyModel.getHistories();  // ← tambahkan await di sini
    this.root.innerHTML = HistoryView.render(this.histories);
    await this.afterRender();
  }
}