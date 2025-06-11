export function createCardPreviewComponent(data) {
  const container = document.createElement("div");
  container.className = "card-preview";

  const viewsFormatted = data.views?.toLocaleString?.() || '0';
  const followersFormatted = data.followers?.toLocaleString?.() || '0';

  const questionsHTML = (data.questions || []).map((q, index) => `
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
        <button class="button">Save</button>
        <button class="button">Play</button>
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


  return container;
}
