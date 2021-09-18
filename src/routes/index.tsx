import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Landing from 'pages/Landing';
import RegisterCompany from 'pages/RegisterCompany';

const Routes: React.FC = () => {
  const { pathname } = useLocation();

  return (
    <Switch>
      <Route exact path="/" component={Landing} />
      <Route exact path="/register-company" component={RegisterCompany} />
    </Switch>
  );
};

export default Routes;
