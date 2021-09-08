import React from 'react';

import { useSpring } from 'react-spring';
import { Container } from './styles';

const SignUp: React.FC = () => {
  const animatedProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 800,
    },
    delay: 800,
  });

  return <Container style={animatedProps}>SignUp page</Container>;
};

export default SignUp;
