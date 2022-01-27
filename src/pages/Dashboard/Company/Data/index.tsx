import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import api from 'services/api';
import DashboardInput from 'components/Input/DashboardInput';
import Select from 'components/Select';
import ErrorCatcher from 'errors/errorCatcher';
import * as yup from 'yup';

import { useAuth } from 'hooks/auth';
import { MdDomain, MdModeEdit, MdPlace } from 'react-icons/md';
import { FormHandles } from '@unform/core';
import { useToast } from 'hooks/toast';
import LoadingSpinner from 'components/LoadingSpinner';
import { useModal } from 'hooks/modal';
import TopOptions from 'components/TopOptions';
import {
  Container,
  RegisterCompanyButton,
  CompanyIcon,
  EditIcon,
  CompanyImage,
  Form,
  InputLine,
} from './styles';

interface ICompany {
  id: string;
  name: string;
  cnpj: number;
  address: string;
  logo?: string;
}

interface OptionProps {
  [key: string]: string;
}

interface IBrazilianLocation extends OptionProps {
  id: string;
  nome: string;
  index: string;
}

interface IBrazilianState extends IBrazilianLocation {
  sigla: string;
}

type IBrazilianCity = IBrazilianLocation;

const CompanyData: React.FC = () => {
  const { user, setUserCompany } = useAuth();
  const { showModal } = useModal();
  const { showToast } = useToast();

  const formRef = useRef<FormHandles>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const [company, setCompany] = useState<ICompany>({} as ICompany);

  const [allStates, setAllStates] = useState<IBrazilianState[]>([]);
  const [selectedState, setSelectedState] = useState<IBrazilianState>(
    {} as IBrazilianState,
  );

  const [stateCities, setStateCities] = useState<IBrazilianCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<IBrazilianCity>(
    {} as IBrazilianCity,
  );

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  // Gets company data.
  useEffect(() => {
    if (user.companyId) {
      api.get('/company').then(response => {
        setCompany(response.data);
      });
    } else formRef.current?.reset();
  }, [user.companyId]);

  // Gets states data.
  useEffect(() => {
    if (!user.companyId || company.address) {
      api
        .get<IBrazilianState[]>(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
          {
            baseURL: '',
          },
        )
        .then(({ data }) => {
          setAllStates(data);

          setSelectedState(() => {
            let index = 0;

            if (user.companyId) {
              index = data.findIndex(
                ({ sigla }) => sigla === company.address.split('/')[1],
              );
            }

            return { ...data[index], index: index.toString() };
          });
        })
        .catch(() => {
          const state = company.address.split('/')[1];

          setAllStates([
            {
              id: '0',
              index: '0',
              nome: state,
              sigla: state,
            },
          ]);

          setSelectedState({
            id: '0',
            index: '0',
            nome: state,
            sigla: state,
          });
        });
    }
  }, [company.address, user.companyId]);

  // Gets cities data.
  useEffect(() => {
    let unmounted = false;

    if (selectedState.id) {
      api
        .get<IBrazilianCity[]>(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState.id}/municipios?orderBy=nome`,
        )
        .then(({ data }) => {
          if (!unmounted) {
            setStateCities(data);

            setSelectedCity(() => {
              let index = 0;

              if (user.companyId) {
                index = data.findIndex(
                  ({ nome }) => nome === company.address.split('/')[0],
                );
              }

              return { ...data[index], index: index.toString() };
            });
          }
        })
        .catch(() => {
          const city = company.address.split('/')[0];

          setStateCities([
            {
              id: '0',
              index: '0',
              nome: city,
            },
          ]);

          setSelectedCity({
            id: '0',
            index: '0',
            nome: city,
          });
        });
    }

    return () => {
      unmounted = true;
    };
  }, [selectedState.id, company.address, user.companyId]);

  const handleUpdateLogo = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const data = new FormData();

      try {
        if (event.target.files) {
          const [file] = event.target.files;

          data.append('logo', file);

          const {
            data: { logo },
          } = await api.patch<ICompany>('/company/update-logo', data);

          setCompany(value => ({ ...value, logo }));
        }
      } catch {
        showToast({
          type: 'error',
          text: {
            main: 'Problema inesperado',
            sub: 'Ocorreu um erro ao atualizar a logo',
          },
        });
      }
    },
    [showToast],
  );

  const handleDeleteLogo = useCallback(async () => {
    if (!company.logo) {
      showToast({
        text: {
          main: 'Erro na exclusão',
          sub: 'A empresa não possui nenhuma logo',
        },
        type: 'error',
      });

      return;
    }

    try {
      await api.patch<ICompany>('/company/update-logo');

      setCompany(value => ({ ...value, logo: undefined }));

      showToast({
        text: {
          main: 'Exclusão concluída',
          sub: 'Logo da empresa excluída com sucesso',
        },
        type: 'success',
      });
    } catch {
      showToast({
        type: 'error',
        text: {
          main: 'Problema inesperado',
          sub: 'Ocorreu um erro ao excluir a logo',
        },
      });
    }
  }, [company.logo, showToast]);

  const handleEditIcon = useCallback(() => {
    showModal({
      text: 'O que deseja fazer com a logo da empresa?',
      buttonsProps: {
        first: {
          text: 'Atualizar',
          color: '#49b454',
          actionFunction: () => imageInputRef.current?.click(),
        },
        second: {
          text: 'Deletar',
          color: '#db3b3b',
          actionFunction: handleDeleteLogo,
        },
      },
      type: 'ordinary',
    });
  }, [showModal, handleDeleteLogo]);

  const handleDeleteCompany = useCallback(
    async (verifyPassword: string) => {
      try {
        await api.post('/user/sessions', {
          email: user.email,
          password: verifyPassword,
        }); // In order to verify user's password to delete company.

        await api.delete('/company');

        showToast({
          type: 'success',
          text: {
            main: 'Exclusão concluída',
            sub: 'Empresa excluída com sucesso',
          },
        });

        setUserCompany(false);
      } catch {
        showToast({
          type: 'error',
          text: {
            main: 'Problema inesperado',
            sub: 'Ocorreu um erro ao excluir a empresa',
          },
        });
      }
    },
    [setUserCompany, showToast, user.email],
  );

  const handleSubmit = useCallback(
    async (companyData: ICompany) => {
      try {
        const schema = yup.object().shape({
          name: yup.string().required('Nome da empresa obrigatório'),
          cnpj: yup
            .number()
            .typeError('O CNPJ deve conter somente números')
            .required('CNPJ obrigatório')
            .min(14, 'O tamanho mínimo do cnpj é de 14 dígitos'),
        });

        await schema.validate(companyData, {
          abortEarly: false,
        });

        const toastText = {
          main: '',
          sub: '',
        };

        if (user.companyId) {
          await api.put('/company/', {
            ...companyData,
            address: `${selectedCity.nome}/${selectedState.sigla}`,
          });

          toastText.main = 'Atualização bem sucedida';
          toastText.sub = 'Empresa atualizada com sucesso';
        } else {
          const response = await api.post('/company/', {
            ...companyData,
            address: `${selectedCity.nome}/${selectedState.sigla}`,
          });

          setUserCompany(true, response.data.id);

          toastText.main = 'Empresa criada com sucesso';
          toastText.sub = 'Agora você pode gerir sua empresa';
        }

        showToast({
          type: 'success',
          text: {
            main: toastText.main,
            sub: toastText.sub,
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
    [
      user.companyId,
      showToast,
      selectedCity.nome,
      selectedState.sigla,
      setUserCompany,
    ],
  );

  return (
    <Container>
      {!selectedCity.id ? (
        <LoadingSpinner color="#1c274e" />
      ) : (
        <>
          {user.isAdmin && user.companyId && (
            <TopOptions buttonsQuantity={2}>
              <button
                type="button"
                onClick={() => formRef.current?.submitForm()}
              >
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
                          handleDeleteCompany(verifyPassword || ''),
                      },
                    },
                    isSecureEntry: true,
                    type: 'withInput',
                  });
                }}
              >
                Excluir Empresa
              </button>
            </TopOptions>
          )}

          {!user.companyId && (
            <RegisterCompanyButton
              onClick={() => formRef.current?.submitForm()}
            >
              Concluir criação
            </RegisterCompanyButton>
          )}

          <CompanyIcon>
            {company.logo ? (
              <CompanyImage src={`${apiStaticUrl}/logo/${company.logo}`} />
            ) : (
              <MdDomain size={180} color="#1c274e" />
            )}

            {user.companyId && (
              <>
                <EditIcon onClick={handleEditIcon}>
                  <MdModeEdit size={140} color="#fff" />
                </EditIcon>

                <input
                  ref={imageInputRef}
                  onChange={event => handleUpdateLogo(event)}
                  type="file"
                  style={{ display: 'none' }}
                />
              </>
            )}
          </CompanyIcon>

          <Form ref={formRef} initialData={company} onSubmit={handleSubmit}>
            <InputLine>
              <DashboardInput
                name="name"
                placeholder="Nome da empresa"
                Icon={MdDomain}
                disabled={!user.isAdmin && !!user.companyId}
              />

              <DashboardInput
                name="cnpj"
                placeholder="CNPJ"
                Icon={MdDomain}
                disabled={!user.isAdmin && !!user.companyId}
                type="text"
                pattern="\d*"
                maxLength={14}
              />
            </InputLine>

            <InputLine>
              <Select
                data={allStates}
                optionValueReference="nome"
                placeHolder="Estado"
                Icon={MdPlace}
                setFunction={optionId =>
                  setSelectedState(
                    allStates.find(({ id }) => id === optionId) ||
                      ({} as IBrazilianState),
                  )
                }
                initialOptionPosition={Number(selectedState.index)}
                disabled={!user.isAdmin && !!user.companyId}
              />

              <Select
                data={stateCities}
                optionValueReference="nome"
                placeHolder="Cidade"
                Icon={MdPlace}
                setFunction={optionId =>
                  setSelectedCity(
                    stateCities.find(({ id }) => id === optionId) ||
                      ({} as IBrazilianCity),
                  )
                }
                initialOptionPosition={Number(selectedCity.index)}
                disabled={!user.isAdmin && !!user.companyId}
              />
            </InputLine>
          </Form>
        </>
      )}
    </Container>
  );
};

export default CompanyData;
