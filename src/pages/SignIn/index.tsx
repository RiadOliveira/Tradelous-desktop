import React from 'react';
import { useSpring } from 'react-spring';
import { Container } from './styles';

const SignIn: React.FC = () => {
  const animatedProps = useSpring({
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
    config: {
      duration: 1000,
    },
    delay: 1000,
  });

  return <Container style={animatedProps}>SignIn page</Container>;
};

export default SignIn;
