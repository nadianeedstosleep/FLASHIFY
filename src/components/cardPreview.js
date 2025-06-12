import ConfirmationPlay from './confirmationPlay.js';
import SaveToCollectionModal from './saveToCollectionModal.js';

export function createCardPreviewComponent(data) {
  const container = document.createElement("div");
  container.className = "card-preview";

  const viewsFormatted = data.views?.toLocaleString?.() || '0';
  const followersFormatted = data.followers?.toLocaleString?.() || '0';

  let questionsHTML = '';

  if (data.type === 'flashcard') {
    questionsHTML = (data.questions || []).map((q, index) => {
      let answerHTML = '';
      if (Array.isArray(q.answer)) {
        answerHTML = '<ul>' + q.answer.map(ans => `<li>${ans}</li>`).join('') + '</ul>';
      } else {
        answerHTML = `<p>${q.answer || ''}</p>`;
      }
      return `
        <article class="question-block">
          <h3 class="question-title">Question ${index + 1}</h3>
          <p class="question-text">${q.question || ''}</p>
          <div class="answer">${answerHTML}</div>
        </article>
      `;
    }).join('');
  } else {
    questionsHTML = (data.questions || []).map((q, index) => `
      <article class="question-block">
        <h3 class="question-title">Question ${index + 1}</h3>
        <p class="question-text">${q.question || ''}</p>
        <div class="answers">
          ${(q.answers || []).map((ans, idx) => `
            <div class="answer">
              <div class="option">${String.fromCharCode(65 + idx)}</div>
              <span>${ans}</span>
            </div>
          `).join('')}
        </div>
      </article>
    `).join('');
  }

  container.innerHTML = `
  <div class="card-inner">
    <!-- Header -->
    <header class="card-header">
      <div style="display: flex; align-items: center;">
        <img src="${data.avatarUrl || 'https://i.pravatar.cc/150?img=12'}" alt="Author" class="author-avatar" style="width: 64px; height: 64px; border-radius: 50%; margin-right: 12px;" />
        <div>
          <h2 style="margin: 0;">${data.title || 'Untitled'}</h2>
          <p style="margin: 4px 0;">${data.author || 'Unknown Author'} — ${followersFormatted} Followers</p>
        </div>
      </div>
      <div class="action-buttons">
        <button class="button save-button">Save</button>
        <button class="button play-button">Play</button>
      </div>
    </header>

    <!-- Description -->
    <section>
      <h3 style="margin-top: 0;">Description</h3>
      <p>${data.description || 'No description available.'}</p>
    </section>

    <!-- Question List -->
    <section class="card-questions-scroll">
      ${questionsHTML}
    </section>

    <!-- Footer Info -->
    <div class="card-preview-footer">
      <div><strong>Category:</strong> ${data.category || ''}</div>
      <div><strong>Views:</strong> ${viewsFormatted}</div>
      <div><strong>Total Q&amp;A:</strong> ${data.totalQuestions || 0}</div>
      <div><strong>Subjects:</strong> ${(data.subjects?.length > 0) ? data.subjects.join(', ') : 'N/A'}</div>
    </div>
  </div>
`;

  // Add event listener for Play button to show confirmation modal
  setTimeout(() => {
    const playButton = container.querySelector('.play-button');
    if (playButton) {
      playButton.addEventListener('click', () => {
        const confirmation = new ConfirmationPlay(
          document.body,
          { title: data.title || 'Untitled', author: data.author || 'Unknown Author' },
          () => {
            // Confirm callback: proceed with play action
            console.log('User confirmed to start learning:', data.title);
            // TODO: Add actual play logic here, e.g., navigate to flashcard session
          },
          () => {
            // Cancel callback: do nothing
            console.log('User cancelled learning:', data.title);
          }
        );
        confirmation.render();
      });
    }

    // Add event listener for Save button to show save to collection modal
    const saveButton = container.querySelector('.save-button');
    if (saveButton) {
      saveButton.addEventListener('click', () => {
        const collections = ["My Collection 1", "My Collection 2", "My Collection 3", "My Collection 4"];
        const saveModal = new SaveToCollectionModal(
          document.body,
          collections,
          (selectedCollections) => {
            console.log('User saved to collections:', selectedCollections);
            // TODO: Add actual save logic here
          },
          () => {
            console.log('User cancelled save to collection');
          }
        );
        saveModal.render();
      });
    }
  }, 0);

  return container;
}