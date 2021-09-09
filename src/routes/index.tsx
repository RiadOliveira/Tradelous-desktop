import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import RegisterCompany from '../pages/RegisterCompany';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register-company" component={RegisterCompany} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
