import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../store/ThemeProviderContext';
import StarRating from '../helper/starRating';
import {useWishlist} from '../wishlist/WishlistContext';
import {AddedItem, useCart} from '../cart/CartContext';

interface User {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: {rate: number; count: number};
}

const Home = () => {
  const {backgroundColor, textColor, isDarkMode} = useTheme();
  const {wishlist, addToWishlist, removeFromWishlist} = useWishlist();
  const {cartItem, addToCart, removeFromCart} = useCart();

  const [items, setItems] = useState<User[]>([]);

  const getListItem = async () => {
    // TODO : extract the API layer out of component
    const url = 'https://fakestoreapi.com/products';
    fetch(url)
      .then(resp => resp.json())
      .then(json => {
        setItems(json);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    getListItem();
  }, []);

  const handleAddToWishlist = (item: User) => {
    const isItemInWishlist = wishlist.some(
      wishlistItem => wishlistItem.id === item.id,
    );
    if (isItemInWishlist) {
      removeFromWishlist(item.id);
    } else {
      addToWishlist(item);
    }
  };

  const handleAddToCart = (item: User) => {
    let convertUserToCartItem = (item: User): AddedItem => {
      return {
        id: item.id,
        title: item.title,
        price: item.price,
        description: item.description,
        image: item.image,
        quantity: 1,
      };
    };
    let selectedItem = convertUserToCartItem(item);
    if (isItemInCart(selectedItem.id)) {
      removeFromCart(item.id);
    } else {
      addToCart(selectedItem);
    }
  };

  const isItemInCart = (id: number) => {
    return cartItem.some(cartItem => cartItem.id === id);
  };

  const displayItem = ({item}: {item: User}) => {
    const isItemInWishlist = wishlist.some(
      wishlistItem => wishlistItem.id === item.id,
    );
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity onPress={() => handleAddToWishlist(item)}>
          <Image
            style={{alignSelf: 'flex-end', marginTop: 5, height: 20, width: 25}}
            source={{
              uri: !isItemInWishlist
                ? 'https://cdn-icons-png.freepik.com/256/1077/1077035.png?ga=GA1.1.334955396.1710843703&'
                : 'https://cdn-icons-png.freepik.com/256/14440/14440339.png?ga=GA1.1.865553007.1711522825&',
            }}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Image
          style={styles.image}
          source={{uri: item.image}}
          resizeMode="contain"
        />

        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.dollar}>$</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <View style={styles.star}>
          <StarRating rating={item.rating.rate} starSize={18} />
          <Text> ({item.rating.rate}) </Text>
        </View>
        <TouchableOpacity
          onPress={() => handleAddToCart(item)}
          style={styles.addToCarlistButton}>
          <Text style={styles.addToWishlistText}>
            {isItemInCart(item.id) ? (
              <Text>Remove from cart</Text>
            ) : (
              'Add to cart'
            )}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={items}
      keyExtractor={item => String(item.id)}
      renderItem={displayItem}
      numColumns={2}
      contentContainerStyle={[
        styles.container,
        {backgroundColor: isDarkMode ? backgroundColor : 'whitesmoke'},
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'whitesmoke',
  },
  itemContainer: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    flex: 1,
    fontSize: 15,
    marginTop: 8,
    color: 'black',
    padding: 10,
    textAlign: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkblue',
    textAlign: 'center',
  },
  star: {
    paddingTop: 10,
    paddingLeft: 35,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    justifyContent: 'center',
  },
  dollar: {
    fontSize: 12,
    color: 'darkblue',
    marginTop: 2,
    marginRight: 2,
  },
  rating: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  addToCarlistButton: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    alignItems: 'center',
  },
  addToWishlistText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;
