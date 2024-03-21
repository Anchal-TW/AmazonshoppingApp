import React, {useEffect, useState} from 'react';
import {Image, Text, View, FlatList, StyleSheet} from 'react-native';
import {useTheme} from '../store/ThemeProvider-Context';

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

  const displayItem = ({item}: {item: User}) => {
    return (
      <View style={styles.itemContainer}>
        <Image style={styles.image} source={{uri: item.image}} />
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.priceContainer}>
          <Text style={styles.dollar}>$</Text>
          <Text style={styles.price}>{item.price}</Text>
        </View>
        <Text style={styles.rating}>
          Rating: {item.rating.rate} 
        </Text>
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
    flex:1,
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'lightblue',
    padding: 10,
    textAlign:'center'
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkblue',
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 4,
    justifyContent:'center'
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
    textAlign:'center'
  },
});

export default Home;

