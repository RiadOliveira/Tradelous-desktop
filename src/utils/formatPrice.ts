const formatPrice = (value: number): string =>
  `R$ ${Number(value).toFixed(2).toString().replace('.', ',')}`;

export default formatPrice;
