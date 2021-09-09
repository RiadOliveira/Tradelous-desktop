import React from 'react';
import { SpringValue } from 'react-spring';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SideBar from '../../components/SideBar';

import { Container, InputLine, CheckBoxInput } from './styles';

interface ScreenProps {
  resetFunction: () => void;
  animatedStyle: {
    [key: string]: SpringValue;
  };
}

const SignUp: React.FC<ScreenProps> = ({ resetFunction, animatedStyle }) => {
  return (
    <Container style={animatedStyle}>
      <InputLine>
        <Input placeholder="Nome" />
        <Input placeholder="E-mail" />
      </InputLine>

      <InputLine>
        <Input placeholder="Senha" />
        <Input placeholder="Cpf" />
      </InputLine>

      <InputLine>
        <Input placeholder="Confirmar senha" />
        <CheckBoxInput>
          <p>Dono da empresa?</p>
          <input type="checkbox" />
        </CheckBoxInput>
      </InputLine>

      <Button
        color="#1c274e"
        text="Confirmar"
        style={{ position: 'absolute', bottom: 80 }}
      />

      <SideBar side="right" actionFunction={resetFunction} />
    </Container>
  );
};

export default SignUp;
