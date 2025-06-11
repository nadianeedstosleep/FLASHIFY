export default class App {
  constructor() {
    this.rootElement = document.getElementById('main-content');  
    if (!this.rootElement) {
      console.error('Root element with id "main-content" not found.');
      return;  
    }
    this.presenter = null;
  }

  // Menambahkan Presenter ke aplikasi
  async setPresenter(PresenterOrInstance) {
    // Jika sudah berupa instance (sudah dibuat dengan `new`)
    if (typeof PresenterOrInstance === 'object') {
      this.presenter = PresenterOrInstance;
    }
    // Jika masih class (fungsi konstruktor)
    else if (typeof PresenterOrInstance === 'function') {
      this.presenter = new PresenterOrInstance(this.rootElement);
    } else {
      console.error('Invalid presenter:', PresenterOrInstance);
      return;
    }

    const view = await this.presenter.render?.();
    if (typeof view === 'string') {
      this.rootElement.innerHTML = view;
    }

    if (typeof this.presenter.afterRender === 'function') {
      await this.presenter.afterRender();
    }
}

  // Fungsi untuk menangani event ketika pengguna melakukan pencarian atau klik pada elemen lainnya
  async handleSearch(query) {
    if (this.presenter) {
      await this.presenter.handleSearch(query); // Menangani pencarian berdasarkan query
    }
  }

  // Fungsi untuk menangani penghapusan item riwayat
  async handleDelete(id) {
    if (this.presenter) {
      await this.presenter.handleDelete(id); // Menangani penghapusan riwayat berdasarkan id
    }
  }
}