import { FormHandles } from '@unform/core';
import React, { useCallback, useRef, useState } from 'react';
import { SpringValue } from 'react-spring';
import * as yup from 'yup';
import Button from '../../../components/Button';
import Input from '../../../components/Input';
import SideBar from '../../../components/SideBar';
import api from '../../../services/api';

import { Container, InputLine, CheckBoxInput, FormContainer } from './styles';

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
  isAdmin: boolean;
  password: string;
  confirmPassword: string;
}

const SignUp: React.FC<ScreenProps> = ({ resetFunction, animatedStyle }) => {
  const formRef = useRef<FormHandles>(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const handleSubmit = useCallback(
    async (data: SignUpData) => {
      try {
        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatório'),
          email: yup
            .string()
            .required('E-mail obrigatório')
            .email('Formato de e-mail incorreto'),
          password: yup
            .string()
            .required('Senha obrigatória')
            .min(6, 'Senha de no mínimo 6 caracteres'),
          confirmPassword: yup
            .string()
            .required('Confirmação de senha obrigatória')
            .oneOf([yup.ref('password')], 'As senhas inseridas não são iguais'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/user/sign-up', {
          ...data,
          isAdmin,
        });

        // if (switchValue) {
        //   navigation.navigate('RegisterCompany');
        // } else {
        //   Toast.show({
        //     type: 'success',
        //     text1: 'Cadastro realizado com sucesso!',
        //     text2: 'Entre em uma empresa para gerenciar seu estoque.',
        //   });
        // }

        // await signIn(data);
      } catch (err) {
        // ErrorCatcher(err as Error | yup.ValidationError, formRef); Will be made with toast.
      }
    },
    [isAdmin],
  );

  return (
    <Container style={animatedStyle}>
      <FormContainer ref={formRef} onSubmit={handleSubmit}>
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
            <input
              onChange={event => setIsAdmin(event.target.checked)}
              type="checkbox"
            />
          </CheckBoxInput>
        </InputLine>
      </FormContainer>

      <Button
        onClick={() => formRef.current?.submitForm()}
        color="#1c274e"
        text="Confirmar"
        style={{ position: 'absolute', bottom: 80 }}
      />

      <SideBar side="right" actionFunction={resetFunction} />
    </Container>
  );
};

export default SignUp;
