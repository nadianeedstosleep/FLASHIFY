import FlashcardModel from "../models/flashcardModel.js";
import MultipleChoiceView from "../views/multipleChoiceView.js";
import CompletionPopup from "../components/completionPopup.js";

export default class MultipleChoicePresenter {
  constructor(containerElement, numberOfCards) {
    this.containerElement = containerElement;
    this.model = new FlashcardModel(numberOfCards);
    this.view = MultipleChoiceView;
    this.attempts = 1; // Track attempt di presenter
  }

  render() {
    document.body.classList.add('multiple-choice-page');
    document.body.classList.remove('flashcard-page');

    const questions = this.model.cards;
    const categories = JSON.parse(localStorage.getItem('flashcardCategories')) || [];

    return this.view.render({ questions, categories });
  }

  async afterRender() {
    this.view.afterRender({
      onFinish: () => this.showCompletionPopup()
    });
  }

  showCompletionPopup() {
    const popupHTML = CompletionPopup({
      progress: 100,
      attempts: this.attempts,
    });

    const wrapper = document.createElement('div');
    wrapper.innerHTML = popupHTML;
    document.body.appendChild(wrapper);

    document.getElementById('re-attempt')?.addEventListener('click', () => {
      this.attempts += 1;
      location.reload(); // Bisa diganti jika ingin mereset manual tanpa reload
    });

    document.getElementById('popup-finish-btn')?.addEventListener('click', () => {
      const overlay = document.querySelector('.popup-overlay');
      if (overlay) overlay.remove();

      document.body.classList.remove('multiple-choice-page');
      window.location.hash = '#/dashboard';
    });
  }
}