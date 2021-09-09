import React from 'react';
import { useSpring } from 'react-spring';
import Button from '../../components/Button';
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
      display: 'flex',
    },
    config: {
      duration: 1000,
    },
    delay: 1000,
  });

  return (
    <Container style={animatedProps}>
      <Input placeholder="E-mail" style={{ marginBottom: 80 }} />
      <Input placeholder="Senha" />

      <Button
        text="Entrar"
        color="#49B454"
        style={{ position: 'absolute', bottom: 80 }}
      />
    </Container>
  );
};

export default SignIn;
