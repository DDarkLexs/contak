import {Appbar, useTheme} from 'react-native-paper';
import React from 'react';
import {NativeStackHeaderProps} from '@react-navigation/native-stack/lib/typescript/src/types';

export const Header: React.FC<
  Pick<NativeStackHeaderProps, 'navigation' | 'options' | 'back'>
> = (): React.JSX.Element => {
  const theme = useTheme();

  return (
    <Appbar.Header theme={{colors: {primary: theme.colors.surface}}}>
      <Appbar.Content title={'CONTAK'} mode="center-aligned" />
    </Appbar.Header>
  );
};
