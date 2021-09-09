import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import { SpringValue } from 'react-spring';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SideBar from '../../components/SideBar';
import api from '../../services/api';

import { Container, InputLine, CheckBoxInput } from './styles';

interface ScreenProps {
  resetFunction: () => void;
  animatedStyle: {
    [key: string]: SpringValue;
  };
}

interface SignUpData {
  name: string;
  email: string;
  cpf: string;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC<ScreenProps> = ({ resetFunction, animatedStyle }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignUpData) => {
    // await api.post('/user/sign-up', data);
  }, []);

  return (
    <Container style={animatedStyle}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <InputLine>
          <Input name="name" placeholder="Nome" />
          <Input name="email" placeholder="E-mail" />
        </InputLine>

        <InputLine>
          <Input name="password" placeholder="Senha" />
          <Input name="cpf" placeholder="Cpf" />
        </InputLine>

        <InputLine>
          <Input name="confirmPassword" placeholder="Confirmar senha" />
          <CheckBoxInput>
            <p>Dono da empresa?</p>
            <input type="checkbox" />
          </CheckBoxInput>
        </InputLine>
      </Form>

      <Button
        onClick={formRef.current?.submitForm}
        color="#1c274e"
        text="Confirmar"
        style={{ position: 'absolute', bottom: 80 }}
      />

      <SideBar side="right" actionFunction={resetFunction} />
    </Container>
  );
};

export default SignUp;
