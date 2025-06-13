// flashcardModel.js
export default class FlashcardModel {
  constructor(sectionId) {
    this.sectionId = sectionId;
    this.cards = [];
    this.index = parseInt(localStorage.getItem('flashcardStartIndex') || '0');
  }

  // Fungsi untuk menghasilkan kartu flashcard
  generateCards(numberOfCards) {
    const generatedCards = [];
    for (let i = 0; i < numberOfCards; i++) {
      generatedCards.push({
        front: `Question ${i + 1}`,  // Contoh soal flashcard
        back: `Answer ${i + 1}`,  // Contoh jawaban flashcard
      });
    }
    return generatedCards;
  }

  // Mendapatkan kartu flashcard saat ini
  getCurrentCard() {
    return this.cards[this.index];
  }

  // Mendapatkan jumlah total flashcard
  getLength() {
    return this.cards.length;
  }

  // Mendapatkan informasi pagination (indeks saat ini dan total kartu)
  getPagination() {
    return {
      current: this.index,
      total: this.cards.length,
    };
  }

  // Menavigasi ke kartu berikutnya
  nextCard() {
    if (this.index < this.cards.length - 1) {
      this.index++;
    }
    return this.getCurrentCard();
  }

  // Menavigasi ke kartu sebelumnya
  prevCard() {
    if (this.index > 0) {
      this.index--;
    }
    return this.getCurrentCard();
  }

  // Reset ke kartu pertama
  reset() {
    this.currentIndex = 0;
  }

  async fetchCardsFromJson() {
    try {
      const collection = localStorage.getItem('flashcardCollectionId');
      const response = await fetch(`http://127.0.0.1:8000/flashcards/${collection}`);
      const data = await response.json();

      // Ambil semua flashcards dari semua section dan gabungkan
      const allFlashcards = data.flatMap(item => item.flashcards || []);

      // Transform ke bentuk yang bisa dipakai view
      this.cards = allFlashcards.map(fc => ({
        front: fc.question || 'No Question',
        back: fc.answer || 'No Answer',
        options: fc.options || [],
      }));

    } catch (error) {
      console.error('❌ Gagal mengambil flashcard:', error);
      this.cards = [];
    }
  }
}
