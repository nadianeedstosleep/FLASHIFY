export default function FlashcardComponent({ categories = [] }) {
  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    return `hsl(${hash % 360}, 60%, 60%)`;
  }

  const categoriesHTML = categories.map(c => {
    const color = stringToColor(c);
    return `<span style="background-color: ${color};">${c}</span>`;
  }).join('');

  return `
    <div class="header">
      <button class="close-btn" aria-label="Close Flashcard Section">&times;</button>
      <h1>Flashcard</h1>
      <div class="subjects">
        <h4 class="subject-title">Subject</h4>
        ${categoriesHTML}
      </div>
    </div>

    <div class="flashcard-section">
      <div class="difficulty-buttons">
        <button class="easy">Easy</button>
        <button class="medium">Medium</button>
        <button class="hard">Hard</button>
        <button class="again">Again</button>
      </div>

      <div class="flashcard-container" id="flashcard-container"></div>

      <div class="flashcard-navigation">
        <button id="prev-btn">&lsaquo;</button>
        <div id="pagination"></div>
        <button id="next-btn">&rsaquo;</button>
      </div>
    </div>
  `;
}