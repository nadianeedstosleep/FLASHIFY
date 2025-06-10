export function createLabel({ text, isActive = false, onClick }) {
  const button = document.createElement('button');
  button.className = 'filter-label' + (isActive ? ' active' : '');
  button.textContent = text;

  if (typeof onClick === 'function') {
    button.addEventListener('click', () => onClick(text));
  }

  return button;
}

export function renderLabelGroup(containerId, categories, activeCategory, onCategorySelect) {
  const container = document.getElementById(containerId);
  container.innerHTML = ''; // reset

  categories.forEach(cat => {
    const label = createLabel({
      text: cat,
      isActive: cat === activeCategory,
      onClick: onCategorySelect
    });
    container.appendChild(label);
  });
}
