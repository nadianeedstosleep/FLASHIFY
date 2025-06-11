export default class App {
  constructor() {
    this.rootElement = document.getElementById('main-content');  
    if (!this.rootElement) {
      console.error('Root element with id "main-content" not found.');
      return;  
    }
    this.presenter = null;
  }

<<<<<<< HEAD
  async setPresenter(Presenter, params = null) {
=======
  async setPresenter(Presenter) {
>>>>>>> 73ca349d07d88c13da0f2591aa8fc2beeb399262
    const hash = window.location.hash;
    const match = hash.match(/#\/collection\/(\d+)/);

    let presenterInstance;

<<<<<<< HEAD
    if (params) {
      presenterInstance = new Presenter(this.rootElement, params);
=======
    if (match && Presenter.routeParams) {
      const id = Presenter.routeParams.id;
      presenterInstance = new Presenter(this.rootElement, { id });
      delete Presenter.routeParams; 
>>>>>>> 73ca349d07d88c13da0f2591aa8fc2beeb399262
    } else {
      presenterInstance = new Presenter(this.rootElement);
    }

    this.presenter = presenterInstance;

    const view = await this.presenter.render();
<<<<<<< HEAD
    if (view !== null && view !== undefined && view !== '') {
      this.rootElement.innerHTML = view;
    }
=======
    this.rootElement.innerHTML = view;
>>>>>>> 73ca349d07d88c13da0f2591aa8fc2beeb399262
    if (this.presenter.afterRender) {
      await this.presenter.afterRender();
    }
  }
}
