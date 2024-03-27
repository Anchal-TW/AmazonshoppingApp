import React, {useEffect, useState} from 'react';
import {
  Image,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '../store/ThemeProvider-Context';
import StarRating from '../helper/starRating';
import {useWishlist} from '../wishlist/WishlistContext';

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

  const [items, setItems] = useState<User[]>([]);

  const getListItem = async () => {
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
        {/* <TouchableOpacity
          onPress={() => handleAddToWishlist(item)}
          style={styles.addToWishlistButton}>
          <Text style={styles.addToWishlistText}>
            {isItemInWishlist ? (
              //https://cdn-icons-png.freepik.com/256/14440/14440339.png?ga=GA1.1.865553007.1711522825&
              <Text style={styles.removeButton}>Remove from Wishlist</Text>
            ) : (
              'Add to Wishlist'
            )}
          </Text>
        </TouchableOpacity> */}
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
  removeButton: {
    color: 'lightcoral',
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
  addToWishlistButton: {
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
