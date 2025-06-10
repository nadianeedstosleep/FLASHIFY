import { createCommunityDetailCard } from "../components/communityDetailCard.js";

export default function generateCommunityDetailView(card) {
  const container = document.createElement("div");
  container.className = "community-detail";

  const detailCard = createCommunityDetailCard(card);
  container.appendChild(detailCard);

  return container;
}
