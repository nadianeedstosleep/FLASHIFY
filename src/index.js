import { routes } from './routes/routes.js';   
import App from './app.js';              
import './styles/main.css';
import './styles/flashcard.css';
import FlashcardPresenter from './presenters/flashcardPresenter.js'; 
import MultipleChoicePresenter from './presenters/multipleChoicePresenter.js';

const app = new App();

const routeHandler = (route) => {
  console.log('Route changed to:', route);
  const hash = window.location.hash;

  // Cek apakah hash adalah untuk flashcard dengan parameter
  if (hash.startsWith('#/flashcard')) {
    const numberOfCards = parseInt(hash.split('/')[2]); // Ambil parameter jumlah kartu
    if (!isNaN(numberOfCards)) {
      // Jika parameter valid, render FlashcardPresenter dengan jumlah kartu yang diminta
      app.setPresenter(new FlashcardPresenter(app.rootElement, numberOfCards));
      return;
    }
  }

  // Cek untuk halaman multiple choice dengan jumlah kartu
  if (hash.startsWith('#/multiple-choice')) {
    const numberOfCards = parseInt(hash.split('/')[2]);
    if (!isNaN(numberOfCards)) {
      app.setPresenter(new MultipleChoicePresenter(app.rootElement, numberOfCards));
      return;
    }
  }

  // Untuk route lainnya, cari Presenter yang sesuai
  const Presenter = routes[hash];
  if (Presenter) {
    console.log('Rendering presenter for route:', route);
    app.setPresenter(Presenter);
  } else {
    console.warn('No presenter found for route:', route);
  }
};

// Jalankan routeHandler pada saat hashchange atau saat halaman dimuat
window.addEventListener('hashchange', () => routeHandler(window.location.hash));
routeHandler(window.location.hash || '#/');