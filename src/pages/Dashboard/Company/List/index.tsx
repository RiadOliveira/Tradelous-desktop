import LoadingSpinner from 'components/LoadingSpinner';
import React, { useEffect, useMemo, useState } from 'react';
import { MdPerson } from 'react-icons/md';
import api from 'services/api';
import {
  Container,
  Employee,
  EmployeeIcon,
  EmployeeImage,
  EmployeeData,
  EmployeeText,
} from './styles';

interface IEmployee {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

const CompanyList: React.FC = () => {
  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

  useEffect(() => {
    api.get('/company/list-employees').then(response => {
      setEmployees(response.data);
    });
  }, []);

  const orderedEmployees = useMemo(() => {
    const admin =
      employees.find(employee => employee.isAdmin) || ({} as IEmployee); // Always will have a admin.

    const allEmployees = employees.filter(employee => !employee.isAdmin);

    return [admin, ...allEmployees];
  }, [employees]);

  return (
    <Container>
      {orderedEmployees.length === 0 ? (
        <LoadingSpinner color="#1c274e" />
      ) : (
        orderedEmployees.map(employee => (
          <Employee key={`${employee.id}`}>
            <EmployeeIcon>
              {employee.avatar ? (
                <EmployeeImage
                  src={`${apiStaticUrl}/avatar/${employee.avatar}`}
                />
              ) : (
                <MdPerson color="#fff" size={60} />
              )}
            </EmployeeIcon>

            <EmployeeData>
              <EmployeeText>{employee.name}</EmployeeText>

              <EmployeeText>{employee.email}</EmployeeText>
            </EmployeeData>
          </Employee>
        ))
      )}
    </Container>
  );
};

export default CompanyList;
