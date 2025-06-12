import { createCardPreviewComponent } from '../components/cardPreview.js';

/**
 * Fetches card data for an array of card IDs, creates card preview components,
 * and appends them to the specified container element.
 * @param {Array<number>} cardIds - Array of card IDs to fetch.
 * @param {HTMLElement} container - DOM element to append card previews to.
 */
export async function fetchAndRenderCards(cardIds, container) {
  container.innerHTML = ''; // Clear existing content
  for (const id of cardIds) {
    try {
      const response = await fetch(`http://localhost:5000/cards/${id}`);
      if (!response.ok) {
        console.error(`Failed to fetch card data for id ${id}`);
        continue;
      }
      const cardData = await response.json();
      const cardPreview = createCardPreviewComponent(cardData);
      container.appendChild(cardPreview);
    } catch (error) {
      console.error(`Error fetching card data for id ${id}:`, error);
    }
  }
}