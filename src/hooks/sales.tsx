import React, { createContext, useCallback, useContext, useState } from 'react';
import { IProduct } from './products';

interface IEmployee {
  name: string;
  email: string;
  avatar: string;
  isAdmin: boolean;
}

interface ISale {
  id: string;
  productId: string;
  date: string;
  method: 'money' | 'card';
  quantity: number;
  totalPrice: number;
  employee: IEmployee;
  product: IProduct;
}

interface ISalesContext {
  salesStatus: ISale | 'newSale'; // ISale when modified some sale (contains the sale).
  updateSalesStatus(sale: ISale | 'newSale'): void;
}

const salesContext = createContext<ISalesContext>({} as ISalesContext);

const SalesContext: React.FC = ({ children }) => {
  const [salesStatus, setSalesStatus] = useState<ISale | 'newSale'>(
    {} as ISale,
  );

  const updateSalesStatus = useCallback((sale: ISale | 'newSale') => {
    setSalesStatus(sale);
  }, []);

  return (
    <salesContext.Provider value={{ salesStatus, updateSalesStatus }}>
      {children}
    </salesContext.Provider>
  );
};

const useSales = (): ISalesContext => useContext(salesContext);

export { SalesContext, useSales };
export type { ISale };
