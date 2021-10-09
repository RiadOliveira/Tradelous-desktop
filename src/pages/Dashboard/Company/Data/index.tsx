import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/auth';
import { MdDomain, MdPlace } from 'react-icons/md';
import api from 'services/api';
import DashboardInput from 'components/Input/DashboardInput';
import Select from 'components/Select';
import {
  Container,
  CompanyIcon,
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

interface IEmployee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
}

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

const CompanyData: React.FC = () => {
  const { user } = useAuth();

  const [company, setCompany] = useState<ICompany>({} as ICompany);
  const [hasLoadedCompany, setHasLoadedCompany] = useState(false);

  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const [allStates, setAllStates] = useState<IBrazilianState[]>([]);
  const [selectedState, setSelectedState] = useState<IBrazilianState>(
    {} as IBrazilianState,
  ); // Id of first state on API

  const [stateCities, setStateCities] = useState<IBrazilianCity[]>([]);
  const [selectedCity, setSelectedCity] = useState<IBrazilianCity>(
    {} as IBrazilianCity,
  );

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

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

  useEffect(() => {
    api.get('/company').then(response => setCompany(response.data));
  }, []);

  useEffect(() => {
    api.get('/company/list-employees').then(response => {
      setEmployees(response.data);
    });
  }, [user]);

  useEffect(() => {
    if (company.id && !!employees.length) {
      setHasLoadedCompany(true);
    }
  }, [company, employees]);

  return (
    <Container>
      <CompanyIcon>
        {company.logo ? (
          <CompanyImage src={`${apiStaticUrl}/logo/${company.logo}`} />
        ) : (
          <MdDomain size={180} color="#1c274e" />
        )}
      </CompanyIcon>

      <Form onSubmit={() => console.log('test')}>
        <InputLine>
          <DashboardInput
            name="name"
            placeholder="Nome da empresa"
            Icon={MdDomain}
          />

          <DashboardInput name="CNPJ" placeholder="CNPJ" Icon={MdDomain} />
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
            isOfDashboard
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
            isOfDashboard
          />
        </InputLine>
      </Form>
    </Container>
  );
};

export default CompanyData;
