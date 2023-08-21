import * as React from 'react';
import {useState} from 'react';
import {ToastAndroid, View} from 'react-native';
import {DataTable, IconButton, Menu, Text} from 'react-native-paper';
import {styles} from '../../assets/style/index.style';
import {useAppDispatch, useAppSelector} from '../../store/hooks/store.hook';
import {actions} from '../../store/reducers/registro/registro.reducer';
import {actions as notaActions} from '../../store/reducers/nota/nota.reducer';
import {convertToCurrency} from '../../utils/moeda/moeda.utils';
import {NotaController} from '../../controller/nota/nota.controller';
import {MenuItem} from '../../components/Registro/numeracao/MenuItem';

const NumeracaoData: React.FC = (): React.JSX.Element => {
  const controller = new NotaController();
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 5, 9]);
  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(state => state.main.loading);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[2],
  );

  const usuario = useAppSelector(state => state.usuario.sessao);
  const items = useAppSelector(state => state.nota.registro);
  const route = useAppSelector(state => state.main.route);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  const getContas = async () => {
    try {
      const query = await controller.getContagens();
      dispatch(notaActions.setRegistro(query));
    } catch (error) {
      ToastAndroid.show(JSON.stringify(error), ToastAndroid.LONG);
    }
  };

  React.useEffect(() => {
    if (usuario?.id_usuario) {
      getContas();
    }
  }, [usuario?.id_usuario, route]);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <View style={styles.container}>
      <View style={styles.containerBetween1}>
        <IconButton
          disabled={isLoading}
          size={30}
          onPress={() => {
            dispatch(actions.setPath('resumo'));
          }}
          icon={'arrow-left'}
        />

        <Text
          style={styles.textInBetween}
          disabled={isLoading}
          variant="titleLarge">
          registro de numeração
        </Text>
      </View>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>titulo</DataTable.Title>
          <DataTable.Title numeric>montante</DataTable.Title>
          <DataTable.Title numeric>qtd</DataTable.Title>
          <DataTable.Title numeric>ação</DataTable.Title>
        </DataTable.Header>

        {items.slice(from, to).map((item, i) => (
          <DataTable.Row key={i}>
            <DataTable.Cell>{item.titulo}</DataTable.Cell>
            <DataTable.Cell numeric>
              {convertToCurrency(item.total)}
            </DataTable.Cell>
            <DataTable.Cell numeric>{item.qtd}</DataTable.Cell>
            <DataTable.Cell numeric>
              <MenuItem key={i} id_notaDeContagem={item.id_notaDeContagem} />
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / itemsPerPage)}
          onPageChange={page => setPage(page)}
          label={`${from + 1}-${to} para ${items.length}`}
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          showFastPaginationControls
          selectPageDropdownLabel={'Linhas por página'}
        />
      </DataTable>
    </View>
  );
};

export default NumeracaoData;
