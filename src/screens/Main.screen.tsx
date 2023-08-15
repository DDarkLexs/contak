import React from 'react';
import {View} from 'react-native';
import {Drawer} from 'react-native-paper';

export const Main: React.FC = (): React.JSX.Element => {
  return (
    <View>
      <Drawer.CollapsedItem
        focusedIcon="inbox"
        unfocusedIcon="inbox-outline"
        label="Inbox"
      />
    </View>
  );
};
