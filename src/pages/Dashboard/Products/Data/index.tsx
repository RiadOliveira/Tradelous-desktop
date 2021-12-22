import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import DashboardInput from 'components/Input/DashboardInput';
import LoadingSpinner from 'components/LoadingSpinner';
import TopOptions from 'components/TopOptions';
import api from 'services/api';
import * as yup from 'yup';

import { IProduct, useProducts } from 'hooks/products';
import { FormHandles } from '@unform/core';
import { useModal } from 'hooks/modal';
import { useToast } from 'hooks/toast';
import {
  MdAttachMoney,
  MdModeEdit,
  MdLabelOutline,
  MdInbox,
} from 'react-icons/md';
import ErrorCatcher from 'errors/errorCatcher';
import { FaHashtag } from 'react-icons/fa';
import { RiBarcodeFill } from 'react-icons/ri';
import {
  Container,
  ProductIcon,
  ProductImage,
  EditIcon,
  Form,
  InputLine,
  BarCodeContainer,
  BarCodePlaceHolder,
  BarCodeButton,
} from './styles';

const ProductsData: React.FC = () => {
  const { productsStatus, updateProductsStatus } = useProducts();
  const { showModal, hideModal } = useModal();
  const { showToast } = useToast();

  const [barCodeValue, setBarCodeValue] = useState('');

  const formRef = useRef<FormHandles>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const barCodeButtonRef = useRef<HTMLButtonElement>(null);

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  useEffect(() => {
    if (
      productsStatus !== 'newProduct' &&
      (!productsStatus?.id || productsStatus.id.includes('deleted'))
    ) {
      formRef.current?.reset();
      setBarCodeValue('');
    } else if (productsStatus !== 'newProduct') {
      formRef.current?.setData({
        ...productsStatus,
        price: Number(productsStatus.price).toFixed(2).replace('.', ','),
      });
      setBarCodeValue(productsStatus.barCode || '');
    }
  }, [productsStatus]);

  const handleDeleteBarCode = useCallback(() => {
    if (productsStatus !== 'newProduct') {
      const { id, name, price, brand, quantity } = productsStatus;

      api
        .put(`/products/${id}`, {
          name,
          price,
          brand,
          quantity,
        })
        .then(() => {
          setBarCodeValue('');
          showToast({
            type: 'success',
            text: {
              main: 'Exclusão do código concluída',
              sub: 'Código de barras excluído com sucesso',
            },
          });
        });
    }
  }, [productsStatus, showToast]);

  const handleBarCodeRead = useCallback(() => {
    showModal({
      type: 'ordinary',
      text: 'Escaneie o código com seu Scanner',
      buttonsProps: {
        first: !barCodeValue
          ? {
              text: 'Cancelar',
              color: '#db3b3b',
              actionFunction: () => undefined,
            }
          : {
              text: 'Excluir código',
              color: '#db3b3b',
              actionFunction: () => handleDeleteBarCode(),
            },
      },
    });

    setTimeout(() => barCodeButtonRef.current?.focus(), 300);

    let barCode = '';

    barCodeButtonRef.current?.addEventListener('keydown', event => {
      if (event.code === 'Enter') {
        barCodeButtonRef.current?.blur();

        setBarCodeValue(barCode);
        hideModal();

        barCode = '';

        showToast({
          type: 'success',
          text: {
            main: 'Código de barras obtido',
            sub: 'Clique em atualizar dados para confirmá-lo',
          },
        });
      } else {
        barCode += event.key;
      }
    });
  }, [barCodeValue, handleDeleteBarCode, hideModal, showModal, showToast]);

  const handleUpdateImage = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const data = new FormData();

      try {
        if (event.target.files && productsStatus !== 'newProduct') {
          const [file] = event.target.files;

          data.append('image', file);

          const { data: updatedProduct } = await api.patch<IProduct>(
            `/products/update-image/${productsStatus.id}`,
            data,
          );

          updateProductsStatus(updatedProduct);

          showToast({
            type: 'success',
            text: {
              main: 'Atualização bem sucedida',
              sub: 'Imagem do produto atualizada com sucesso',
            },
          });
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
    [productsStatus, showToast, updateProductsStatus],
  );

  const handleDeleteImage = useCallback(async () => {
    if (productsStatus !== 'newProduct' && !productsStatus.image) {
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
      if (productsStatus !== 'newProduct') {
        const { data } = await api.patch<IProduct>(
          `/products/update-image/${productsStatus.id}`,
        );

        updateProductsStatus({ ...data, image: undefined });

        showToast({
          text: {
            main: 'Exclusão concluída',
            sub: 'Imagem do produto excluída com sucesso',
          },
          type: 'success',
        });
      }
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
      type: 'ordinary',
    });
  }, [showModal, handleDeleteImage]);

  const handleDeleteProduct = useCallback(async () => {
    try {
      if (productsStatus !== 'newProduct') {
        await api.delete(`/products/${productsStatus.id}`);

        updateProductsStatus({
          id: `deleted ${productsStatus.id}`,
        } as IProduct);

        showToast({
          type: 'success',
          text: {
            main: 'Exclusão concluída',
            sub: 'Produto excluído com sucesso',
          },
        });
      }
    } catch {
      showToast({
        type: 'error',
        text: {
          main: 'Problema inesperado',
          sub: 'Ocorreu algum problema na exclusão do produto',
        },
      });
    }
  }, [productsStatus, showToast, updateProductsStatus]);

  const hasSelectedProduct = useCallback(
    () =>
      productsStatus !== 'newProduct' &&
      productsStatus.id &&
      !productsStatus.id.includes('deleted'),
    [productsStatus],
  );

  const handleSubmit = useCallback(
    async (productData: IProduct) => {
      try {
        // eslint-disable-next-line no-param-reassign
        productData.price = Number(
          productData.price.toString().replace(',', '.'),
        );

        if (barCodeValue) {
          // eslint-disable-next-line no-param-reassign
          productData.barCode = barCodeValue;
        }

        const schema = yup.object().shape({
          name: yup.string().required('Nome do produto obrigatório'),
          price: yup
            .number()
            .moreThan(0, 'O preço precisa ser maior que zero')
            .required('Preço do produto obrigatório'),
          brand: yup.string().required('Marca do produto obrigatória'),
          quantity: yup
            .number()
            .integer('A quantidade precisa ser um valor inteiro')
            .min(0, 'A quantidade não pode ser negativa'),
          barCode: yup.string().optional(),
        });

        await schema.validate(productData, {
          abortEarly: false,
        });

        if (productsStatus === 'newProduct') {
          throw new Error();
        }

        const toastMessage = {
          main: '',
          sub: '',
        };

        if (hasSelectedProduct()) {
          const { data } = await api.put(
            `/products/${productsStatus.id}`,
            productData,
          );

          toastMessage.main = 'Atualização bem sucedida';
          toastMessage.sub = 'Produto atualizado com sucesso';

          updateProductsStatus(data);
        } else {
          await api.post(`/products`, productData);

          toastMessage.main = 'Adição bem sucedida';
          toastMessage.sub = 'Produto adicionado com sucesso';

          updateProductsStatus('newProduct');
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
      barCodeValue,
      hasSelectedProduct,
      productsStatus,
      showToast,
      updateProductsStatus,
    ],
  );

  return (
    <Container>
      {productsStatus === 'newProduct' ? (
        <LoadingSpinner color="#1c274e" />
      ) : (
        <>
          <TopOptions buttonsQuantity={hasSelectedProduct() ? 2 : 1}>
            <button type="button" onClick={() => formRef.current?.submitForm()}>
              {hasSelectedProduct() ? 'Atualizar Dados' : 'Criar Produto'}
            </button>

            {hasSelectedProduct() && (
              <button
                type="button"
                onClick={() =>
                  showModal({
                    text: 'Tem certeza que deseja excluir esse produto?',
                    buttonsProps: {
                      first: {
                        text: 'Sim',
                        color: '#49b454',
                        actionFunction: handleDeleteProduct,
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
            {productsStatus.image ? (
              <ProductImage
                src={`${apiStaticUrl}/product-image/${productsStatus.image}`}
              />
            ) : (
              <MdLabelOutline size={180} color="#1c274e" />
            )}

            <EditIcon onClick={handleEditIcon}>
              <MdModeEdit size={140} color="#fff" />
            </EditIcon>

            <input
              ref={imageInputRef}
              onChange={event => handleUpdateImage(event)}
              type="file"
              style={{ display: 'none' }}
            />
          </ProductIcon>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <InputLine>
              <DashboardInput
                name="name"
                placeholder="Nome do produto"
                Icon={MdLabelOutline}
              />

              <DashboardInput
                name="price"
                placeholder="Preço do produto"
                Icon={MdAttachMoney}
                type="text"
                pattern="\d*"
              />
            </InputLine>

            <InputLine>
              <DashboardInput
                name="quantity"
                placeholder="Quantidade em estoque"
                Icon={MdInbox}
                type="text"
                pattern="\d*"
              />

              <DashboardInput
                name="brand"
                placeholder="Marca do produto"
                Icon={FaHashtag}
              />
            </InputLine>

            <BarCodeContainer hasCode={!!barCodeValue}>
              <BarCodePlaceHolder>
                <RiBarcodeFill size={42} />
                Código do produto
              </BarCodePlaceHolder>

              <p>{barCodeValue}</p>

              <BarCodeButton
                type="button"
                ref={barCodeButtonRef}
                onClick={handleBarCodeRead}
              >
                {barCodeValue ? 'Código obtido' : 'Sem código inserido'}
              </BarCodeButton>
            </BarCodeContainer>
          </Form>
        </>
      )}
    </Container>
  );
};

export default ProductsData;
