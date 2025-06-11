export default function CompletionPopup({ progress = 100, attempts = 1 }) {
  return `
    <div class="popup-overlay">
      <div class="popup-card">
        <h2>🎉 You've Completed It!</h2>
        <p>Progress: ${progress}%</p>
        <div class="progress-bar-container">
          <div class="progress-bar" style="width: ${progress}%"></div>
        </div>
        <p>Attempts: ${attempts}x</p>
        <textarea placeholder="Describe your experience..." class="popup-description"></textarea>
        <div class="popup-actions">
          <button id="re-attempt">Re-Attempt</button>
          <button id="popup-finish-btn">Finish</button> <!-- 👈 ganti ID -->
        </div>
      </div>
    </div>
  `;
}