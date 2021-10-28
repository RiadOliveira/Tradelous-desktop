import React, { ChangeEvent, useCallback, useRef } from 'react';
import DashboardInput from 'components/Input/DashboardInput';
import LoadingSpinner from 'components/LoadingSpinner';
import TopOptions from 'components/TopOptions';
import api from 'services/api';
import * as yup from 'yup';

import { useProducts } from 'hooks/products';
import { useAuth } from 'hooks/auth';
import { FormHandles } from '@unform/core';
import { useModal } from 'hooks/modal';
import { useToast } from 'hooks/toast';
import { MdAttachMoney, MdModeEdit, MdTagFaces } from 'react-icons/md';
import ErrorCatcher from 'errors/errorCatcher';
import {
  Container,
  ProductIcon,
  ProductImage,
  EditIcon,
  Form,
  InputLine,
} from './styles';

interface IProduct {
  name: string;
  id: string;
  price: number;
  quantity: number;
  brand: string;
  barCode?: string;
  image?: string;
}

const ProductsData: React.FC = () => {
  const { productsStatus, updateProductsStatus } = useProducts();
  const {
    user: { companyId },
  } = useAuth();
  const { showModal } = useModal();
  const { showToast } = useToast();

  const formRef = useRef<FormHandles>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  const handleUpdateImage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const data = new FormData();

      try {
        if (event.target.files) {
          const [file] = event.target.files;

          data.append('image', file);

          const { data: updatedProduct } = await api.patch<IProduct>(
            '/products/update-image',
            data,
          );

          updateProductsStatus(updatedProduct);
        }
      } catch {
        showToast({
          type: 'error',
          text: {
            main: 'Problema inesperado',
            sub: 'Ocorreu um erro ao atualizar a imagem',
          },
        });
      }
    },
    [showToast, updateProductsStatus],
  );

  const handleDeleteImage = useCallback(async () => {
    if (typeof productsStatus !== 'string' && !productsStatus.image) {
      showToast({
        text: {
          main: 'Erro na exclusão',
          sub: 'O produto não possui nenhuma imagem',
        },
        type: 'error',
      });

      return;
    }

    try {
      const { data } = await api.patch<IProduct>('/products/update-image');

      updateProductsStatus({ ...data, image: undefined });

      showToast({
        text: {
          main: 'Exclusão concluída',
          sub: 'Imagem do produto excluída com sucesso',
        },
        type: 'success',
      });
    } catch {
      showToast({
        type: 'error',
        text: {
          main: 'Problema inesperado',
          sub: 'Ocorreu um erro ao excluir a imagem',
        },
      });
    }
  }, [productsStatus, showToast, updateProductsStatus]);

  const handleEditIcon = useCallback(() => {
    showModal({
      text: 'O que deseja fazer com a imagem do produto?',
      buttonsProps: {
        first: {
          text: 'Atualizar',
          color: '#49b454',
          actionFunction: () => imageInputRef.current?.click(),
        },
        second: {
          text: 'Deletar',
          color: '#db3b3b',
          actionFunction: handleDeleteImage,
        },
      },
    });
  }, [showModal, handleDeleteImage]);

  const handleDeleteProduct = useCallback(() => {
    console.log('delete');
  }, []);

  const handleSubmit = useCallback(
    async (productData: IProduct) => {
      try {
        const schema = yup.object().shape({
          name: yup.string().required('Nome da empresa obrigatório'),
          cnpj: yup
            .number()
            .typeError('O CNPJ deve conter somente números')
            .required('CNPJ obrigatório')
            .min(14, 'O tamanho mínimo do cnpj é de 14 dígitos'),
        });

        await schema.validate(productData, {
          abortEarly: false,
        });

        if (typeof productsStatus !== 'string') {
          await api.put(`/products/${productsStatus.id}`, productData);
        }

        showToast({
          type: 'success',
          text: {
            main: 'Atualização bem sucedida',
            sub: 'Produto atualizado com sucesso',
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
    [productsStatus, showToast],
  );

  return (
    <Container>
      {typeof productsStatus === 'string' ? (
        <LoadingSpinner color="#1c274e" />
      ) : (
        <>
          {companyId && (
            <TopOptions>
              <button
                type="button"
                onClick={() => formRef.current?.submitForm()}
              >
                Atualizar Dados
              </button>
              <button
                type="button"
                onClick={() => {
                  showModal({
                    text: 'Para confirmar a exclusão, insira sua senha:',
                    buttonsProps: {
                      first: {
                        text: 'Excluir',
                        color: '#db3b3b',
                        actionFunction: handleDeleteProduct,
                      },
                      second: {
                        text: 'Cancelar',
                        color: '#1c274e',
                        actionFunction: () => undefined,
                      },
                    },
                  });
                }}
              >
                Excluir Produto
              </button>
            </TopOptions>
          )}

          <ProductIcon>
            {productsStatus.image ? (
              <ProductImage
                src={`${apiStaticUrl}/image/${productsStatus.image}`}
              />
            ) : (
              <MdTagFaces size={180} color="#1c274e" />
            )}

            {companyId && (
              <>
                <EditIcon onClick={handleEditIcon}>
                  <MdModeEdit size={140} color="#fff" />
                </EditIcon>

                <input
                  ref={imageInputRef}
                  onChange={event => handleUpdateImage(event)}
                  type="file"
                  style={{ display: 'none' }}
                />
              </>
            )}
          </ProductIcon>

          <Form
            ref={formRef}
            initialData={productsStatus}
            onSubmit={handleSubmit}
          >
            <InputLine>
              <DashboardInput
                name="name"
                placeholder="Nome do produto"
                Icon={MdTagFaces}
              />

              <DashboardInput
                name="price"
                placeholder="Preço do produto"
                Icon={MdAttachMoney}
              />
            </InputLine>

            <InputLine />
          </Form>
        </>
      )}
    </Container>
  );
};

export default ProductsData;
