import React from 'react';
import Landing from 'pages/Landing';
import RegisterCompany from 'pages/RegisterCompany';
import ForgotPassword from 'pages/ForgotPassword';
import RecoverPassword from 'pages/RecoverPassword';

import { Switch, Route, useLocation } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';

const Routes: React.FC = () => {
  const location = useLocation();

  const transition = useTransition(location, {
    from: { opacity: 0 },
    enter: {
      opacity: 1,
      config: {
        duration: 400,
      },
    },
    leave: { opacity: 0, position: 'relative' },

    config: {
      duration: 800,
    },
  });

  return (
    <>
      {transition((style, item) => (
        <animated.div style={{ ...style, position: 'absolute' }}>
          <Switch location={item}>
            <Route exact path="/" component={Landing} />
            <Route exact path="/register-company" component={RegisterCompany} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/recover-password" component={RecoverPassword} />
          </Switch>
        </animated.div>
      ))}
    </>
  );
};

export default Routes;
