import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import {Card, Title, IconButton, Text} from 'react-native-paper';

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
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <IconButton
          icon={icon}
          size={30}
          onPress={() => {
            Alert.alert(label, `${value}`)
          }}
        />
        <Title style={styles.label}>{label}</Title>
      </View>
      <Text style={styles.value}>{value}</Text>
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
    textAlign: 'center',
  },
});

export default CustomCard;
