import '../styles/saveToCollectionStyle.css';

export default class SaveToCollectionModal {
  constructor(rootElement, collections, onSave, onCancel) {
    this.rootElement = rootElement;
    this.collections = collections || [];
    this.onSave = onSave;
    this.onCancel = onCancel;
    this.modalElement = null;
  }

  render() {
    const collectionsHtml = this.collections.map((col, index) => `
      <label class="save-collection-item">
        <input type="checkbox" name="collection" value="${col}" ${index === 0 ? 'checked' : ''} />
        <span>${col}</span>
      </label>
    `).join('');

    const modalHtml = `
      <div class="save-collection-overlay">
        <div class="save-collection-modal">
          <button class="close-button" aria-label="Close">&times;</button>
          <h2>Save Your Flashcard in Collection</h2>
          <div class="add-to-collection">
            <label class="section-label">Add to Collection</label>
            <div class="collections-list">
              ${collectionsHtml}
            </div>
          </div>
          <hr />
          <div class="create-new-collection">
            <label class="section-label" for="new-collection-input">Create new collection</label>
            <input type="text" id="new-collection-input" placeholder="Name your new Collection" />
          </div>
          <button class="btn-save-collection">Add to Collection</button>
        </div>
      </div>
    `;

    this.rootElement.insertAdjacentHTML('beforeend', modalHtml);
    this.modalElement = this.rootElement.querySelector('.save-collection-overlay');

    this.modalElement.querySelector('.close-button').addEventListener('click', () => {
      this.destroy();
      if (this.onCancel) this.onCancel();
    });

    this.modalElement.querySelector('.btn-save-collection').addEventListener('click', () => {
      const checkedCollections = Array.from(this.modalElement.querySelectorAll('input[name="collection"]:checked')).map(input => input.value);
      const newCollectionInput = this.modalElement.querySelector('#new-collection-input').value.trim();
      if (newCollectionInput) {
        checkedCollections.push(newCollectionInput);
      }
      this.destroy();
      if (this.onSave) this.onSave(checkedCollections);
    });
  }

  destroy() {
    if (this.modalElement) {
      this.modalElement.remove();
      this.modalElement = null;
    }
  }
}