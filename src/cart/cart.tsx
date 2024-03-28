import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from '../store/ThemeProviderContext';

const Cart = () => {
  const {backgroundColor, textColor} = useTheme();

  return (
    // TODO : Extract styles, maybe a component
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
