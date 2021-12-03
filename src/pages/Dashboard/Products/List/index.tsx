import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import LoadingSpinner from 'components/LoadingSpinner';

import { IProduct, useProducts } from 'hooks/products';
import { MdAdd, MdInfo, MdLabel, MdSearch } from 'react-icons/md';
import api from 'services/api';
import { useToast } from 'hooks/toast';
import { RiBarcodeFill } from 'react-icons/ri';
import { useModal } from 'hooks/modal';
import formatPrice from 'utils/formatPrice';
import {
  Container,
  NoContentDiv,
  AddProductButton,
  ProductsContainer,
  SearchBarContainer,
  SearchBar,
  BarCodeButton,
  Product,
  ProductData,
  ProductIcon,
  ProductImage,
  ProductText,
  ProductSubText,
} from './styles';

const ProductsList: React.FC = () => {
  const { updateProductsStatus, productsStatus } = useProducts();
  const { showToast } = useToast();
  const { showModal, hideModal } = useModal();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [hasLoadedProducts, setHasLoadedProducts] = useState(false);
  const [searchedText, setSearchedText] = useState('');
  const [barCodeValue, setBarCodeValue] = useState('');

  const barCodeButtonRef = useRef<HTMLButtonElement>(null);

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  useEffect(() => {
    if (productsStatus === 'newProduct' || products.length === 0) {
      api.get<IProduct[]>('/products').then(({ data }) => {
        if (data.length) {
          setProducts(data);
          updateProductsStatus(data[0]);
        }

        setHasLoadedProducts(true);
      });
    } else if (productsStatus.id) {
      if (productsStatus.id.includes('deleted')) {
        // To delete a product needs to pass deleted + product.id to productsStatus.
        const deletedProductId = productsStatus.id.split(' ')[1]; // Gets the id.

        setProducts(
          allProducts =>
            allProducts.filter(product => product.id !== deletedProductId), // Update state without api recall.
        );
      } else {
        setProducts(allProducts =>
          allProducts.map(product =>
            product.id !== productsStatus.id ? product : productsStatus,
          ),
        );
      }
    }
  }, [productsStatus, products.length, updateProductsStatus]);

  const handleNewProductButton = () => {
    updateProductsStatus({} as IProduct);

    showToast({
      type: 'info',
      text: {
        main: 'Criação iniciada',
        sub: 'Insira os dados do produto para finalizá-la',
      },
    });
  };

  const handleBarCodeRead = useCallback(() => {
    showModal({
      type: 'ordinary',
      text: 'Escaneie o código com seu Scanner',
      buttonsProps: {
        first: {
          text: 'Cancelar',
          color: '#db3b3b',
          actionFunction: () => undefined,
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
      } else {
        barCode += event.key;
      }
    });
  }, [hideModal, showModal]);

  const searchedProducts = useMemo(() => {
    if (barCodeValue) {
      const findedProduct = products.find(
        product => product.barCode === barCodeValue,
      );

      if (findedProduct) {
        updateProductsStatus(findedProduct);
      } else {
        showToast({
          text: {
            main: 'Código de barras inválido',
            sub: 'Nenhum produto encontrado com o código',
          },
        });
      }

      return findedProduct ? [findedProduct] : products;
    }

    return products.filter(product =>
      product.name.toLowerCase().includes(searchedText.toLowerCase()),
    );
  }, [barCodeValue, products, updateProductsStatus, showToast, searchedText]);

  return (
    <Container>
      {!hasLoadedProducts ? (
        <LoadingSpinner color="#1c274e" />
      ) : (
        <>
          {!products.length ? (
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
              <AddProductButton onClick={handleNewProductButton}>
                <MdAdd color="#fff" size={60} />
                <strong>Adicionar produto</strong>
              </AddProductButton>

              <ProductsContainer>
                <SearchBarContainer>
                  <MdSearch size={42} color="#515151" />

                  <SearchBar
                    placeholder="Nome do produto"
                    onChange={event => {
                      if (barCodeValue) {
                        setBarCodeValue('');
                      }

                      setSearchedText(event.target.value);
                    }}
                  />

                  <BarCodeButton
                    ref={barCodeButtonRef}
                    onClick={handleBarCodeRead}
                  >
                    <RiBarcodeFill size={42} />
                  </BarCodeButton>
                </SearchBarContainer>

                {searchedProducts.map(product => (
                  <Product
                    key={`${product.id}`}
                    onClick={() => updateProductsStatus(product)}
                  >
                    <ProductIcon>
                      {product.image ? (
                        <ProductImage
                          src={`${apiStaticUrl}/product-image/${product.image}`}
                        />
                      ) : (
                        <MdLabel color="#fff" size={60} />
                      )}
                    </ProductIcon>

                    <ProductData>
                      <ProductText>{product.name}</ProductText>

                      <ProductSubText>
                        <ProductText>{product.brand}</ProductText>

                        <ProductText>{formatPrice(product.price)}</ProductText>
                      </ProductSubText>
                    </ProductData>
                  </Product>
                ))}
              </ProductsContainer>
            </>
          )}
        </>
      )}
    </Container>
  );
};

export default ProductsList;
