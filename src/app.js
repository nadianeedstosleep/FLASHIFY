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
    this.presenter = new Presenter(this.rootElement);  
    const view = await this.presenter.render(); 
    this.rootElement.innerHTML = view;
    if (this.presenter.afterRender) {
      await this.presenter.afterRender();  
    }
  }
}
