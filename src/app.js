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
    if (typeof PresenterOrInstance === 'object') {
      this.presenter = PresenterOrInstance;
    } else if (typeof PresenterOrInstance === 'function') {
      const hash = window.location.hash;
      const match = hash.match(/#\/collection\/(\d+)/);

      if (match && PresenterOrInstance.routeParams) {
        const id = PresenterOrInstance.routeParams.id;
        this.presenter = new PresenterOrInstance(this.rootElement, { id });
        delete PresenterOrInstance.routeParams;
      } else {
        this.presenter = new PresenterOrInstance(this.rootElement);
      }
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

  // Menangani pencarian
  async handleSearch(query) {
    if (this.presenter?.handleSearch) {
      await this.presenter.handleSearch(query);
    }
  }

  // Menangani penghapusan item
  async handleDelete(id) {
    if (this.presenter?.handleDelete) {
      await this.presenter.handleDelete(id);
    }
  }
}
