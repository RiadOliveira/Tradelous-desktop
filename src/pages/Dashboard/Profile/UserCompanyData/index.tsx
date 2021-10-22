import React, { useEffect, useState } from 'react';
import api from 'services/api';

import { MdDomain } from 'react-icons/md';
import { useAuth } from 'hooks/auth';
import LoadingSpinner from 'components/LoadingSpinner';
import { Container, CompanyIcon, CompanyImage, NoCompanyText } from './styles';

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
        <NoCompanyText>
          Sua conta ainda não está associada a nenhuma empresa.
        </NoCompanyText>
      )}
    </Container>
  );
};

export default UserCompany;
