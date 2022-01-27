import React, { useCallback, useEffect, useRef, useState } from 'react';
import Button from 'components/Button';
import Input from 'components/Input';
import GoBackButton from 'components/GoBackButton';
import ErrorCatcher from 'errors/errorCatcher';
import api from 'services/api';
import * as yup from 'yup';

import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { MdLock, MdMail } from 'react-icons/md';
import { FaHashtag } from 'react-icons/fa';
import { useToast } from 'hooks/toast';
import { Container, Header, FormContainer, InputLine } from './styles';

interface IRecoverPassword {
  recoverToken: string;
  confirmEmail: string;
  newPassword: string;
  confirmPassword: string;
}

const RecoverPassword: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useHistory();
  const { showToast } = useToast();

  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const response = localStorage.getItem('@Tradelous-user');

    if (response) setUserEmail(response);
    else {
      navigation.goBack();

      showToast({
        type: 'error',
        text: {
          main: 'Token necessário',
          sub: 'Primeiro faça a requisição do token',
        },
        isOfAuth: true,
      });
    }
  }, [navigation, showToast]);

  const handleSubmit = useCallback(
    async (recoverData: IRecoverPassword) => {
      try {
        const schema = yup.object().shape({
          recoverToken: yup.string().required('Token obrigatório'),
          confirmEmail: yup
            .string()
            .required('E-mail obrigatório')
            .email('Formato de e-mail incorreto'),
          newPassword: yup
            .string()
            .required('Senha obrigatória')
            .min(6, 'Senha de no mínimo 6 caracteres'),
          confirmPassword: yup
            .string()
            .required('Confirmação de senha obrigatória')
            .oneOf([yup.ref('password')], 'As senhas inseridas não são iguais'),
        });

        await schema.validate(recoverData, {
          abortEarly: false,
        });

        await api.post('/user/recover-password', recoverData);

        localStorage.removeItem('@Tradelous-user');

        showToast({
          type: 'success',
          text: {
            main: 'Senha atualizada com sucesso',
            sub: 'Agora faça login com sua nova senha',
          },
          isOfAuth: true,
        });

        navigation.push('/', 'SignIn');
      } catch (err) {
        const toastText = ErrorCatcher(
          err as Error | yup.ValidationError,
          formRef,
        );

        showToast({
          type: 'error',
          text: toastText,
          isOfAuth: true,
        });
      }
    },
    [showToast, navigation],
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
            value={userEmail}
            disabled
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
