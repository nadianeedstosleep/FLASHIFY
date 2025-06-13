import FlashcardModel from "../models/flashcardModel.js";
import FlashcardView from "../views/flashcardView.js";
import FlashcardComponent from "../components/flashcard.js";
import CompletionPopup from "../components/completionPopup.js";

export default class FlashcardPresenter {
  constructor(containerElement) {
    this.containerElement = containerElement;
    const sectionId = localStorage.getItem('flashcardSectionId') || 'Seksi_1';
    this.model = new FlashcardModel(sectionId);
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

    await this.model.fetchCardsFromJson(); // Ambil dari file JSON
    this.view.bindNav(() => this.showPrev(), () => this.showNext());
    this.updateView();

    const closeBtn = document.querySelector('.close-btn');
    closeBtn?.addEventListener('click', () => {
      window.location.hash = '#/dashboard';
    });
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

    this.reviewedCount = this.model.getPagination().total;  // Simpan total sebagai reviewed
  }

  showCompletionPopup() {
    // Bersihkan popup lama kalau ada
    document.querySelector('.popup-overlay')?.remove();

    const popupHTML = CompletionPopup({
      progress: 100,
      attempts: this.attempts,
    });

    const wrapper = document.createElement('div');
    wrapper.innerHTML = popupHTML;
    document.body.appendChild(wrapper);

    // 🔁 Simpan progress ke backend
    const collectionId = localStorage.getItem('flashcardCollectionId');
    const title = localStorage.getItem('flashcardCollectionTitle') || 'Untitled';
    const total = this.model.cards.length;

    fetch('http://127.0.0.1:8000/save-history', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: collectionId,
        title,
        reviewed: this.reviewedCount || total,  // ← pakai reviewedCount
        total,
        lastAccess: new Date().toISOString(),
      }),
    }).then(res => res.json()).then(console.log).catch(console.error);

    setTimeout(() => {
      document.getElementById('re-attempt')?.addEventListener('click', () => {
        location.reload();
      });

      document.getElementById('popup-finish-btn')?.addEventListener('click', () => {
        document.querySelector('.popup-overlay')?.remove();
        window.location.hash = '#/dashboard';
      });
    }, 0);
  }
}