import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Wishlist = () => {
  return (
    <View style={customStyles.viewStyle}>
      <Text style={customStyles.textStyle}>Wishlist</Text>
    </View>
  );
};

const customStyles = StyleSheet.create({
  textStyle: {fontSize: 16, color: 'black'},
  viewStyle: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Wishlist;
