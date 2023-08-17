import * as React from 'react';
import {DataTable} from 'react-native-paper';

const ArtigoDataTable: React.FC = (): React.JSX.Element => {
  const [page, setPage] = React.useState<number>(0);
  const [numberOfItemsPerPageList] = React.useState([2, 5, 9]);
  const [itemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[2],
  );

  const [items] = React.useState([
    {
      key: 1,
      name: 'Cupcake',
      calories: 356,
      fat: 16,
    },
    {
      key: 2,
      name: 'Eclair',
      calories: 262,
      fat: 16,
    },
    {
      key: 3,
      name: 'Frozen yogurt',
      calories: 159,
      fat: 6,
    },
    {
      key: 4,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 5,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 6,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 7,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 8,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 9,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 10,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 11,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 12,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
    {
      key: 13,
      name: 'Gingerbread',
      calories: 305,
      fat: 3.7,
    },
  ]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  React.useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  return (
    <DataTable>
      <DataTable.Header>
        <DataTable.Title>Dessert</DataTable.Title>
        <DataTable.Title numeric>Calories</DataTable.Title>
        <DataTable.Title numeric>Fat</DataTable.Title>
      </DataTable.Header>

      {items.slice(from, to).map(item => (
        <DataTable.Row key={item.key}>
          <DataTable.Cell>{item.name}</DataTable.Cell>
          <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
          <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
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
  );
};

export default ArtigoDataTable;
