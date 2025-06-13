export default class CommunityModel {
  constructor() {
    this.cards = [];
  }

  async fetchCards() {
    try {
      const response = await fetch('http://localhost:5000/cards');
      if (!response.ok) {
        throw new Error('Failed to fetch cards');
      }
      this.cards = await response.json();
    } catch (error) {
      console.error('Error fetching cards:', error);
      this.cards = [];
    }
  }

  getCards() {
    return this.cards;
  }

  getCardById(id) {
    return this.cards.find(card => card.id === id);
  }
}