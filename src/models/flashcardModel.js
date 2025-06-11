// flashcardModel.js
export default class FlashcardModel {
  constructor(numberOfCards) {
    this.cards = this.generateCards(numberOfCards);  // Generate flashcards sesuai jumlah yang diminta
    this.index = 0;  // Menyimpan indeks kartu yang sedang ditampilkan
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
}