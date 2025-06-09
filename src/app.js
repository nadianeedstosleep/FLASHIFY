export default class App {
  constructor() {
    this.rootElement = document.getElementById('main-content');  
    if (!this.rootElement) {
      console.error('Root element with id "main-content" not found.');
      return;  
    }
    this.presenter = null;
  }

  async setPresenter(Presenter) {
    const hash = window.location.hash;
    const match = hash.match(/#\/collection\/(\d+)/);

    let presenterInstance;

    if (match && Presenter.routeParams) {
      const id = Presenter.routeParams.id;
      presenterInstance = new Presenter(this.rootElement, { id });
      delete Presenter.routeParams; 
    } else {
      presenterInstance = new Presenter(this.rootElement);
    }

    this.presenter = presenterInstance;

    const view = await this.presenter.render();
    this.rootElement.innerHTML = view;
    if (this.presenter.afterRender) {
      await this.presenter.afterRender();
    }
  }
}
