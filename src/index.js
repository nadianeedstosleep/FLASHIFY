import { routes, dynamicRoutes } from './routes/routes.js';
import App from './app.js';
import './styles/main.css';
import './styles/flashcard.css'; // if used globally
import FlashcardPresenter from './presenters/flashcardPresenter.js';
import MultipleChoicePresenter from './presenters/multipleChoicePresenter.js';

const app = new App();

const routeHandler = (route) => {
  console.log('Route changed to:', route);

  const hash = window.location.hash;

  // === Hardcoded routes for Flashcard & MultipleChoice ===
  if (hash.startsWith('#/flashcard')) {
    const numberOfCards = parseInt(hash.split('/')[2]);
    if (!isNaN(numberOfCards)) {
      app.setPresenter(new FlashcardPresenter(app.rootElement, numberOfCards));
      return;
    }
  }

  if (hash.startsWith('#/multiple-choice')) {
    const numberOfCards = parseInt(hash.split('/')[2]);
    if (!isNaN(numberOfCards)) {
      app.setPresenter(new MultipleChoicePresenter(app.rootElement, numberOfCards));
      return;
    }
  }

  // === Static routes ===
  if (routes[route]) {
    console.log('Rendering static presenter for route:', route);
    app.setPresenter(routes[route]);
    return;
  }

  // === Dynamic routes ===
  for (const dynamicRoute of dynamicRoutes) {
    const match = route.match(dynamicRoute.pattern);
    if (match) {
      const params = {};
      dynamicRoute.paramKeys.forEach((key, index) => {
        params[key] = match[index + 1];
      });

      const Presenter = dynamicRoute.presenter;
      Presenter.routeParams = params;

      console.log(`Rendering dynamic presenter with params:`, params);
      app.setPresenter(Presenter);
      return;
    }
  }

  console.warn('No presenter found for route:', route);
};

window.addEventListener('hashchange', () => routeHandler(window.location.hash));
routeHandler(window.location.hash || '#/');
