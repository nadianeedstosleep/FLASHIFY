import CompletionPopup from '../components/completionPopup.js';

export default class FlashcardView {
  constructor() {
    this.container = document.getElementById('flashcard-container');
  }

  renderCard(data) {
    this.container.innerHTML = `
      <div class="flashcard" id="flashcard">
        <div class="flashcard-face flashcard-front">${data.front}<br/><span style="font-size:1rem;"></span></div>
        <div class="flashcard-face flashcard-back">${data.back}</div>
      </div>
    `;

    this.card = document.getElementById('flashcard');
    this.card?.addEventListener('click', () => {
      this.card.classList.toggle('is-flipped');
    });
  }

  updatePagination({ current, total }) {
    const el = document.getElementById('pagination');
    if (el) el.textContent = `${current + 1}/${total}`;
  }

  bindNav(onPrev, onNext) {
    document.getElementById('prev-btn')?.addEventListener('click', onPrev);
    document.getElementById('next-btn')?.addEventListener('click', onNext);
  }
}