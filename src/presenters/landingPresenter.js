export default class LandingPresenter {
  constructor(rootElement) {
    this.rootElement = rootElement;
  }

  render() {
    return `
      <h1>Welcome to Flashify!</h1>
      <p>Your flashcard generator app.</p>
    `;
  }
}
