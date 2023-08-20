export function convertToCurrency(number: number): string {
  const formattedCurrency = Intl.NumberFormat('pt-AO', {
    style: 'currency',
    currency: 'AOA',
  }).format(number);

  return formattedCurrency; //.replace('AOA', 'Kwanza');
}
