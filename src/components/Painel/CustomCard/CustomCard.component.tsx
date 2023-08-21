import React from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {
  Card,
  Title,
  IconButton,
  Text,
  ActivityIndicator,
} from 'react-native-paper';
import {useAppSelector} from '../../../store/hooks/store.hook';

type CustomCardProps = {
  icon: string;
  label: string;
  value: string | number;
};

const CustomCard: React.FC<CustomCardProps> = ({
  icon,
  label,
  value,
}): React.JSX.Element => {
  const loading = useAppSelector(state => state.main.loading);
  return (
    <Card disabled={loading} style={styles.card}>
      <View style={styles.header}>
        <IconButton
          icon={icon}
          disabled={loading}
          role="button"
          size={30}
          onPress={() => {
            Alert.alert(label, `${value}`);
          }}
        />
        <Title style={styles.label}>{label}</Title>
      </View>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    padding: 10,
    elevation: 4,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 15,
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default CustomCard;
