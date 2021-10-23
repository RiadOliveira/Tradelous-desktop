import React, { useEffect, useState } from 'react';
import api from 'services/api';

import { MdDomain, MdInfo } from 'react-icons/md';
import { useAuth } from 'hooks/auth';
import LoadingSpinner from 'components/LoadingSpinner';
import { Container, CompanyIcon, CompanyImage, NoCompanyDiv } from './styles';

interface ICompany {
  name: string;
  address: string;
  logo?: string;
}

const UserCompany: React.FC = () => {
  const { user } = useAuth();

  const [company, setCompany] = useState<ICompany>({} as ICompany);

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  useEffect(() => {
    if (user.companyId) {
      api.get('/company').then(response => {
        setCompany(response.data);
      });
    }
  }, [user.companyId]);

  return (
    <Container>
      {user.companyId ? (
        <>
          {!company.name ? (
            <LoadingSpinner color="#1c274e" />
          ) : (
            <>
              <CompanyIcon>
                {company.logo ? (
                  <CompanyImage src={`${apiStaticUrl}/logo/${company.logo}`} />
                ) : (
                  <MdDomain size={220} color="#1c274e" />
                )}
              </CompanyIcon>

              <strong>{company.name}</strong>
              <small>{company.address}</small>
            </>
          )}
        </>
      ) : (
        <NoCompanyDiv>
          <MdInfo size={80} color="#1c274e" />

          <h2>
            Sua conta ainda não está associada a nenhuma empresa, envie seu id
            para seu chefe lhe adicionar a ela, ou crie a sua própria na aba
            Empresa.
          </h2>
        </NoCompanyDiv>
      )}
    </Container>
  );
};

export default UserCompany;
