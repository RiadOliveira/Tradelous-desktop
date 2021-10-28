import React, { useEffect, useState } from 'react';
import LoadingSpinner from 'components/LoadingSpinner';

import { useAuth } from 'hooks/auth';
import { useProducts } from 'hooks/products';
import { MdAdd, MdInfo, MdLabel } from 'react-icons/md';
import api from 'services/api';
import {
  Container,
  NoCompanyDiv,
  AddProductButton,
  ProductsContainer,
  Product,
  ProductData,
  ProductIcon,
  ProductImage,
  ProductText,
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

  const [products, setProducts] = useState<IProduct[]>([]);

  const apiStaticUrl = `${api.defaults.baseURL}/files`;

  useEffect(() => {
    if (
      companyId &&
      (productsStatus === 'newProduct' || products.length === 0)
    ) {
      api.get('/products').then(({ data }) => {
        setProducts(data);

        updateProductsStatus(data[0]);
      });
    } else if (typeof productsStatus !== 'string') {
      if (productsStatus.id) {
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
    }
  }, [companyId, productsStatus, products.length, updateProductsStatus]);

  return (
    <Container>
      {companyId ? (
        <>
          <AddProductButton
            onClick={() => updateProductsStatus({} as IProduct)}
          >
            <MdAdd color="#fff" size={60} />
            <strong>Adicionar produto</strong>
          </AddProductButton>

          {!products.length ? (
            <LoadingSpinner color="#1c274e" />
          ) : (
            <>
              <ProductsContainer>
                {products.map(product => (
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

                      <ProductText>
                        {Number(product.price).toFixed(2).replace('.', ',')}
                      </ProductText>
                    </ProductData>
                  </Product>
                ))}
              </ProductsContainer>
            </>
          )}
        </>
      ) : (
        <NoCompanyDiv>
          <MdInfo size={80} color="#1c274e" />

          <h2>
            Você ainda não está associado a nenhuma empresa, se você for dono de
            uma empresa, preencha os dados dela e confirme sua criação.
          </h2>
        </NoCompanyDiv>
      )}
    </Container>
  );
};

export default ProductsList;
