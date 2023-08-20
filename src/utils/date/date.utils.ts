import moment from 'moment';
import 'moment/locale/pt-br';

export const formatLong = (data: any) => {
  // Verifica se a data fornecida é válida
  if (!moment(data).isValid()) {
    return 'Data inválida';
  }

  // Formata a data no formato desejado
  const dataFormatada = moment(data).format('LL');

  return dataFormatada;
};
