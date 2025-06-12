import { createCardPreviewComponent } from "./cardPreview.js";

export function createCommunityDetailCard(data) {
  const container = document.createElement("div");
  container.className = "community-detail-card-container";

  // Create user info header
  const header = document.createElement("header");
  header.className = "community-header";
  header.innerHTML = `
    <div class="user-info">
      <img src="https://i.pravatar.cc/150?img=12" alt="User Avatar" class="user-avatar" />
      <div class="user-details">
        <h2 class="user-name">${data.author}</h2>
        <p class="user-followers">${data.followers ? data.followers.toLocaleString() : '0'} Followers</p>
      </div>
      <button class="btn-follow">Followed</button>
    </div>
  `;

  // Create card preview using existing component
  const cardPreview = createCardPreviewComponent(data);

  // Create description section
  const descriptionSection = document.createElement("section");
  descriptionSection.className = "card-description";
  descriptionSection.textContent = data.description || "";

  // Create subjects/tags section
  const subjectsSection = document.createElement("section");
  subjectsSection.className = "card-subjects";
  if (data.subjects && Array.isArray(data.subjects)) {
    data.subjects.forEach(subject => {
      const subjectLabel = document.createElement("span");
      subjectLabel.className = "subject-label";
      subjectLabel.textContent = subject;
      subjectsSection.appendChild(subjectLabel);
    });
  }

  container.appendChild(header);
  container.appendChild(cardPreview);
  container.appendChild(descriptionSection);
  container.appendChild(subjectsSection);

  return container;
}