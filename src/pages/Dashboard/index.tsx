import React from 'react';
import { Switch, useLocation, Route } from 'react-router-dom';
import { useTransition, animated } from 'react-spring';
import { Container } from './styles';

import Company from './Company';
import Products from './Products';
import Profile from './Profile';
import Sales from './Sales';

const Dashboard: React.FC = () => {
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
    <Container>
      {transition((style, item) => (
        <animated.div style={{ ...style, position: 'absolute' }}>
          <Switch location={item}>
            <Route exact path="/dashboard/profile" component={Profile} />
            <Route exact path="/dashboard/company" component={Company} />
            <Route exact path="/dashboard/products" component={Products} />
            <Route exact path="/dashboard/sales" component={Sales} />
          </Switch>
        </animated.div>
      ))}
    </Container>
  );
};

export default Dashboard;
