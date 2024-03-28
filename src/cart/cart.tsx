import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {useTheme} from '../store/ThemeProviderContext';
import {useCart} from './CartContext';

const Cart = () => {
  const {cartItem, removeFromCart, addQty, decreaseQty} = useCart();
  const {backgroundColor, textColor, isDarkMode} = useTheme();
  const [count, setCount] = useState(1);
  const total = cartItem.reduce(
    (acc, currentItem) =>
      acc + parseFloat(currentItem.price) * currentItem.quantity,
    0,
  );

  const renderItem = ({item}: any) => (
    <View
      style={[
        styles.itemContainer,
        {backgroundColor: isDarkMode ? 'gray' : 'white'},
      ]}>
      <Image
        style={styles.image}
        source={{uri: item.image}}
        resizeMode="contain"
      />
      <View style={styles.itemDetails}>
        <Text style={[styles.title, {color: textColor}]} numberOfLines={2}>
          {item.title}
        </Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.dollar, {color: textColor}]}>$</Text>
          <Text style={[styles.price, {color: textColor}]}>{item.price}</Text>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            if (item.quantity == 1) {
              removeFromCart(item.id);
            } else {
              decreaseQty(item.id);
            }
          }}
          style={styles.removeButton}>
          <Text style={styles.removeButtonText}>-</Text>
        </TouchableOpacity>
        <Text
          style={{
            alignSelf: 'center',
          }}>
          {item.quantity}
        </Text>
        <TouchableOpacity
          onPress={() => addQty(item.id)}
          style={styles.removeButton}>
          <Text style={styles.removeButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <FlatList
        data={cartItem}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.listContainer}
        ListFooterComponent={() =>
          cartItem.length != 0 ? <BottomCheckoutSection total={total} /> : <></>
        }
      />
    </View>
  );
};

const BottomCheckoutSection = ({total}: {total: number}) => {
  const {clearCart} = useCart();

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          paddingTop: 10,
          backgroundColor: 'whitesmoke',
        }}>
        <Text style={styles.title}>subtotal: ${total.toFixed(2)}</Text>
        <Text style={styles.title}>tax: $40</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          padding: 10,
          backgroundColor: 'whitesmoke',
        }}>
        <Text style={styles.title}>${(total + 40.0).toFixed(2)}</Text>
        <TouchableOpacity
          style={[styles.checkOutButton, {marginTop: -5}]}
          onPress={() => {
            clearCart();
            twoOptionAlert();
          }}>
          <Text>checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const twoOptionAlert = () => Alert.alert('order placed');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 8,
  },
  itemDetails: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dollar: {
    fontSize: 12,
    marginRight: 2,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'lightcoral',
    padding: 8,
    borderRadius: 50,
    alignItems: 'center',
  },
  checkOutButton: {
    backgroundColor: 'lightcoral',
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 50,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Cart;
