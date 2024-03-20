import {StyleSheet, Text, View} from 'react-native';

const Cart = () => {
  return (
    <View style={customStyles.viewStyle}>
      <Text style={customStyles.textStyle}>Cart</Text>
    </View>
  );
};

const customStyles = StyleSheet.create({
  textStyle: {fontSize: 16, color: 'black'},
  viewStyle: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

export default Cart;
