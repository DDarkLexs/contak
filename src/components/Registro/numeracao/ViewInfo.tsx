import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import {useAppDispatch} from '../../../store/hooks/store.hook';
import {actions} from '../../../store/reducers/nota/nota.reducer';

interface CustomDialogProps {
  visible: boolean;
  hideDialog?: () => void;
}

const ViewNumeracaoDialog: React.FC<CustomDialogProps> = ({
  visible,
  hideDialog,
}): React.JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Título do Diálogo</Dialog.Title>
        <Dialog.Content>
          <View style={styles.rowContainer}>
            <View style={styles.container}>
              <View
                style={[styles.subContainer, {backgroundColor: 'lightblue'}]}>
                <Text>Container 1</Text>
              </View>
              <View
                style={[styles.subContainer, {backgroundColor: 'lightgreen'}]}>
                <Text>Container 2</Text>
              </View>
            </View>
            <View style={styles.container}>
              <View
                style={[styles.subContainer, {backgroundColor: 'lightblue'}]}>
                <Text>Container 1</Text>
              </View>
              <View
                style={[styles.subContainer, {backgroundColor: 'lightgreen'}]}>
                <Text>Container 2</Text>
              </View>
            </View>
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={() => dispatch(actions.setViewNotasDialog(false))}>
            Fechar
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  subContainer: {
    padding: 10,
    marginBottom: 10,
  },
});

export default ViewNumeracaoDialog;
