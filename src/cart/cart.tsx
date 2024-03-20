import ScreenTitle from '../helper/title';
import Screen from '../helper/view';
import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../store/ThemeProvider-Context';

const Cart = () => {
  const { backgroundColor } = useTheme();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor }}>
      <Text>Cart Screen</Text>
    </View>
  );
};

export default Cart;
