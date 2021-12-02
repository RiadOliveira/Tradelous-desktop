import LoadingSpinner from 'components/LoadingSpinner';
import React, { useEffect, useMemo, useState } from 'react';
import { MdArrowBack, MdArrowForward, MdInfo } from 'react-icons/md';
import { format } from 'date-fns';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import api from 'services/api';
import { useModal } from 'hooks/modal';
import { FaCalendar } from 'react-icons/fa';
import {
  Container,
  NoContentDiv,
  SearchBarContainer,
  SelectType,
  SalesContainer,
  CalendarButton,
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

type ISearchType = 'day' | 'week' | 'month';

const SalesList: React.FC = () => {
  const { showModal } = useModal();

  const [sales, setSales] = useState<ISale[]>([]);
  const [hasLoadedSales, setHasLoadedSales] = useState(false);
  const [searchType, setSearchType] = useState<ISearchType>('month');

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  useEffect(() => {
    const actualDate = new Date(Date.now());

    api
      .get<ISale[]>(`/sales/${searchType}/${format(actualDate, 'dd-MM-yyyy')}`)
      .then(({ data }) => {
        if (data.length) {
          setSales(data);
        }

        setHasLoadedSales(true);
      });
  }, [searchType]);

  const searchedSales = useMemo(() => sales, [sales]);

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
                Parece que sua empresa ainda não possui nenhuma venda efetuada,
                você pode efetuar a primeira preenchendo o formulário ao lado.
              </h2>
            </NoContentDiv>
          ) : (
            <>
              <SalesContainer>
                <SearchBarContainer>
                  <SelectType>
                    <button type="button" style={{ left: 0 }}>
                      <MdArrowBack size={42} />
                    </button>

                    <strong>Mensal</strong>

                    <button type="button" style={{ right: 0 }}>
                      <MdArrowForward size={42} />
                    </button>
                  </SelectType>

                  <CalendarButton
                    onClick={() =>
                      showModal({
                        text: 'Selecione a data de pesquisa das vendas',
                        buttonsProps: {
                          first: {
                            actionFunction: pickerText =>
                              console.log(pickerText),
                            color: '#1c274e',
                            text: 'Confirmar',
                          },
                        },
                        type: 'datePicker',
                      })
                    }
                  >
                    <FaCalendar size={42} />
                  </CalendarButton>
                </SearchBarContainer>

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
