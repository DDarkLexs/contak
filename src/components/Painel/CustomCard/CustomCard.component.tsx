import React from 'react';
import {View, StyleSheet} from 'react-native';
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
          size={24}
          onPress={() => {
            // Implement your icon press logic here
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
    margin: 16,
    padding: 16,
    elevation: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
  },
  value: {
    fontSize: 24,
    textAlign: 'center',
  },
});

export default CustomCard;
