import React, { Suspense, lazy } from 'react';
import { Route, NavLink, Switch } from 'react-router-dom';
import routes from './routes';
import './App.css';
import './fonts.css';


const Landing = lazy(() =>
  import(
    './pages/Landing/Landing.js' /*webpackChunkName: "landing-page"*/
  ),
);
const LandingReg = lazy(() =>
  import(
    './pages/Landing/LandingReg.js'
  ),
);
const CardPage = lazy(() =>
  import(
    './pages/CardPage.js' /*webpackChunkName: "card-page"*/
  ),
);
const NotFoundPage = lazy(() =>
  import(
    './pages/NotFound.js' /*webpackChunkName: "notFound-page"*/
  ),
);

const App = () => (
  <>


    <Suspense fallback={<h1>Loader...</h1>}>
      <Switch>
        <Route
          exact
          path={routes.landing}
          component={Landing}
        />
        <Route
          path={routes.landingReg}
          component={LandingReg}
        />
        <Route path={routes.card} component={CardPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Suspense>
  </>
);


export default App;
