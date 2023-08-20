import * as React from 'react';
import {DataTable} from 'react-native-paper';
import {NotaController} from '../../../controller/nota/nota.controller';
import {useEffect} from 'react';
import {ToastAndroid} from 'react-native';
import {QueryContagem} from '../../../database/repository/nota.repository';
import {useAppSelector} from '../../../store/hooks/store.hook';
import {convertToCurrency} from '../../../utils/moeda/moeda.utils';

const ShortNumeracaoDataTable: React.FC = (): React.JSX.Element => {
  const controller = new NotaController();
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState<number[]>([3]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const usuario = useAppSelector(state => state.usuario.sessao);
  const [items, setItems] = React.useState<QueryContagem[]>([]);
  const route = useAppSelector((state) => state.main.route)

  const getContas = async () => {
    try {
      const query = await controller.getContagens();
      setItems(query);
    } catch (error) {
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
    }
  };
  useEffect(() => {
    getContas();
  }, [usuario?.id_usuario, route]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <>
      {/* <Text>{JSON.stringify(items)}</Text> */}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>titulo</DataTable.Title>
          <DataTable.Title numeric>vencimento</DataTable.Title>
          <DataTable.Title numeric>total</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item: QueryContagem, i) => (
          <DataTable.Row key={i}>
            <DataTable.Cell>{item.titulo}</DataTable.Cell>
            <DataTable.Cell numeric>
              {convertToCurrency(item.total)}
            </DataTable.Cell>
            <DataTable.Cell numeric>{item.qtd}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </>
  );
};

export default ShortNumeracaoDataTable;
