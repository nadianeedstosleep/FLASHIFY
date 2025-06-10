import '../styles/communityStyle.css';
import '../styles/label.css';

export default function generateCommunityView() {
  return `
    <section id="flashcard-section" class="community-section">
      <div id="filterLabels" class="filter-labels"></div>
      <h2>Recommended for you</h2>
      <div id="communityCards" class="community-cards-container"></div>
      <div id="preview-container" class="preview-container"></div>
    </section>
  `;
}
