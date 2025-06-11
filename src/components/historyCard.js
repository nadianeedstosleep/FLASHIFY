const createHistoryCard = (history) => {
  const progress = Math.round((history.reviewed / history.total) * 100);
  const isCompleted = progress === 100;

  return `
    <div 
      class="history-card" 
      data-id="${history.id}" 
      data-reviewed="${history.reviewed}" 
      data-total="${history.total}"
    >
      <div class="history-card-left">
        <div class="history-card-icon">
          <img src="/assets/icons/file-history.png" alt="Flashcard Icon" width="55" height="55" />
        </div>
        <div class="history-card-details">
          <h3>${history.title}</h3>
          <p>Last Access: ${new Date(history.lastAccess).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
      </div>
      <div class="history-progress">${isCompleted ? 'Completed' : `${progress}% Completed`}</div>
      <button class="delete-btn" data-id="${history.id}" aria-label="Delete history">
        <img src="/assets/icons/delete.png" alt="Delete" width="32" height="32" />
      </button>
    </div>
  `;
};

export default createHistoryCard;
