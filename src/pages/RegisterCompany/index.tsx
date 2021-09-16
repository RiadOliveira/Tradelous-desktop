import { FormHandles } from '@unform/core';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as yup from 'yup';
import Button from 'components/Button';
import Input from 'components/Input';
import api from 'services/api';

import { useAuth } from 'hooks/auth';
import { MdDomain, MdPlace } from 'react-icons/md';
import Select from 'components/Select';
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
  const { user } = useAuth();

  const [allStates, setAllStates] = useState<IBrazilianState[]>([]);
  const [selectedStateId, setSelectedStateId] = useState(12); // Id of first state on API

  const [stateCitys, setStateCitys] = useState<IBrazilianCity[]>([]);

  useEffect(() => {
    api
      .get<IBrazilianState[]>(
        'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome',
        {
          baseURL: '',
        },
      )
      .then(({ data }) => setAllStates(data));
  }, []);

  useEffect(() => {
    api
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedStateId}/municipios?orderBy=nome`,
      )
      .then(({ data }) => setStateCitys(data));
  }, [selectedStateId]);

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

        // else {
        //   Toast.show({
        //     type: 'success',
        //     text1: 'Cadastro realizado com sucesso!',
        //     text2: 'Entre em uma empresa para gerenciar seu estoque.',
        //   });
        // }
      } catch (err) {
        // ErrorCatcher(err as Error | yup.ValidationError, formRef); Will be made with toast.
      }
    },
    [navigation],
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

        {/* <InputLine>
          <Select
            placeHolder="Estado"
            Icon={MdPlace}
            onChange={event => setSelectedStateId(Number(event.target.value))}
          >
            {allStates.map(state => (
              <option value={state.id} key={state.id}>
                {state.nome}
              </option>
            ))}
          </Select>

          <Select Icon={MdPlace} placeHolder="Cidade">
            {stateCitys.map(city => (
              <option value={city.nome} key={city.id}>
                {city.nome}
              </option>
            ))}
          </Select>
        </InputLine> */}
        <InputLine>
          <Select
            data={allStates}
            optionValueReference="nome"
            placeHolder="Estado"
            Icon={MdPlace}
          />
          <Select
            data={stateCitys}
            optionValueReference="nome"
            placeHolder="Estado"
            Icon={MdPlace}
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
