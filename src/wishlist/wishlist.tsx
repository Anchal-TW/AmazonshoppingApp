import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useWishlist} from './WishlistContext';
import {useTheme} from '../store/ThemeProviderContext';

const Wishlist = () => {
  const {wishlist, clearWishlist, removeFromWishlist} = useWishlist();
  const {backgroundColor, textColor, isDarkMode} = useTheme();

  const handleClearAll = () => {
    clearWishlist();
  };

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
      <TouchableOpacity
        onPress={() => removeFromWishlist(item.id)}
        style={styles.removeButton}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={[styles.container, {backgroundColor: backgroundColor}]}>
      <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
        <Text style={styles.clearButtonText}>Clear All</Text>
      </TouchableOpacity>
      <FlatList
        data={wishlist}
        renderItem={renderItem}
        keyExtractor={item => String(item.id)}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

// TODO : remove unused styles
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
  clearButton: {
    position: 'relative',
    zIndex: 1,
    alignSelf: 'flex-end',
    marginTop: 10,
    padding: 10,
  },
  clearButtonText: {
    fontSize: 16,
    color: 'red',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: 'lightcoral',
    padding: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Wishlist;
