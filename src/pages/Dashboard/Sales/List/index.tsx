import LoadingSpinner from 'components/LoadingSpinner';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MdArrowBack, MdArrowForward, MdInfo } from 'react-icons/md';
import { format } from 'date-fns';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import api from 'services/api';
import { useModal } from 'hooks/modal';
import { FaCalendar } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';
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

interface ISearchConfig {
  type: ISearchType;
  date: string;
}

const types = ['day', 'week', 'month'] as ISearchType[];

const SalesList: React.FC = () => {
  const { showModal } = useModal();

  const [sales, setSales] = useState<ISale[]>([]);
  const [hasLoadedSales, setHasLoadedSales] = useState(false);
  const [searchConfig, setSearchConfig] = useState<ISearchConfig>({
    date: format(new Date(Date.now()), 'dd-MM-yyyy'),
    type: types[0],
  });

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  const parseSearchType = (type: ISearchType) => {
    switch (type) {
      case 'day':
        return 'Diário';
      case 'week':
        return 'Semanal';
      case 'month':
        return 'Mensal';
      default:
        return 'Diário';
    }
  };

  const typeTransition = useTransition(searchConfig.type, {
    from: {
      opacity: 0,
    },
    enter: {
      marginTop: 0,
      opacity: 1,
      delay: 200,
    },
    leave: {
      position: 'absolute',
      opacity: 0,
    },
    config: {
      duration: 400,
    },
  });

  useEffect(() => {
    api
      .get<ISale[]>(`/sales/${searchConfig.type}/${searchConfig.date}`)
      .then(({ data }) => {
        setSales(data);
        setHasLoadedSales(true);
      });
  }, [searchConfig]);

  const searchedSales = useMemo(() => sales, [sales]);

  const updateType = useCallback(
    (type: 'forwards' | 'backwards') => {
      const typesIndex = types.findIndex(value => value === searchConfig.type);

      if (type === 'forwards') {
        setSearchConfig(prev => ({
          date: prev.date,
          type: types[typesIndex === 2 ? 0 : typesIndex + 1],
        }));
      } else {
        setSearchConfig(prev => ({
          date: prev.date,
          type: types[typesIndex === 0 ? 2 : typesIndex - 1],
        }));
      }
    },
    [searchConfig],
  );

  return (
    <Container>
      {!hasLoadedSales ? (
        <LoadingSpinner color="#1c274e" />
      ) : (
        <SalesContainer>
          <SearchBarContainer>
            <SelectType>
              <button
                type="button"
                style={{ left: 0 }}
                onClick={() => updateType('forwards')}
              >
                <MdArrowBack size={42} />
              </button>

              {typeTransition((style, item) => (
                <animated.strong style={style}>
                  {parseSearchType(item)}
                </animated.strong>
              ))}

              <button
                type="button"
                style={{ right: 0 }}
                onClick={() => updateType('backwards')}
              >
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
                        setSearchConfig(prev => ({
                          type: prev.type,
                          date: pickerText || prev.date,
                        })),
                      color: '#1c274e',
                      text: 'Confirmar',
                    },
                  },
                  type: 'datePicker',
                  initialValue: searchConfig.date,
                })
              }
            >
              <FaCalendar size={42} />
            </CalendarButton>
          </SearchBarContainer>

          {!sales.length ? (
            <NoContentDiv>
              <MdInfo size={80} color="#1c274e" />

              <h2>Nenhuma venda encontrada no período determinado.</h2>
            </NoContentDiv>
          ) : (
            <>
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
                    <SaleSubText>
                      <SaleText>{sale.employee.name}</SaleText>

                      <SaleText>{sale.date}</SaleText>
                    </SaleSubText>

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
            </>
          )}
        </SalesContainer>
      )}
    </Container>
  );
};

export default SalesList;
