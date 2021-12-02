import LoadingSpinner from 'components/LoadingSpinner';
import React, { useEffect, useMemo, useState } from 'react';
import { MdInfo } from 'react-icons/md';
import { format } from 'date-fns';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import api from 'services/api';
import { useModal } from 'hooks/modal';
import {
  Container,
  NoContentDiv,
  SalesContainer,
  SearchBarContainer,
  Sale,
  SaleData,
  SaleIcon,
  SaleImage,
  SaleText,
  SaleSubText,
} from './styles';

interface IEmployee {
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
}

interface IProduct {
  name: string;
  price: number;
  quantity: number;
  brand: string;
  image?: string;
}

interface ISale {
  id: string;
  companyId: string;
  employeeId: string;
  productId: string;
  date: string;
  method: 'money' | 'card';
  quantity: number;
  totalPrice: number;
  employee: IEmployee;
  product: IProduct;
}

const SalesList: React.FC = () => {
  const { showModal } = useModal();

  const [sales, setSales] = useState<ISale[]>([]);
  const [hasLoadedSales, setHasLoadedSales] = useState(false);

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  useEffect(() => {
    const actualDate = new Date(Date.now());

    api
      .get<ISale[]>(`/sales/day/${format(actualDate, 'dd-MM-yyyy')}`)
      .then(({ data }) => {
        if (data.length) {
          setSales(data);
        }

        setHasLoadedSales(true);
      });
  }, []);

  const searchedSales = useMemo(() => sales, [sales]);

  useEffect(() => {
    showModal({
      text: 'Selecione a data de pesquisa das vendas',
      buttonsProps: {
        first: {
          actionFunction: () => undefined,
          color: '#1c274e',
          text: 'Confirmar',
        },
      },
      type: 'datePicker',
    });
  }, [showModal]);

  return (
    <Container>
      {!hasLoadedSales ? (
        <LoadingSpinner color="#1c274e" />
      ) : (
        <>
          {!sales.length ? (
            <NoContentDiv>
              <MdInfo size={80} color="#1c274e" />

              <h2>
                Parece que sua empresa ainda não possui nenhum produto
                cadastrado, você pode cadastrar o primeiro preenchendo o
                formulário ao lado.
              </h2>
            </NoContentDiv>
          ) : (
            <>
              <SalesContainer>
                <SearchBarContainer />

                {searchedSales.map(sale => (
                  <Sale
                    key={`${sale.id}`}
                    onClick={() => {
                      console.log(sale.id);
                    }}
                  >
                    <SaleIcon>
                      {sale.product.image ? (
                        <SaleImage
                          src={`${apiStaticUrl}/Sale-image/${sale.product.image}`}
                        />
                      ) : (
                        <RiShoppingBag3Fill color="#fff" size={58} />
                      )}
                    </SaleIcon>

                    <SaleData>
                      <SaleText>{sale.employee.name}</SaleText>

                      <SaleSubText>
                        <SaleText>{sale.product.name}</SaleText>

                        <SaleText>
                          R${' '}
                          {Number(sale.totalPrice).toFixed(2).replace('.', ',')}
                        </SaleText>
                      </SaleSubText>
                    </SaleData>
                  </Sale>
                ))}
              </SalesContainer>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default SalesList;
