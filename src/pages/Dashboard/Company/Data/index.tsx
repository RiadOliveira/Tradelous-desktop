import React, { useEffect, useState } from 'react';
import { useAuth } from 'hooks/auth';
import { MdDomain } from 'react-icons/md';
import api from 'services/api';
import { Form } from '@unform/web';
import DashboardInput from 'components/DashboardInput';
import { Container, CompanyIcon, CompanyImage } from './styles';

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

const CompanyData: React.FC = () => {
  const { user } = useAuth();

  const [company, setCompany] = useState<ICompany>({} as ICompany);
  const [hasLoadedCompany, setHasLoadedCompany] = useState(false);

  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

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
        <DashboardInput
          name="name"
          placeholder="Nome da empresa"
          Icon={MdDomain}
        />
      </Form>
    </Container>
  );
};

export default CompanyData;
