import { FormHandles } from '@unform/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import Button from 'components/Button';
import Input from 'components/Input';
import Select from 'components/Select';
import api from 'services/api';
import ErrorCatcher from 'errors/errorCatcher';

import { useAuth } from 'hooks/auth';
import { MdDomain, MdPlace } from 'react-icons/md';
import { useToast } from 'hooks/toast';
import { Container, Header, InputLine, FormContainer } from './styles';

interface OptionProps {
  [key: string]: string;
}

interface IBrazilianState extends OptionProps {
  id: string;
  nome: string;
  sigla: string;
}

interface IBrazilianCity extends OptionProps {
  id: string;
  nome: string;
  [key: string]: string;
}

interface RegisterCompanyData {
  name: string;
  cnpj: string;
  city: string;
}

const RegisterCompany: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const navigation = useHistory();
  const { user, setUserCompany } = useAuth();
  const { showToast } = useToast();

  const [allStates, setAllStates] = useState<IBrazilianState[]>([]);
  const [selectedState, setSelectedState] = useState<IBrazilianState>(
    {} as IBrazilianState,
  ); // Id of first state on API

  const [stateCities, setStateCities] = useState<IBrazilianCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<IBrazilianCity>(
    {} as IBrazilianCity,
  );

  useEffect(() => {
    api
      .get<IBrazilianState[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
        {
          baseURL: '',
        },
      )
      .then(({ data }) => {
        setAllStates(data);
        setSelectedState(data[0]);
      });
  }, []);

  useEffect(() => {
    if (selectedState.id) {
      api
        .get(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedState.id}/municipios?orderBy=nome`,
        )
        .then(({ data }) => {
          setStateCities(data);
          setSelectedCity(data[0]);
        });
    }
  }, [selectedState.id]);

  const handleSubmit = useCallback(
    async (data: RegisterCompanyData) => {
      try {
        const schema = yup.object().shape({
          name: yup.string().required('Nome da empresa obrigatório'),
          cnpj: yup
            .string()
            .required('CNPJ obrigatório')
            .min(14, 'O tamanho mínimo do cnpj é de 14 dígitos'),
          city: yup.string().required('Cidade da empresa obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const companyData = new FormData();

        companyData.append('name', data.name);
        companyData.append(
          'address',
          `${selectedCity.nome}/${selectedState.sigla}`,
        );
        companyData.append('cnpj', data.cnpj);
        companyData.append('adminID', user.id);

        // if (selectedImage.uri) {
        //   companyData.append('logo', {
        //     uri: selectedImage.uri,
        //     name: `${data.name}-${user.id}`,
        //     type: selectedImage.type,
        //   });
        // }

        const response = await api.post('/company/', companyData);

        setUserCompany(true, response.data.id);

        navigation.push('Dashboard');
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
      navigation,
      selectedCity.nome,
      selectedState.sigla,
      setUserCompany,
      showToast,
      user.id,
    ],
  );

  return (
    <Container>
      <Header>Registrar empresa</Header>

      <FormContainer ref={formRef} onSubmit={handleSubmit}>
        <InputLine>
          <Input name="name" placeholder="Nome da empresa" Icon={MdDomain} />
          <Input
            name="cnpj"
            placeholder="CNPJ"
            type="text"
            pattern="\d*"
            maxLength={14}
            Icon={MdDomain}
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
          />
        </InputLine>
      </FormContainer>

      <Button
        onClick={() => formRef.current?.submitForm()}
        color="#1c274e"
        text="Confirmar"
        style={{ position: 'absolute', bottom: 80 }}
      />
    </Container>
  );
};

export default RegisterCompany;
