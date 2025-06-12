import '../styles/confirmationPlayStyle.css';

export default class ConfirmationPlay {
  constructor(rootElement, flashcardSet, onConfirm, onCancel) {
    this.rootElement = rootElement;
    this.flashcardSet = flashcardSet;
    this.onConfirm = onConfirm;
    this.onCancel = onCancel;
    this.modalElement = null;
  }

  render() {
    const { title, author } = this.flashcardSet;
    const modalHtml = `
      <div class="confirmation-play-overlay">
        <div class="confirmation-play-modal">
          <h2>Start studying this flashcard set?</h2>
          <p>You're about to start learning the flashcard set: <strong>${title}</strong> by <strong>${author}</strong>. Do you want to continue?</p>
          <div class="confirmation-play-buttons">
            <button class="btn-confirm">Yes, Start Learning</button>
            <button class="btn-cancel">Cancel</button>
          </div>
        </div>
      </div>
    `;

    this.rootElement.insertAdjacentHTML('beforeend', modalHtml);
    this.modalElement = this.rootElement.querySelector('.confirmation-play-overlay');

    this.modalElement.querySelector('.btn-confirm').addEventListener('click', () => {
      this.destroy();
      if (this.onConfirm) this.onConfirm();
    });

    this.modalElement.querySelector('.btn-cancel').addEventListener('click', () => {
      this.destroy();
      if (this.onCancel) this.onCancel();
    });
  }

  destroy() {
    if (this.modalElement) {
      this.modalElement.remove();
      this.modalElement = null;
    }
  }
}