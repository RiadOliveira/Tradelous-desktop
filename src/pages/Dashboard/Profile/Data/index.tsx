import React, { ChangeEvent, useCallback, useRef } from 'react';
import api from 'services/api';
import DashboardInput from 'components/Input/DashboardInput';
import ErrorCatcher from 'errors/errorCatcher';
import * as yup from 'yup';

import { useAuth } from 'hooks/auth';
import {
  MdInsertPhoto,
  MdLock,
  MdMail,
  MdModeEdit,
  MdPerson,
} from 'react-icons/md';
import { FormHandles } from '@unform/core';
import { useToast } from 'hooks/toast';
import { useModal } from 'hooks/modal';
import TopOptions from 'components/TopOptions';
import {
  Container,
  UserIcon,
  EditIcon,
  UserAvatar,
  Form,
  InputLine,
} from './styles';

interface IUpdateProfileData {
  name: string;
  email: string;
  oldPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

const ProfileData: React.FC = () => {
  const { user, updateUser, updateUsersAvatar, signOut } = useAuth();
  const { showModal } = useModal();
  const { showToast } = useToast();

  const formRef = useRef<FormHandles>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  const handleUpdateAvatar = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      try {
        if (event.target.files) {
          const [avatar] = event.target.files;
          updateUsersAvatar(avatar);
        }
      } catch {
        showToast({
          type: 'error',
          text: {
            main: 'Problema inesperado',
            sub: 'Ocorreu um erro ao atualizar o avatar',
          },
        });
      }
    },
    [updateUsersAvatar, showToast],
  );

  const handleDeleteAvatar = useCallback(async () => {
    if (!user.avatar) {
      showToast({
        text: {
          main: 'Erro na exclusão',
          sub: 'Você não possui nenhum avatar',
        },
        type: 'error',
      });

      return;
    }
    try {
      updateUsersAvatar(undefined);

      showToast({
        text: {
          main: 'Exclusão concluída',
          sub: 'Avatar excluído com sucesso',
        },
        type: 'success',
      });
    } catch {
      showToast({
        type: 'error',
        text: {
          main: 'Problema inesperado',
          sub: 'Ocorreu um erro ao excluir o avatar',
        },
      });
    }
  }, [user.avatar, showToast, updateUsersAvatar]);

  const handleEditIcon = useCallback(() => {
    showModal({
      text: 'O que deseja fazer com seu avatar?',
      buttonsProps: {
        first: {
          text: 'Atualizar',
          color: '#49b454',
          actionFunction: () => imageInputRef.current?.click(),
        },
        second: {
          text: 'Deletar',
          color: '#db3b3b',
          actionFunction: handleDeleteAvatar,
        },
      },
      type: 'ordinary',
    });
  }, [showModal, handleDeleteAvatar]);

  const handleDeleteAccount = useCallback(
    async (verifyPassword: string) => {
      try {
        await api.post('/user/sessions', {
          email: user.email,
          password: verifyPassword,
        }); // In order to verify user's password to delete account.

        await api.delete('/user/');

        showToast({
          type: 'success',
          text: {
            main: 'Exclusão bem sucedida',
            sub: 'Conta excluída com sucesso',
          },
        });

        signOut();
      } catch {
        showToast({
          type: 'error',
          text: {
            main: 'Problema inesperado',
            sub: 'Ocorreu um erro ao excluir sua conta',
          },
        });
      }
    },
    [user.email, showToast, signOut],
  );

  const handleCopyId = useCallback(() => {
    navigator.clipboard.writeText(user.id);

    showToast({
      type: 'success',
      text: {
        main: 'Cópia efetuada com sucesso',
        sub: 'ID copiado para área de transferência',
      },
    });
  }, [showToast, user.id]);

  const handleSubmit = useCallback(
    async (userData: IUpdateProfileData) => {
      try {
        const schema = yup.object().shape({
          name: yup.string().required('Nome obrigatório'),
          email: yup
            .string()
            .required('E-mail obrigatório')
            .email('Formato de e-mail incorreto'),
          oldPassword: yup.string().optional(),
          newPassword: yup.string().optional(),
          confirmPassword: yup.string().when('newPassword', {
            is: (value: string) => !!value,
            then: yup
              .string()
              .required('Confirmação de senha obrigatória')
              .oneOf(
                [yup.ref('newPassword'), null],
                'As senhas precisam ser iguais',
              )
              .min(6, 'Senha de, no mínimo, 6 caracteres'),
            otherwise: yup.string().optional(),
          }),
        });

        await schema.validate(userData, {
          abortEarly: false,
        });

        await updateUser(userData);

        if (userData.newPassword) {
          formRef.current?.clearField('oldPassword');
          formRef.current?.clearField('newPassword');
          formRef.current?.clearField('confirmPassword');
        }

        showToast({
          type: 'success',
          text: {
            main: 'Atualização concluída',
            sub: 'Perfil atualizado com sucesso',
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
    [updateUser, showToast],
  );

  return (
    <Container>
      <TopOptions buttonsQuantity={3}>
        <button type="button" onClick={handleCopyId}>
          Copiar ID
        </button>

        <button type="button" onClick={() => formRef.current?.submitForm()}>
          Atualizar Dados
        </button>

        <button
          type="button"
          onClick={() => {
            showModal({
              text: 'Para confirmar a exclusão, insira sua senha:',
              buttonsProps: {
                first: {
                  text: 'Excluir',
                  color: '#db3b3b',
                  actionFunction: verifyPassword =>
                    handleDeleteAccount(verifyPassword || ''),
                },
              },
              isSecureEntry: true,
              type: 'ordinary',
            });
          }}
        >
          Excluir Conta
        </button>
      </TopOptions>

      <UserIcon>
        {user.avatar ? (
          <UserAvatar src={`${apiStaticUrl}/avatar/${user.avatar}`} />
        ) : (
          <MdInsertPhoto size={180} color="#1c274e" />
        )}

        <EditIcon onClick={handleEditIcon}>
          <MdModeEdit size={140} color="#fff" />
        </EditIcon>

        <input
          ref={imageInputRef}
          onChange={event => handleUpdateAvatar(event)}
          type="file"
          style={{ display: 'none' }}
        />
      </UserIcon>

      <Form ref={formRef} initialData={user} onSubmit={handleSubmit}>
        <InputLine>
          <DashboardInput name="name" placeholder="Nome" Icon={MdPerson} />

          <DashboardInput name="email" placeholder="E-mail" Icon={MdMail} />
        </InputLine>

        <InputLine>
          <DashboardInput
            name="oldPassword"
            placeholder="Senha antiga"
            Icon={MdLock}
            type="password"
          />

          <DashboardInput
            name="newPassword"
            placeholder="Nova senha"
            Icon={MdLock}
            type="password"
          />
        </InputLine>

        <DashboardInput
          name="confirmPassword"
          placeholder="Confirmar senha"
          Icon={MdLock}
          type="password"
          style={{
            marginTop: 90,
          }}
        />
      </Form>
    </Container>
  );
};

export default ProfileData;
