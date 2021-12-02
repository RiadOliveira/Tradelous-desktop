import React, { useCallback, useEffect, useRef } from 'react';
import { FormHandles } from '@unform/core';
import { useModal } from 'hooks/modal';
import { useSales, ISale } from 'hooks/sales';
import { useToast } from 'hooks/toast';
import { RiShoppingBag3Fill } from 'react-icons/ri';

import api from 'services/api';
import ErrorCatcher from 'errors/errorCatcher';
import LoadingSpinner from 'components/LoadingSpinner';
import TopOptions from 'components/TopOptions';
import DashboardInput from 'components/Input/DashboardInput';
import * as yup from 'yup';

import {
  Container,
  Form,
  InputLine,
  ProductIcon,
  ProductImage,
} from './styles';

const SalesData: React.FC = () => {
  const { salesStatus, updateSalesStatus } = useSales();
  const { showModal } = useModal();
  const { showToast } = useToast();

  const formRef = useRef<FormHandles>(null);

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  useEffect(() => {
    if (salesStatus !== 'newSale' && !salesStatus?.id) {
      formRef.current?.reset();
    } else if (salesStatus !== 'newSale') {
      formRef.current?.setData(salesStatus);
    }
  }, [salesStatus]);

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
                Excluir Produto
              </button>
            )}
          </TopOptions>

          <ProductIcon>
            {salesStatus.product?.image ? (
              <ProductImage
                src={`${apiStaticUrl}/product-image/${salesStatus.product?.image}`}
              />
            ) : (
              <RiShoppingBag3Fill size={180} color="#1c274e" />
            )}
          </ProductIcon>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputLine>
              <DashboardInput
                name="name"
                placeholder="Nome do produto"
                Icon={RiShoppingBag3Fill}
              />

              <DashboardInput
                name="price"
                placeholder="Preço do produto"
                Icon={RiShoppingBag3Fill}
                type="text"
                pattern="\d*"
              />
            </InputLine>

            <InputLine>
              <DashboardInput
                name="quantity"
                placeholder="Quantidade em estoque"
                Icon={RiShoppingBag3Fill}
                type="text"
                pattern="\d*"
              />

              <DashboardInput
                name="brand"
                placeholder="Marca do produto"
                Icon={RiShoppingBag3Fill}
              />
            </InputLine>
          </Form>
        </>
      )}
    </Container>
  );
};

export default SalesData;
