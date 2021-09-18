import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import Landing from 'pages/Landing';
import RegisterCompany from 'pages/RegisterCompany';
import { useTransition, animated } from 'react-spring';

const Routes: React.FC = () => {
  const location = useLocation();

  const transition = useTransition(location, {
    from: { opacity: 0, width: '80vw', height: '80vh' },
    enter: {
      opacity: 1,
      width: '100vw',
      height: '100vh',
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
          </Switch>
        </animated.div>
      ))}
    </>
  );
};

export default Routes;
