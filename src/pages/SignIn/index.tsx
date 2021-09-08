import React from 'react';
import { useSpring } from 'react-spring';
import Input from '../../components/Input';
import { Container } from './styles';

const SignIn: React.FC = () => {
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

  return (
    <Container style={animatedProps}>
      <Input placeholder="E-mail" />
      <Input placeholder="Senha" />
    </Container>
  );
};

export default SignIn;
