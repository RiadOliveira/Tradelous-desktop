import React from 'react';
import Landing from 'pages/Authentication/Landing';
import RegisterCompany from 'pages/Authentication/RegisterCompany';
import ForgotPassword from 'pages/Authentication/ForgotPassword';
import RecoverPassword from 'pages/Authentication/RecoverPassword';
import Dashboard from 'pages/Dashboard';

import { SalesContext } from 'hooks/sales';
import { Switch, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { ProductsContext } from 'hooks/products';

import Route from './Route';

const Routes: React.FC = () => {
  const location = useLocation();

  const transition = useTransition(location, {
    from: { opacity: 0 },
    enter: {
      opacity: 1,
      config: {
        duration: 600,
      },
    },
    leave: { opacity: 0, position: 'relative' },

    config: {
      duration: 1000,
    },
  });

  return (
    <>
      {transition((style, item) => (
        <animated.div style={{ ...style, position: 'absolute' }}>
          <Switch location={item}>
            <Route exact path="/" component={Landing} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/recover-password" component={RecoverPassword} />
            <Route
              isPrivate
              exact
              path="/register-company"
              component={RegisterCompany}
            />
            <ProductsContext>
              <SalesContext>
                <Route
                  exact
                  isPrivate
                  path="/dashboard"
                  component={Dashboard}
                />
              </SalesContext>
            </ProductsContext>
          </Switch>
        </animated.div>
      ))}
    </>
  );
};

export default Routes;
