import { routes } from './routes/routes.js';   
import App from './app.js';              
import './styles/main.css';

const app = new App();

const routeHandler = (route) => {
  console.log('Route changed to:', route);

  if (routes[route]) {
    console.log('Rendering presenter for route:', route);
    app.setPresenter(routes[route]);
    return;
  }

  const collectionDetailRegex = /^#\/collection\/(\d+)$/;
  const match = route.match(collectionDetailRegex);

  if (match) {
    const id = match[1];
    const Presenter = routes['#/collection/:id'];

    if (Presenter) {
      console.log(`Rendering DetailCollectionPresenter for ID: ${id}`);
      app.setPresenter(() => new Presenter(document.getElementById('app'), { id }));
      return;
    }
  }

  console.warn('No presenter found for route:', route);
};

window.addEventListener('hashchange', () => routeHandler(window.location.hash));
routeHandler(window.location.hash || '#/');
