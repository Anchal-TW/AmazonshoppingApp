import React from 'react';
import {Text, View} from 'react-native';
import {useTheme} from '../store/ThemeProvider-Context';

const Wishlist = () => {
  const {backgroundColor, textColor} = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
      }}>
      <Text style={{color: textColor}}>Wishlist Screen</Text>
    </View>
  );
};

export default Wishlist;
