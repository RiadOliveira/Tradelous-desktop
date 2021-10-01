import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import * as yup from 'yup';
import Button from 'components/Button';
import Input from 'components/Input';
import api from 'services/api';
import ErrorCatcher from 'errors/errorCatcher';

import { MdEmail } from 'react-icons/md';
import { useToast } from 'hooks/toast';
import { Container, Header, FormContainer } from './styles';

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { showToast } = useToast();

  const handleSubmit = useCallback(
    async (data: { email: string }) => {
      try {
        const schema = yup.object().shape({
          email: yup
            .string()
            .required('E-mail obrigatório')
            .email('Formato de e-mail incorreto'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/user/forgot-password', data);

        showToast({
          type: 'info',
          text: {
            main: 'Mensagem de recuperação enviada',
            sub: 'O e-mail com o token de recuperação foi enviado.',
          },
        });
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
    [showToast],
  );

  return (
    <Container>
      <Header>Recuperar senha</Header>

      <FormContainer ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="E-mail de recuperação"
          Icon={MdEmail}
        />
      </FormContainer>

      <Button
        onClick={() => formRef.current?.submitForm()}
        color="#1c274e"
        text="Enviar"
        style={{ position: 'absolute', bottom: 80 }}
      />
    </Container>
  );
};

export default ForgotPassword;
