import React, { useCallback, useEffect, useMemo, useState } from 'react';
import LoadingSpinner from 'components/LoadingSpinner';
import api from 'services/api';
import { useAuth } from 'hooks/auth';
import { MdClose, MdInfo, MdPerson, MdPersonAdd } from 'react-icons/md';
import { useModal } from 'hooks/modal';
import { useToast } from 'hooks/toast';
import {
  Container,
  ActionButton,
  EmployeesContainer,
  Employee,
  EmployeeIcon,
  EmployeeImage,
  EmployeeData,
  EmployeeText,
  NoCompanyDiv,
} from './styles';

interface IEmployee {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isAdmin: boolean;
}

const CompanyList: React.FC = () => {
  const { user, setUserCompany } = useAuth();
  const { showModal } = useModal();
  const { showToast } = useToast();

  const [employees, setEmployees] = useState<IEmployee[]>([]);

  const apiStaticUrl = useMemo(() => `${api.defaults.baseURL}/files`, []);

  useEffect(() => {
    if (user.companyId) {
      api.get('/company/list-employees').then(response => {
        setEmployees(response.data);
      });
    }
  }, [user.companyId]);

  const orderedEmployees = useMemo(() => {
    const admin =
      employees.find(employee => employee.isAdmin) || ({} as IEmployee); // Always will have a admin.

    const allEmployees = employees.filter(employee => !employee.isAdmin);

    return [admin, ...allEmployees];
  }, [employees]);

  const handleHireEmployee = useCallback(
    async (employeeId: string): Promise<void> => {
      try {
        const response = await api.patch<IEmployee>(
          `/company/hire-employee/${employeeId}`,
        );

        setEmployees(prevEmployees => [...prevEmployees, response.data]);

        showToast({
          type: 'success',
          text: {
            main: 'Contratação concluída',
            sub: 'Funcionário contratado com sucesso',
          },
        });
      } catch {
        showToast({
          type: 'error',
          text: {
            main: 'Erro ao contratar funcionário',
            sub: 'Verifique se você inseriu o ID corretamente',
          },
        });
      }
    },
    [showToast],
  );

  const handleFireEmployee = useCallback(
    async (verifyPassword: string, employeeId: string) => {
      try {
        await api.post('/user/sessions', {
          email: user.email,
          password: verifyPassword,
        }); // In order to verify user's password to delete company.

        await api.patch(`/company/fire-employee/${employeeId}`);

        showToast({
          type: 'success',
          text: {
            main: 'Demissão concluída',
            sub: 'Funcionário demitido com sucesso',
          },
        });

        setEmployees(prevEmployees =>
          prevEmployees.filter(employee => employee.id !== employeeId),
        );
      } catch {
        showToast({
          type: 'error',
          text: {
            main: 'Problema inesperado',
            sub: 'Erro ao demitir o funcionário',
          },
        });
      }
    },
    [showToast, user.email],
  );

  const handleLeaveCompany = useCallback(
    async (verifyPassword: string) => {
      try {
        await api.post('/user/sessions', {
          email: user.email,
          password: verifyPassword,
        }); // In order to verify user's password to leave company.

        await api.patch('/user/leave-company');

        showToast({
          type: 'success',
          text: {
            main: 'Sucesso na saída',
            sub: 'Você não pertence mais a nenhuma empresa',
          },
        });

        setUserCompany(false);
      } catch {
        showToast({
          type: 'error',
          text: {
            main: 'Problema inesperado',
            sub: 'Ocorreu um erro ao abandonar a empresa',
          },
        });
      }
    },
    [setUserCompany, showToast, user.email],
  );

  const showHireEmployeeModal = () =>
    showModal({
      text: 'Insira o ID do funcionário que deseja contratar',
      buttonsProps: {
        first: {
          actionFunction: employeeId => handleHireEmployee(employeeId || ''),
          color: '#1c274e',
          text: 'Confirmar',
        },
      },
      type: 'withInput',
    });

  const showLeaveCompanyModal = () =>
    showModal({
      text: 'Insira sua senha para confirmar a saída',
      buttonsProps: {
        first: {
          actionFunction: verifyPassword =>
            handleLeaveCompany(verifyPassword || ''),
          color: '#1c274e',
          text: 'Confirmar',
        },
      },
      isSecureEntry: true,
      type: 'withInput',
    });

  return (
    <Container>
      {user.companyId ? (
        <>
          {!orderedEmployees.length ? (
            <LoadingSpinner color="#1c274e" />
          ) : (
            <>
              {user.isAdmin ? (
                <ActionButton adminButton onClick={showHireEmployeeModal}>
                  <MdPersonAdd color="#fff" size={60} />
                  <strong>Contratar funcionário</strong>
                </ActionButton>
              ) : (
                <ActionButton
                  adminButton={false}
                  onClick={showLeaveCompanyModal}
                >
                  <MdClose color="#fff" size={60} />
                  <strong>Sair da empresa</strong>
                </ActionButton>
              )}

              <EmployeesContainer>
                {orderedEmployees.map((employee, index) => (
                  <Employee
                    key={`${employee.id}`}
                    disabled={!user.isAdmin || employee.isAdmin}
                    style={{
                      cursor: user.isAdmin && !!index ? 'pointer' : 'auto',
                    }}
                    onClick={() =>
                      showModal({
                        text: 'Para confirmar a demissão do funcionário, insira sua senha:',
                        buttonsProps: {
                          first: {
                            text: 'Demitir',
                            color: '#db3b3b',
                            actionFunction: verifyPassword =>
                              handleFireEmployee(
                                verifyPassword || '',
                                employee.id,
                              ),
                          },
                        },
                        isSecureEntry: true,
                        type: 'withInput',
                      })
                    }
                  >
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
                ))}
              </EmployeesContainer>
            </>
          )}
        </>
      ) : (
        <NoCompanyDiv>
          <MdInfo size={80} color="#1c274e" />

          <h2>
            Você ainda não está associado a nenhuma empresa, se você for dono de
            uma, preencha os dados dela e confirme sua criação, se não, envie
            seu ID (Disponível no perfil) para seu chefe, para que ele possa lhe
            adicionar à empresa.
          </h2>
        </NoCompanyDiv>
      )}
    </Container>
  );
};

export default CompanyList;
