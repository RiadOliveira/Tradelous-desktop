import React, { useCallback, useRef } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import GoBackButton from 'components/GoBackButton';
import ErrorCatcher from 'errors/errorCatcher';
import api from 'services/api';
import * as yup from 'yup';

import { FormHandles } from '@unform/core';
import { MdEmail } from 'react-icons/md';
import { useToast } from 'hooks/toast';
import { useHistory } from 'react-router-dom';
import { Container, Header, FormContainer, HasTokenButton } from './styles';

const ForgotPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useHistory();
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
          type: 'success',
          text: {
            main: 'Token de recuperação enviado',
            sub: 'Você pode visualizá-lo em seu e-mail.',
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
      <GoBackButton onClick={() => navigation.push('/', 'SignIn')} />

      <Header>Recuperar senha</Header>

      <FormContainer ref={formRef} onSubmit={handleSubmit}>
        <Input
          name="email"
          placeholder="E-mail de recuperação"
          Icon={MdEmail}
        />

        <HasTokenButton
          type="button"
          onClick={() => navigation.push('/recover-password')}
        >
          Já possui um token?
        </HasTokenButton>
      </FormContainer>

      <Button
        onClick={() => formRef.current?.submitForm()}
        color="#49B454"
        text="Enviar"
        style={{ position: 'absolute', bottom: 80 }}
      />
    </Container>
  );
};

export default ForgotPassword;
