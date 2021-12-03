import LoadingSpinner from 'components/LoadingSpinner';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MdArrowBack, MdArrowForward, MdInfo } from 'react-icons/md';
import { format } from 'date-fns';
import { RiShoppingBag3Fill } from 'react-icons/ri';
import api from 'services/api';
import { useModal } from 'hooks/modal';
import { FaCalendar } from 'react-icons/fa';
import { useTransition, animated } from 'react-spring';
import { useToast } from 'hooks/toast';
import { ISale, useSales } from 'hooks/sales';
import formatPrice from 'utils/formatPrice';
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

type ISearchType = 'day' | 'week' | 'month';

interface ISearchConfig {
  type: ISearchType;
  date: string;
}

const types = ['day', 'week', 'month'] as ISearchType[];

const SalesList: React.FC = () => {
  const { showModal } = useModal();
  const { showToast } = useToast();
  const { updateSalesStatus, salesStatus } = useSales();

  const actualFormattedDate = useMemo(
    () => format(new Date(Date.now()), 'dd-MM-yyyy'),
    [],
  );

  const [sales, setSales] = useState<ISale[]>([]);

  const [hasLoadedSales, setHasLoadedSales] = useState(false);
  const [searchConfig, setSearchConfig] = useState<ISearchConfig>({
    date: actualFormattedDate,
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
    api.get<ISale[]>(`/sales/day/${actualFormattedDate}`).then(({ data }) => {
      if (data.length) {
        setSales(data);
        updateSalesStatus(data[0] || {});
      }

      setHasLoadedSales(true);
    });
  }, [actualFormattedDate, updateSalesStatus]);

  useEffect(() => {
    if (salesStatus !== 'newSale' && salesStatus.id) {
      if (salesStatus.id.includes('deleted')) {
        // To delete a sale needs to pass deleted + sale.id to salesStatus.
        const deletedSaleId = salesStatus.id.split(' ')[1]; // Gets the id.

        setSales(
          allSales => allSales.filter(sale => sale.id !== deletedSaleId), // Update state without api recall.
        );
      } else {
        setSales(allSales =>
          allSales.map(sale =>
            sale.id !== salesStatus.id ? sale : salesStatus,
          ),
        );
      }
    }
  }, [
    actualFormattedDate,
    sales.length,
    salesStatus,
    showToast,
    updateSalesStatus,
  ]);

  useEffect(() => {
    api
      .get<ISale[]>(`/sales/${searchConfig.type}/${searchConfig.date}`)
      .then(({ data }) => {
        setSales(data);
        updateSalesStatus(data[0] || {});
      })
      .catch(() =>
        showToast({
          type: 'error',
          text: {
            main: 'Data requisitada inválida',
            sub: 'Por favor, insira uma data válida',
          },
        }),
      );
  }, [searchConfig, showToast, updateSalesStatus]);

  const updateType = useCallback(
    (type: 'forwards' | 'backwards') => {
      const typeIndex = types.findIndex(value => value === searchConfig.type);

      if (type === 'forwards') {
        setSearchConfig(prev => ({
          date: prev.date,
          type: types[typeIndex === 2 ? 0 : typeIndex + 1],
        }));
      } else {
        setSearchConfig(prev => ({
          date: prev.date,
          type: types[typeIndex === 0 ? 2 : typeIndex - 1],
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
                onClick={() => updateType('backwards')}
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
                onClick={() => updateType('forwards')}
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
              {sales.map(sale => (
                <Sale
                  key={`${sale.id}`}
                  onClick={() => updateSalesStatus(sale)}
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
                      <SaleText>
                        {sale.employee.name.length > 17
                          ? `${sale.employee.name.substring(0, 17)}...`
                          : sale.employee.name}
                      </SaleText>

                      <SaleText>{sale.date}</SaleText>
                    </SaleSubText>

                    <SaleSubText>
                      <SaleText>
                        {sale.product.name.length > 17
                          ? `${sale.product.name.substring(0, 17)}...`
                          : sale.product.name}
                      </SaleText>

                      <SaleText>{formatPrice(sale.totalPrice)}</SaleText>
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
