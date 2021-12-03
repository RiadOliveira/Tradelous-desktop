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
  PlaceHolder,
} from './styles';

interface IProductOption {
  name: string;
  id: string;
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
    {} as IProductOption,
  );

  const formRef = useRef<FormHandles>(null);
  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  useEffect(() => {
    api.get<IProductOption[]>('/products').then(({ data }) => {
      if (data.length) {
        setCompanyProducts(data);
      }
    });
  }, []);

  useEffect(() => {
    if (salesStatus !== 'newSale' && !salesStatus?.id) {
      formRef.current?.reset();
      formRef.current?.setFieldValue('employee', name);
    } else if (salesStatus !== 'newSale') {
      formRef.current?.setData(salesStatus);
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
            sub: 'Venda excluído com sucesso',
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

  const handleSubmit = useCallback(
    async (saleData: ISale) => {
      try {
        const schema = yup.object().shape({
          quantity: yup
            .number()
            .min(1, 'A quantidade vendida precisa ser no mínimo 1')
            .max(
              saleData.quantity + saleData.product.quantity,
              'Quantidade requisitada maior que a disponível',
            )
            .required('Quantidade vendida obrigatória'),
        });

        await schema.validate(saleData, {
          abortEarly: false,
        });

        if (salesStatus === 'newSale') {
          throw new Error();
        }

        const response = await api.put(`/sales/${salesStatus.id}`, {
          productId: salesStatus.productId,
          method: 'money',

          // method: sellMethod,
          quantity: saleData.quantity,
        });

        let { quantity } = saleData;

        if (saleData.quantity !== salesStatus.quantity) {
          const quantityDifference = Math.abs(
            saleData.quantity - salesStatus.quantity,
          );

          quantity = salesStatus.product.quantity;

          quantity +=
            salesStatus.quantity > saleData.quantity
              ? quantityDifference
              : -quantityDifference;
        }

        updateSalesStatus({
          ...salesStatus,
          quantity,
        });

        showToast({
          type: 'success',
          text: {
            main: 'Atualização bem sucedida',
            sub: 'Venda atualizada com sucesso',
          },
        });
      } catch (err) {
        ErrorCatcher(err as Error | yup.ValidationError, formRef);
      }
    },
    [salesStatus, showToast, updateSalesStatus],
  );

  return (
    <Container>
      {salesStatus === 'newSale' ? (
        <LoadingSpinner color="#1c274e" />
      ) : (
        <>
          <TopOptions buttonsQuantity={salesStatus.id ? 2 : 1}>
            <button type="button" onClick={() => formRef.current?.submitForm()}>
              {salesStatus.id ? 'Atualizar Dados' : 'Criar Venda'}
            </button>

            {salesStatus.id && (
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
                  {salesStatus.employee?.name}
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
                <SaleContentTitle>{salesStatus.product?.name}</SaleContentTitle>
              )}
            </SaleIcon>
          </IconsContainer>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputLine>
              <DashboardInput
                name="quantity"
                placeholder="Quantidade em estoque"
                Icon={MdInbox}
                type="text"
                pattern="\d*"
              />

              <MethodSwitch>
                <PlaceHolder>
                  <MdAttachMoney size={42} />
                  Método de pagamento
                </PlaceHolder>

                <button
                  type="button"
                  style={{
                    background: '#49b454',
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                  }}
                >
                  Dinheiro
                </button>
                <button
                  type="button"
                  style={{
                    background: '#1c274e',
                    borderTopLeftRadius: 0,
                    borderBottomLeftRadius: 0,
                  }}
                >
                  Cartão
                </button>
              </MethodSwitch>
            </InputLine>

            {!salesStatus.id && (
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
