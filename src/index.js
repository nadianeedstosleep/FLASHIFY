import { routes, dynamicRoutes } from './routes/routes.js';
import App from './app.js';
import './styles/main.css';

const app = new App();

const routeHandler = (route) => {
  console.log('Route changed to:', route);

  if (routes[route]) {
    console.log('Rendering static presenter for route:', route);
    app.setPresenter(routes[route]);
    return;
  }

  for (const dynamicRoute of dynamicRoutes) {
    const match = route.match(dynamicRoute.pattern);
    if (match) {
      const params = {};
      dynamicRoute.paramKeys.forEach((key, index) => {
        params[key] = match[index + 1];
      });

      const Presenter = dynamicRoute.presenter;
<<<<<<< HEAD

      console.log(`Rendering dynamic presenter with params:`, params);
      app.setPresenter(Presenter, params);
=======
      Presenter.routeParams = params;

      console.log(`Rendering dynamic presenter with params:`, params);
      app.setPresenter(Presenter);
>>>>>>> 73ca349d07d88c13da0f2591aa8fc2beeb399262
      return;
    }
  }

  console.warn('No presenter found for route:', route);
};

window.addEventListener('hashchange', () => routeHandler(window.location.hash));
routeHandler(window.location.hash || '#/');
