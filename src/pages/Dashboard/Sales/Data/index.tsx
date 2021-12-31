import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { useModal } from 'hooks/modal';
import { useSales, ISale } from 'hooks/sales';
import { useToast } from 'hooks/toast';

import api from 'services/api';
import ErrorCatcher from 'errors/errorCatcher';
import LoadingSpinner from 'components/LoadingSpinner';
import TopOptions from 'components/TopOptions';
import DashboardInput from 'components/Input/DashboardInput';
import * as yup from 'yup';

import {
  MdAttachMoney,
  MdInbox,
  MdLabelOutline,
  MdPerson,
} from 'react-icons/md';
import Select from 'components/Select';
import { useAuth } from 'hooks/auth';
import {
  Container,
  Form,
  InputLine,
  IconsContainer,
  SaleIcon,
  SaleContentTitle,
  SaleContentImage,
  MethodSwitch,
  SwitchButton,
  PlaceHolder,
} from './styles';

interface IProductOption {
  id: string;
  name: string;
  quantity: string;
  [key: string]: string;
}

const SalesData: React.FC = () => {
  const { salesStatus, updateSalesStatus } = useSales();
  const { showModal } = useModal();
  const { showToast } = useToast();
  const {
    user: { name, avatar },
  } = useAuth();

  const [companyProducts, setCompanyProducts] = useState<IProductOption[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<IProductOption>(
    salesStatus !== 'newSale' && salesStatus.product
      ? ({
          name: salesStatus.product.name,
          id: salesStatus.product.id,
          quantity: salesStatus.product.quantity.toString(),
        } as IProductOption)
      : ({} as IProductOption),
  );

  const [paymentMethod, setPaymentMethod] = useState<
    'money' | 'card' | undefined
  >(undefined);

  const formRef = useRef<FormHandles>(null);
  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  useEffect(() => {
    if (salesStatus !== 'newSale' && salesStatus.id) {
      setPaymentMethod(salesStatus.method);
    }
  }, [paymentMethod, salesStatus]);

  useEffect(() => {
    api.get<IProductOption[]>('/products').then(({ data }) => {
      if (data.length) {
        setCompanyProducts(data);
      }
    });
  }, []);

  useEffect(() => {
    if (
      salesStatus !== 'newSale' &&
      (!salesStatus.id || salesStatus.id.includes('deleted'))
    ) {
      formRef.current?.reset();
      formRef.current?.setFieldValue('employee', name);
      setPaymentMethod(undefined);
    } else if (salesStatus !== 'newSale') {
      formRef.current?.setFieldValue('employee', salesStatus.employee.name);
      formRef.current?.setFieldValue('quantity', salesStatus.quantity);
    }
  }, [name, salesStatus]);

  const handleSelectProduct = useCallback(
    (productId: string) =>
      setSelectedProduct(
        companyProducts.find(product => product.id === productId) ||
          ({} as IProductOption),
      ),
    [companyProducts],
  );

  const handleDeleteSale = useCallback(async () => {
    try {
      if (salesStatus !== 'newSale') {
        await api.delete(`/sales/${salesStatus.id}`);

        updateSalesStatus({
          id: `deleted ${salesStatus.id}`,
        } as ISale);

        showToast({
          type: 'success',
          text: {
            main: 'Exclusão concluída',
            sub: 'Venda excluída com sucesso',
          },
        });
      }
    } catch {
      showToast({
        type: 'error',
        text: {
          main: 'Problema inesperado',
          sub: 'Ocorreu algum problema na exclusão da venda',
        },
      });
    }
  }, [salesStatus, showToast, updateSalesStatus]);

  const hasSelectedSale = useCallback(
    () =>
      salesStatus !== 'newSale' &&
      salesStatus.id &&
      !salesStatus.id.includes('deleted'),
    [salesStatus],
  );

  const handleSubmit = useCallback(
    async (saleData: ISale) => {
      try {
        if (salesStatus === 'newSale') {
          throw new Error();
        }

        // eslint-disable-next-line no-param-reassign
        saleData.quantity = saleData.quantity || 1;

        const schema = yup.object().shape({
          quantity: yup
            .number()
            .min(1, 'A quantidade vendida precisa ser no mínimo 1')
            .max(
              saleData.quantity + Number(selectedProduct.quantity),
              'Quantidade requisitada maior que a disponível',
            )
            .required('Quantidade vendida obrigatória'),
        });

        await schema.validate(saleData, {
          abortEarly: false,
        });

        const toastMessage = {
          main: '',
          sub: '',
        };

        if (hasSelectedSale()) {
          const { data } = await api.put<ISale>(`/sales/${salesStatus.id}`, {
            method: paymentMethod || 'money',
            quantity: saleData.quantity,
          });

          toastMessage.main = 'Atualização bem sucedida';
          toastMessage.sub = 'Venda atualizada com sucesso';

          updateSalesStatus({
            ...data,
            date: salesStatus.date,
            product: salesStatus.product,
            employee: salesStatus.employee,
          });
        } else {
          await api.post('/sales', {
            productId: selectedProduct.id,
            method: paymentMethod || 'money',
            quantity: saleData.quantity,
          });

          toastMessage.main = 'Adição bem sucedida';
          toastMessage.sub = 'Venda efetuada com sucesso';

          updateSalesStatus('newSale');
        }

        showToast({
          type: 'success',
          text: {
            main: toastMessage.main,
            sub: toastMessage.sub,
          },
        });
      } catch (err) {
        const toastText = ErrorCatcher(
          err as Error | yup.ValidationError,
          formRef,
        );

        showToast({
          type: 'error',
          text: toastText,
        });
      }
    },
    [
      hasSelectedSale,
      paymentMethod,
      salesStatus,
      selectedProduct.id,
      selectedProduct.quantity,
      showToast,
      updateSalesStatus,
    ],
  );

  return (
    <Container>
      {salesStatus === 'newSale' ? (
        <LoadingSpinner color="#1c274e" />
      ) : (
        <>
          <TopOptions buttonsQuantity={hasSelectedSale() ? 2 : 1}>
            <button type="button" onClick={() => formRef.current?.submitForm()}>
              {hasSelectedSale() ? 'Atualizar Dados' : 'Criar Venda'}
            </button>

            {hasSelectedSale() && (
              <button
                type="button"
                onClick={() =>
                  showModal({
                    text: 'Tem certeza que deseja excluir essa venda?',
                    buttonsProps: {
                      first: {
                        text: 'Sim',
                        color: '#49b454',
                        actionFunction: handleDeleteSale,
                      },
                      second: {
                        text: 'Não',
                        color: '#db3b3b',
                        actionFunction: () => undefined,
                      },
                    },
                    type: 'ordinary',
                  })
                }
              >
                Excluir Venda
              </button>
            )}
          </TopOptions>

          <IconsContainer>
            <SaleIcon>
              {salesStatus.employee?.avatar ? (
                <SaleContentImage
                  src={`${apiStaticUrl}/avatar/${salesStatus.employee?.avatar}`}
                />
              ) : (
                <>
                  {avatar ? (
                    <SaleContentImage
                      src={`${apiStaticUrl}/avatar/${avatar}`}
                    />
                  ) : (
                    <MdPerson size={180} color="#1c274e" />
                  )}
                </>
              )}

              {salesStatus.employee && (
                <SaleContentTitle>
                  {salesStatus.employee.name.length > 17
                    ? `${salesStatus.employee.name.substring(0, 17)}...`
                    : salesStatus.employee.name}
                </SaleContentTitle>
              )}
            </SaleIcon>

            <SaleIcon>
              {salesStatus.product?.image ? (
                <SaleContentImage
                  src={`${apiStaticUrl}/product-image/${salesStatus.product?.image}`}
                />
              ) : (
                <MdLabelOutline size={180} color="#1c274e" />
              )}

              {salesStatus.product && (
                <SaleContentTitle>
                  {salesStatus.product.name.length > 17
                    ? `${salesStatus.product.name.substring(0, 17)}...`
                    : salesStatus.product.name}
                </SaleContentTitle>
              )}
            </SaleIcon>
          </IconsContainer>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputLine>
              <DashboardInput
                name="quantity"
                placeholder="Quantidade da venda"
                Icon={MdInbox}
                type="text"
                pattern="\d*"
              />

              <MethodSwitch>
                <PlaceHolder>
                  <MdAttachMoney size={42} />
                  Método de pagamento
                </PlaceHolder>

                <SwitchButton
                  isSelected={paymentMethod === 'money'}
                  onClick={() => setPaymentMethod('money')}
                  type="button"
                  style={{
                    background: '#49b454',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  Dinheiro
                </SwitchButton>

                <SwitchButton
                  isSelected={paymentMethod === 'card'}
                  onClick={() => setPaymentMethod('card')}
                  type="button"
                  style={{
                    background: '#1c274e',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                >
                  Cartão
                </SwitchButton>
              </MethodSwitch>
            </InputLine>

            {(!salesStatus.id || salesStatus.id.includes('deleted')) && (
              <InputLine>
                <DashboardInput
                  name="employee"
                  placeholder="Funcionário"
                  Icon={MdPerson}
                  disabled
                />

                <Select
                  Icon={MdLabelOutline}
                  data={companyProducts}
                  optionValueReference="name"
                  placeHolder="Produto"
                  setFunction={optionId => handleSelectProduct(optionId)}
                  isOfDashboard
                />
              </InputLine>
            )}
          </Form>
        </>
      )}
    </Container>
  );
};

export default SalesData;
