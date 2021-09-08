import React from 'react';

import { useSpring } from 'react-spring';
import { Container } from './styles';

const SignUp: React.FC = () => {
  const animatedProps = useSpring({
    from: {
      opacity: 0,
      display: 'none',
    },
    to: {
      opacity: 1,
      display: 'block',
    },
    config: {
      duration: 1000,
    },
    delay: 1000,
  });

  return <Container style={animatedProps}>SignUp page</Container>;
};

export default SignUp;
