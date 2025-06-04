import { routes } from './routes/routes.js';   
import App from './app.js';              
import './styles/main.css';

const app = new App();

const routeHandler = (route) => {
  console.log('Route changed to:', route);
  const Presenter = routes[route];   

  if (Presenter) {
    console.log('Rendering presenter for route:', route);
    app.setPresenter(Presenter);   
  } else {
    console.warn('No presenter found for route:', route);
  }
};

window.addEventListener('hashchange', () => routeHandler(window.location.hash));

routeHandler(window.location.hash || '#/');
