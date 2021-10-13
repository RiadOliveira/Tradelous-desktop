import React, { useEffect, useMemo, useState } from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import api from 'services/api';
import { useAuth } from 'hooks/auth';
import { MdPerson } from 'react-icons/md';
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
  const { user } = useAuth();
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
        // orderedEmployees.map((employee, index) => (
        //   <Employee
        //     key={`${employee.id}`}
        //     disabled={!user.isAdmin}
        //     style={{ cursor: user.isAdmin && !!index ? 'pointer' : 'auto' }}
        //   >
        //     <EmployeeIcon>
        //       {employee.avatar ? (
        //         <EmployeeImage
        //           src={`${apiStaticUrl}/avatar/${employee.avatar}`}
        //         />
        //       ) : (
        //         <MdPerson color="#fff" size={60} />
        //       )}
        //     </EmployeeIcon>

        //     <EmployeeData>
        //       <EmployeeText>{employee.name}</EmployeeText>

        //       <EmployeeText>{employee.email}</EmployeeText>
        //     </EmployeeData>
        //   </Employee>
        // ))

        <>
          <Employee>
            <EmployeeIcon>
              <MdPerson color="#fff" size={60} />
            </EmployeeIcon>

            <EmployeeData>
              <EmployeeText>Name</EmployeeText>

              <EmployeeText>Email</EmployeeText>
            </EmployeeData>
          </Employee>
          <Employee>
            <EmployeeIcon>
              <MdPerson color="#fff" size={60} />
            </EmployeeIcon>

            <EmployeeData>
              <EmployeeText>Name</EmployeeText>

              <EmployeeText>Email</EmployeeText>
            </EmployeeData>
          </Employee>
          <Employee>
            <EmployeeIcon>
              <MdPerson color="#fff" size={60} />
            </EmployeeIcon>

            <EmployeeData>
              <EmployeeText>Name</EmployeeText>

              <EmployeeText>Email</EmployeeText>
            </EmployeeData>
          </Employee>
          <Employee>
            <EmployeeIcon>
              <MdPerson color="#fff" size={60} />
            </EmployeeIcon>

            <EmployeeData>
              <EmployeeText>Name</EmployeeText>

              <EmployeeText>Email</EmployeeText>
            </EmployeeData>
          </Employee>
          <Employee>
            <EmployeeIcon>
              <MdPerson color="#fff" size={60} />
            </EmployeeIcon>

            <EmployeeData>
              <EmployeeText>Name</EmployeeText>

              <EmployeeText>Email</EmployeeText>
            </EmployeeData>
          </Employee>
          <Employee>
            <EmployeeIcon>
              <MdPerson color="#fff" size={60} />
            </EmployeeIcon>

            <EmployeeData>
              <EmployeeText>Name</EmployeeText>

              <EmployeeText>Email</EmployeeText>
            </EmployeeData>
          </Employee>
          <Employee>
            <EmployeeIcon>
              <MdPerson color="#fff" size={60} />
            </EmployeeIcon>

            <EmployeeData>
              <EmployeeText>Name</EmployeeText>

              <EmployeeText>Email</EmployeeText>
            </EmployeeData>
          </Employee>
          <Employee>
            <EmployeeIcon>
              <MdPerson color="#fff" size={60} />
            </EmployeeIcon>

            <EmployeeData>
              <EmployeeText>Name</EmployeeText>

              <EmployeeText>Email</EmployeeText>
            </EmployeeData>
          </Employee>
          <Employee>
            <EmployeeIcon>
              <MdPerson color="#fff" size={60} />
            </EmployeeIcon>

            <EmployeeData>
              <EmployeeText>Name</EmployeeText>

              <EmployeeText>Email</EmployeeText>
            </EmployeeData>
          </Employee>
          <Employee>
            <EmployeeIcon>
              <MdPerson color="#fff" size={60} />
            </EmployeeIcon>

            <EmployeeData>
              <EmployeeText>Name</EmployeeText>

              <EmployeeText>Email</EmployeeText>
            </EmployeeData>
          </Employee>
        </>
      )}
    </Container>
  );
};

export default CompanyList;
