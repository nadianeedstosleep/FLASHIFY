export default class App {
  constructor() {
    this.rootElement = document.getElementById('main-content');  
    if (!this.rootElement) {
      console.error('Root element with id "main-content" not found.');
      return;  
    }
    this.presenter = null;
  }

  async setPresenter(Presenter, params = null) {
    const hash = window.location.hash;
    const match = hash.match(/#\/collection\/(\d+)/);

    let presenterInstance;

    if (params) {
      presenterInstance = new Presenter(this.rootElement, params);
    } else {
      presenterInstance = new Presenter(this.rootElement);
    }

    this.presenter = presenterInstance;

    const view = await this.presenter.render();
    if (view !== null && view !== undefined && view !== '') {
      this.rootElement.innerHTML = view;
    }
    if (this.presenter.afterRender) {
      await this.presenter.afterRender();
    }
  }
}
