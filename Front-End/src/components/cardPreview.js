export function createCardPreviewComponent(data) {
  const container = document.createElement("div");
  container.className = "card-preview-container";

  container.innerHTML = `
    <section class="card-preview">
      <header class="card-header">
        <h2>${data.title}</h2>
        <p><strong>Category:</strong> ${data.category}</p>
        <p><strong>Author:</strong> ${data.author}</p>
        <p><strong>Views:</strong> ${data.views.toLocaleString()}</p>
        <p><strong>Q&amp;A Count:</strong> ${data.totalQuestions}</p>
        <div class="action-buttons">
          <button id="save-btn">💾 Save</button>
          <button id="play-btn">▶️ Play</button>
        </div>
      </header>
      <section class="card-questions-scroll">
        ${data.questions
          .map(
            (q, index) => `
          <article class="question-block">
            <h3 class="question-title">Question ${index + 1}</h3>
            <p class="question-text">${q.question}</p>
            <div class="answers">
              ${q.answers
                .map(
                  (ans, i) => `
                <div class="answer">
                  <span class="option-circle"></span>
                  <span>${ans}</span>
                </div>
              `
                )
                .join("")}
            </div>
          </article>
        `
          )
          .join("")}
      </section>
    </section>
  `;

  return container;
}
