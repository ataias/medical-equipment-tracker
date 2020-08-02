import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import PrivateRoute from '../../navigation/PrivateRoute';
import Home from '../../screens/Home';
import Login from '../../screens/Login';
import { ROOT_PATH, LOGIN_PATH } from '../routes';

const RootRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path={LOGIN_PATH}>
          <Login />
        </Route>
        <PrivateRoute path={ROOT_PATH}>
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
};

export default RootRouter;