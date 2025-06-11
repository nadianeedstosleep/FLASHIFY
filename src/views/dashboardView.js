import Sidebar from '../components/sidebar.js';
import Header from '../components/header.js';
import '../styles/dashboardStyle.css';

const DashboardView = {
  render({ collections, history }) {
    return `
      <div class="dashboard-container">
        ${Sidebar.render(true)}
        <div class="dashboard-main">
          ${Header.render()}
          <main class="flashcard-generator">
            <div class="dashboard-content-wrapper">
                <section class="text-center">
                <h1 class="flashcard-generator-title">Flashcard Generator</h1>
                <p class="subtitle">Easily upload or drag & drop your documents into the box to generate flashcards instantly. 
                Our tool will scan the content and turn it into study-ready flashcards—perfect for fast learning and revision.</p>
                <div class="generator-box">
                    <form id="pdf-upload-form" class="generator-upload" enctype="multipart/form-data">
                    <div id="uploadArea" class="upload-label">
                        <img src="/assets/icons/upload-icon.svg" alt="Upload Icon" class="upload-icon" />
                        <p style="font-weight: 600;">Send your pdf file here</p>
                        <p>Click or Drag & Drop</p>
                    </div>
                    <input type="file" id="pdfInput" accept="application/pdf" hidden />
                    <p id="upload-feedback" style="margin-top: 0.5rem; font-size: 0.875rem;"></p>
                    </form>
                    <button class="generate-button" id="generateBtn" disabled>Generate Flashcard</button>
                </div>
            </section>

            <section class="collections">
              <h2>Collections</h2>
              <div class="collections-cards">
                ${collections.map(c => `
                    <a href="#/collection/${c.id}" class="collection-item">
                    <image src="${c.image}" alt="${c.title}" class="collection-image" /></br>
                    ${c.title}<br/>
                    <small style="font-weight: 500; font-family: 'Hind', sans-serif;">${c.count} Flashcard</small>
                    </a>
                `).join('')}
                <a href="#/collection" class="collection-item text-center font-bold collection-show-all">
                  <img src="/assets/icons/add-icon.svg" alt="Add Collection" class="collection-image" />
                  </br>Show All
                </a>
              </div>
            </section>

            <section class="history">
              <h2>History</h2>
              <div class="history-list">
                ${history.map(h => `
                  <div class="history-item">
                    <div>${h.type}: ${h.title}</div>
                    <div style="font-family: 'Hind', sans-serif;">${h.time} - ${h.completion}% Completion
                      <button>Open Flashcard</button>
                    </div>
                  </div>
                `).join('')}
                <a href="#/history" style="text-decoration: none; font-weight: 500; text-align: right; color: inherit;">Show All History</a>
              </div>
            </section>

            <div id="generatorModal" class="modal hidden">
            <div class="modal-backdrop"></div>
            <div class="modal-content">
                <button id="closeModalBtn" class="modal-close">✕</button>

                <h2 class="modal-title">Set Your Flashcard!</h2>

                <!-- Question Type -->
                <div class="modal-group">
                <label class="modal-label">Question Type</label>
                <div class="radio-group">
                    <label class="radio-option">
                    <input type="radio" name="questionType" value="flashcard" checked />
                    <span class="custom-radio"></span> Flash Card
                    </label>
                    <label class="radio-option">
                    <input type="radio" name="questionType" value="multiple-choice" />
                    <span class="custom-radio"></span> Multiple Choice
                    </label>
                </div>
                </div>

                <!-- Question Limit -->
                <div class="modal-group">
                <label class="modal-label" for="questionLimit">Total Questions</label>
                <input type="number" id="questionLimit" min="1" max="100" value="10" />
                </div>

                <!-- Categories -->
                <div class="modal-group">
                <label class="modal-label" for="categoryInput">Category</label>
                <div class="category-input-wrapper">
                    <input type="text" id="categoryInput" placeholder="e.g. Chemistry" />
                    <button type="button" id="addCategoryBtn" class="add-btn">＋</button>
                </div>
                <div class="tag-container" id="categoryTags"></div>
                </div>

                <!-- Action -->
                <div class="modal-actions">
                <button id="submitSettingBtn" class="generate-button">Generate</button>
                </div>
            </div>
            </div>

          </main>
        </div>
      </div>
    `;
  },

  afterRender() {
    Sidebar.afterRender();
    Header.afterRender();

    const input = document.getElementById('pdfInput');
    const feedback = document.getElementById('upload-feedback');
    const generateBtn = document.getElementById('generateBtn');
    const dropZone = document.getElementById('uploadArea');

    const modal = document.getElementById('generatorModal');
    const closeBtn = document.getElementById('closeModalBtn');
    const backdrop = modal.querySelector('.modal-backdrop');
    const submitBtn = document.getElementById('submitSettingBtn');
    const categoryInput = document.getElementById('categoryInput');
    const addCategoryBtn = document.getElementById('addCategoryBtn');
    const tagContainer = document.getElementById('categoryTags');

    const tags = [];

    function handleFile(file) {
        if (!file || file.type !== 'application/pdf') {
        feedback.textContent = 'Only PDF files are allowed.';
        feedback.style.color = 'red';
        input.value = '';
        generateBtn.disabled = true;
        return;
        }

        feedback.textContent = `Selected: ${file.name}`;
        feedback.style.color = '#48388E';
        generateBtn.disabled = false;

        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        input.files = dataTransfer.files;
    }

    dropZone.addEventListener('click', () => {
    input.click();
    });

    input.addEventListener('change', () => {
        handleFile(input.files[0]);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = 'rgba(255,255,255,0.1)';
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = '';
        });
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });

    generateBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    backdrop.addEventListener('click', () => {
        modal.classList.add('hidden');
    });

    addCategoryBtn.addEventListener('click', () => {
        const val = categoryInput.value.trim();
        if (val && !tags.includes(val)) {
        tags.push(val);
        const span = document.createElement('span');
        span.className = 'tag';
        span.textContent = val;

        const removeBtn = document.createElement('span');
        removeBtn.className = 'remove';
        removeBtn.innerHTML = '&times;';
        removeBtn.addEventListener('click', () => {
        tagContainer.removeChild(span);
        const index = tags.indexOf(val);
        if (index !== -1) tags.splice(index, 1);
        });

        span.appendChild(removeBtn);

        tagContainer.appendChild(span);
        categoryInput.value = '';
        }
    });

    submitBtn.addEventListener('click', () => {
        const type = document.querySelector('input[name="questionType"]:checked')?.value || '';
        const total = parseInt(document.getElementById('questionLimit').value);
        console.log({ type, total, tags });
        modal.classList.add('hidden');
    });

    const typeSelect = document.querySelector('input[name="questionType"]');
    const limitInput = document.getElementById('questionLimit');

    [typeSelect, limitInput].forEach(el => {
        el?.addEventListener('change', () => {
        const limit = parseInt(limitInput.value);
        submitBtn.disabled = !(limit >= 1);
        });
    });
    }
};

export default DashboardView;
