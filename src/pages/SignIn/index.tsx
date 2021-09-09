import React from 'react';
import { SpringValue } from 'react-spring';
import { Container } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SideBar from '../../components/SideBar';

interface ScreenProps {
  resetFunction: () => void;
  animatedStyle: {
    [key: string]: SpringValue;
  };
}

const SignIn: React.FC<ScreenProps> = ({ resetFunction, animatedStyle }) => {
  return (
    <Container style={animatedStyle}>
      <Input placeholder="E-mail" style={{ marginBottom: 80 }} />
      <Input placeholder="Senha" />

      <Button
        text="Entrar"
        color="#49B454"
        style={{ position: 'absolute', bottom: 80 }}
      />

      <SideBar side="left" actionFunction={resetFunction} />
    </Container>
  );
};

export default SignIn;
