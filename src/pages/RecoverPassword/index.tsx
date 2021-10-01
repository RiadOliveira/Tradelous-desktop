import React, { useCallback, useRef } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import GoBackButton from 'components/GoBackButton';
import ErrorCatcher from 'errors/errorCatcher';
import * as yup from 'yup';

import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { useAuth } from 'hooks/auth';
import { MdLock, MdMail } from 'react-icons/md';
import { FaHashtag } from 'react-icons/fa';

import { useToast } from 'hooks/toast';
import { Container, Header, FormContainer, InputLine } from './styles';

interface SignInData {
  email: string;
  password: string;
}

const RecoverPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useHistory();
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
    <Container>
      <GoBackButton onClick={navigation.goBack} />

      <Header>Finalizar recuperação</Header>

      <FormContainer ref={formRef} onSubmit={handleSubmit}>
        <InputLine>
          <Input
            name="confirmEmail"
            placeholder="E-mail"
            Icon={MdMail}
            type="email"
          />

          <Input
            name="recoverToken"
            placeholder="Token de recuperação"
            Icon={FaHashtag}
          />
        </InputLine>

        <InputLine>
          <Input
            name="newPassword"
            placeholder="Nova senha"
            Icon={MdLock}
            type="password"
          />

          <Input
            name="confirmPassword"
            placeholder="Confirmar senha"
            type="password"
            onKeyPress={key =>
              key.code === 'Enter' && formRef.current?.submitForm()
            }
            Icon={MdLock}
          />
        </InputLine>
      </FormContainer>

      <Button
        text="Confirmar"
        onClick={() => formRef.current?.submitForm()}
        color="#49B454"
        style={{ position: 'absolute', bottom: 80 }}
      />
    </Container>
  );
};

export default RecoverPassword;
