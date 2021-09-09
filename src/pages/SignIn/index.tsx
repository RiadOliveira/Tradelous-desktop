import React, { useCallback, useRef } from 'react';
import { SpringValue } from 'react-spring';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { Container } from './styles';
import Button from '../../components/Button';
import Input from '../../components/Input';
import SideBar from '../../components/SideBar';
import api from '../../services/api';

interface ScreenProps {
  resetFunction: () => void;
  animatedStyle: {
    [key: string]: SpringValue;
  };
}

interface SignInData {
  email: string;
  password: string;
}

const SignIn: React.FC<ScreenProps> = ({ resetFunction, animatedStyle }) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: SignInData) => {
    console.log(data);
    // await api.post('/user/sessions', data);
  }, []);

  return (
    <Container style={animatedStyle}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" placeholder="E-mail" style={{ marginBottom: 80 }} />
        <Input name="password" placeholder="Senha" />
      </Form>

      <Button
        text="Entrar"
        onClick={formRef.current?.submitForm}
        color="#49B454"
        style={{ position: 'absolute', bottom: 80 }}
      />

      <SideBar side="left" actionFunction={resetFunction} />
    </Container>
  );
};

export default SignIn;
