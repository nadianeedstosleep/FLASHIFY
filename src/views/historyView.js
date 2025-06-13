// src/views/historyView.js
import createHistoryCard from '../components/historyCard.js';
import Sidebar from '../components/sidebar.js';
import Header from '../components/header.js';
import '../styles/history.css';
import '../styles/collectionStyle.css'; 
import CompletionPopup from '../components/completionPopup.js';

const groupByDate = (histories) => {
  const grouped = {};
  histories.forEach((item) => {
    const dateKey = new Date(item.lastAccess).toDateString() === new Date().toDateString()
      ? 'Today'
      : new Date(item.lastAccess).toLocaleDateString('id-ID', {
          weekday: 'short', day: '2-digit', month: 'long', year: 'numeric'
        });
    if (!grouped[dateKey]) grouped[dateKey] = [];
    grouped[dateKey].push(item);
  });
  return grouped;
};

const HistoryView = {
  render(histories) {
    const grouped = groupByDate(histories);

    const searchAndTitle = `
      <section class="collection-title">Your Flashcard History</section>
      <p>Review your progress and continue where you left off.</p>

      <div class="collection-toolbar">
        <div class="search-wrapper">
                <input type="text" class="search-bar" placeholder="Search Collections" />
                <i class="fa-solid fa-magnifying-glass search-icon"></i>
              </div>

              <i class="fa-solid fa-filter filter-icon"></i>
      </div>
    `;

    const listContent = Object.entries(grouped).map(([date, items]) => `
      <section class="history-group">
        <h2>${date}</h2>
        <div class="history-list">
          ${items.map(createHistoryCard).join('')}
        </div>
      </section>
    `).join('');

    return `
      <div class="dashboard-container">
        ${Sidebar.render(true)}
        <div class="dashboard-main">
          ${Header.render()}
          <main class="history-page collection-page">
            ${searchAndTitle}
            ${listContent}
          </main>
        </div>
      </div>
    `;
  },

  afterRender() {
    Sidebar.afterRender();
    Header.afterRender();

    // Search bar
    const input = document.querySelector('.search-bar');
    input?.addEventListener('input', (e) => {
        const keyword = e.target.value.toLowerCase();
        document.querySelectorAll('.history-card').forEach(card => {
        const title = card.querySelector('h3')?.textContent.toLowerCase();
        card.style.display = title.includes(keyword) ? 'flex' : 'none';
        });
    });

    // Tambahkan handler popup ketika card diklik
    document.querySelectorAll('.history-card').forEach(card => {
    card.addEventListener('click', (e) => {
        // Cegah konflik dengan tombol hapus
        if (e.target.closest('.delete-btn')) return;

        const id = card.querySelector('.delete-btn')?.dataset.id;
        const title = card.querySelector('h3')?.textContent;
        const reviewed = parseInt(card.dataset.reviewed || 0);
        const total = parseInt(card.dataset.total || 1);
        const progress = Math.round((reviewed / total) * 100);

        const popup = document.createElement('div');
        popup.classList.add('popup-overlay');

        if (reviewed >= total) {
          popup.innerHTML = CompletionPopup({ progress: 100, attempts: 1 });
        } else {
          popup.innerHTML = `
            <div class="popup-box">
              <h2>Continue Your Learning</h2>
              <p><strong>${title}</strong></p>
              <p>Progress: ${progress}%</p>
              <div class="popup-actions">
                <button class="popup-continue" data-id="${id}">Continue</button>
                <button class="popup-cancel">Cancel</button>
              </div>
            </div>
          `;
        }

        document.body.appendChild(popup);

        // Tombol cancel (berlaku untuk semua popup)
        popup.querySelector('.popup-cancel')?.addEventListener('click', () => {
          popup.remove();
        });

        // Tombol finish (jika progress 100%)
        popup.querySelector('#popup-finish-btn')?.addEventListener('click', () => {
          popup.remove();
          window.location.hash = '#/history';
        });

        popup.querySelector('#re-attempt')?.addEventListener('click', () => {
          popup.remove();
          localStorage.setItem('flashcardCollectionId', id);  // ⬅️ SIMPAN ID yang benar
          localStorage.setItem('flashcardStartIndex', '0');   // ⬅️ Mulai ulang
          window.location.hash = `#/flashcard/${id}`;
        });

        popup.querySelector('.popup-continue')?.addEventListener('click', () => {
          popup.remove();
          localStorage.setItem('flashcardCollectionId', id);
          localStorage.setItem('flashcardStartIndex', reviewed.toString());  // ⬅️ lanjut dari progress terakhir
          window.location.hash = `#/flashcard/${id}`;
        });
    });
    });
    }
};

export default HistoryView;