export function createCard({ id, title, category, author, views, qaCount }) {
  const card = document.createElement('div');
  card.className = 'card';
  card.style.cursor = 'pointer';

  card.innerHTML = `
    <div class="card-top">
      <span class="qa-count">Flash card &bull; ${qaCount} QA</span>
    </div>
    <div class="card-body">
      <h2 class="title">${title}</h2>
      <span class="category">${category}</span>
    </div>
    <div class="card-footer">
      <span class="author-badge">${author}</span>
      <span class="views">${views.toLocaleString('de-DE')} views</span>
    </div>
  `;

  card.addEventListener('click', () => {
    window.location.hash = `#/community/${id}`;
  });

  return card;
}