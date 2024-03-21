import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../store/ThemeProvider-Context';

const Cart = () => {
  const {backgroundColor, textColor} = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
      }}>
      <Text style={{color: textColor}}>Cart Screen</Text>
    </View>
  );
};

export default Cart;
