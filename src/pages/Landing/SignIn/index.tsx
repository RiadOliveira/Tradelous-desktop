import React, { useCallback, useRef } from 'react';
import { SpringValue } from 'react-spring';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import { Container, FormContainer } from './styles';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import SideBar from '../../../components/SideBar';
import api from '../../../services/api';

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
    try {
      const schema = yup.object().shape({
        email: yup
          .string()
          .required('E-mail obrigatório')
          .email('Formato de e-mail incorreto'),
        password: yup
          .string()
          .required('Senha obrigatória')
          .min(6, 'Senha de no mínimo 6 caracteres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post('/user/sessions', data);
    } catch (err) {
      // ErrorCatcher(err as Error | yup.ValidationError, formRef); Will be made with toasts.
    }
  }, []);

  return (
    <Container style={animatedStyle}>
      <FormContainer ref={formRef} onSubmit={handleSubmit}>
        <Input name="email" placeholder="E-mail" style={{ marginBottom: 80 }} />
        <Input name="password" placeholder="Senha" />
      </FormContainer>

      <Button
        text="Entrar"
        onClick={() => formRef.current?.submitForm()}
        color="#49B454"
        style={{ position: 'absolute', bottom: 80 }}
      />

      <SideBar side="left" actionFunction={resetFunction} />
    </Container>
  );
};

export default SignIn;
