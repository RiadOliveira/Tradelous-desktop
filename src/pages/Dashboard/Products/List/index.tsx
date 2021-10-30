import React, { useEffect, useMemo, useState } from 'react';
import LoadingSpinner from 'components/LoadingSpinner';

import { useAuth } from 'hooks/auth';
import { useProducts } from 'hooks/products';
import { MdAdd, MdInfo, MdLabel, MdSearch } from 'react-icons/md';
import api from 'services/api';
import { useToast } from 'hooks/toast';
import {
  Container,
  NoContentDiv,
  AddProductButton,
  ProductsContainer,
  SearchBarContainer,
  SearchBar,
  Product,
  ProductData,
  ProductIcon,
  ProductImage,
  ProductText,
  ProductSubText,
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

const ProductsList: React.FC = () => {
  const {
    user: { companyId },
  } = useAuth();
  const { updateProductsStatus, productsStatus } = useProducts();
  const { showToast } = useToast();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [hasLoadedProducts, setHasLoadedProducts] = useState(false);
  const [searchedText, setSearchedText] = useState('');

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  useEffect(() => {
    if (
      companyId &&
      (productsStatus === 'newProduct' || products.length === 0)
    ) {
      api.get<IProduct[]>('/products').then(({ data }) => {
        if (data.length) {
          setProducts(data);
          updateProductsStatus(data[0]);
        }

        setHasLoadedProducts(true);
      });
    } else if (productsStatus !== 'newProduct' && productsStatus.id) {
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
  }, [companyId, productsStatus, products.length, updateProductsStatus]);

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

  const searchedProducts = useMemo(
    () =>
      products.filter(product =>
        product.name.toLowerCase().includes(searchedText.toLowerCase()),
      ),
    [searchedText, products],
  );

  return (
    <Container>
      {companyId ? (
        <>
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
                      <MdSearch size={48} color="#515151" />
                      <SearchBar
                        placeholder="Nome do produto"
                        onChange={event => setSearchedText(event.target.value)}
                      />
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

                            <ProductText>
                              R${' '}
                              {Number(product.price)
                                .toFixed(2)
                                .replace('.', ',')}
                            </ProductText>
                          </ProductSubText>
                        </ProductData>
                      </Product>
                    ))}
                  </ProductsContainer>
                </>
              )}
            </>
          )}
        </>
      ) : (
        <NoContentDiv>
          <MdInfo size={80} color="#1c274e" />

          <h2>
            Você ainda não está associado a nenhuma empresa, se você for dono de
            uma empresa, preencha os dados dela e confirme sua criação.
          </h2>
        </NoContentDiv>
      )}
    </Container>
  );
};

export default ProductsList;
