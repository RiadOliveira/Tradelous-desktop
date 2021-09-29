import React, { useCallback, useRef } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import SideBar from 'components/SideBar';
import ErrorCatcher from 'errors/errorCatcher';
import * as yup from 'yup';

import { SpringValue } from 'react-spring';
import { FormHandles } from '@unform/core';
import { useAuth } from 'hooks/auth';
import { MdLock, MdMail } from 'react-icons/md';
import { useToast } from 'hooks/toast';
import { Container, FormContainer } from './styles';

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
  const { signIn } = useAuth();
  const { showToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignInData) => {
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

        await signIn(data);
      } catch (err) {
        const toastText = ErrorCatcher(
          err as Error | yup.ValidationError,
          formRef,
        );

        showToast({
          type: 'error',
          text: toastText,
        });
      }
    },
    [signIn, showToast],
  );

  return (
    <Container style={animatedStyle}>
      <FormContainer ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="E-mail"
          style={{ marginBottom: 80 }}
          Icon={MdMail}
        />
        <Input
          name="password"
          placeholder="Senha"
          onKeyPress={key =>
            key.code === 'Enter' && formRef.current?.submitForm()
          }
          Icon={MdLock}
        />
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
