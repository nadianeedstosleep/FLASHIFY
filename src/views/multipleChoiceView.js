import CompletionPopup from "../components/completionPopup.js";

const MultipleChoiceView = {
  render({ questions, categories }) {
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

    const questionsHTML = questions.map((q, i) => {

      const options = [
        { text: correctAnswer, isCorrect: true },
        { text: 'Option B', isCorrect: false },
        { text: 'Option C', isCorrect: false },
        { text: 'Option D', isCorrect: false }
      ];

      // Acak urutan jawaban
      const correctAnswer = q.back.trim().toLowerCase();

      // Gabungkan dan hapus duplikat
      const uniqueOptions = Array.from(new Set([...q.options, q.back]));

      const shuffledOptions = uniqueOptions.map(opt => ({
        text: opt,
        isCorrect: opt.trim().toLowerCase() === correctAnswer,
      })).sort(() => Math.random() - 0.5);

      // Label A-D
      const optionLabels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

      const optionsHTML = shuffledOptions.map((opt, idx) => `
        <li class="mc-option ${opt.isCorrect ? 'correct-answer' : ''}">
          <strong>${optionLabels[idx]}.</strong> ${opt.text}
        </li>
      `).join('');


      return `
        <div class="mc-card">
          <p class="mc-question"><strong>Question ${i + 1}:</strong> ${q.front}</p>
          <ul class="mc-options">${optionsHTML}</ul>
        </div>
      `;
    }).join('');

    return `
      <div class="header">
        <button class="close-btn" aria-label="Close Flashcard Section">&times;</button>
        <h1>Flashcard</h1>
        <div class="subjects">
          <h4 class="subject-title">Subjects</h4>
          ${categoriesHTML}
        </div>
      </div>

      <div class="flashcard-section" style="padding-bottom: 4rem;">
        <div style="margin-bottom: 1rem;">
          <button id="toggle-answer-btn" class="toggle-answer-btn">
            Sembunyikan Jawaban Benar
          </button>
        </div>
        ${questionsHTML}

        <div style="text-align: center; margin-top: 2rem;">
          <button id="finish-btn" class="toggle-answer-btn">Selesai</button>
        </div>
      </div>
    `;
  },

  afterRender({ onFinish }) {
    document.querySelectorAll('.correct-answer').forEach(el => {
      el.classList.add('highlight-correct');
    });

    const closeBtn = document.querySelector('.close-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        document.body.classList.remove('multiple-choice-page');
        window.location.hash = '#/dashboard';
      });
    }

    const toggleBtn = document.getElementById('toggle-answer-btn');
    let isHidden = false;

    toggleBtn?.addEventListener('click', () => {
      isHidden = !isHidden;
      document.querySelectorAll('.correct-answer').forEach(el => {
        el.classList.toggle('highlight-correct', !isHidden);
      });

      toggleBtn.textContent = isHidden
        ? 'Tampilkan Jawaban Benar'
        : 'Sembunyikan Jawaban Benar';
    });

    const finishBtn = document.getElementById('finish-btn');
    finishBtn?.addEventListener('click', () => {
      onFinish(); // ⬅️ panggil presenter untuk handle popup
    });
  }
};

export default MultipleChoiceView;