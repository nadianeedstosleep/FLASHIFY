import FlashcardModel from "../models/flashcardModel.js";
import FlashcardView from "../views/flashcardView.js";
import FlashcardComponent from "../components/flashcard.js";
import CompletionPopup from "../components/completionPopup.js";

export default class FlashcardPresenter {
  constructor(containerElement, numberOfCards) {
    this.containerElement = containerElement;
    this.model = new FlashcardModel(numberOfCards);
    this.view = null;
    this.attempts = 1;
  }

  render() {
    document.body.classList.add('flashcard-page');
  document.body.classList.remove('multiple-choice-page');
    const categories = JSON.parse(localStorage.getItem('flashcardCategories')) || [];

    return FlashcardComponent({
      categories
    });
  }

  async afterRender() {
    this.view = new FlashcardView();
    this.view.bindNav(() => this.showPrev(), () => this.showNext());
    this.updateView();

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        window.location.hash = '#/dashboard';
      });
    }
  }

  updateView() {
    const currentCard = this.model.getCurrentCard();
    if (currentCard) {
      this.view.renderCard(currentCard);
      this.view.updatePagination(this.model.getPagination());
    }
  }

  showPrev() {
    this.model.prevCard();
    this.updateView();
  }

  showNext() {
    this.model.nextCard();
    this.updateView();

    if (this.model.getPagination().current + 1 >= this.model.getPagination().total) {
      this.showCompletionPopup();
    }
  }

  showCompletionPopup() {
    const popupHTML = CompletionPopup({
      progress: 100, // Atur sesuai tracking
      attempts: 3,   // Ambil dari model atau simpanan
    });
    const wrapper = document.createElement('div');
    wrapper.innerHTML = popupHTML;
    document.body.appendChild(wrapper);

    document.getElementById('re-attempt')?.addEventListener('click', () => {
      // reset ulang
      location.reload();
    });

    document.getElementById('popup-finish-btn')?.addEventListener('click', () => {
      const overlay = document.querySelector('.popup-overlay');
      if (overlay) overlay.remove();
      window.location.hash = '#/dashboard';
    });
  }
}