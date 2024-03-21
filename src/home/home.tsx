import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import {useTheme} from '../store/ThemeProvider-Context';

interface User {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
}
const Home = () => {
  const {backgroundColor, textColor} = useTheme();
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

  return (
    <ScrollView
      style={{
        backgroundColor,
      }}>
      {items.map(item => {
        return (
          <View style={{padding: 16}}>
            <Text style={{backgroundColor: 'blanchedalmond'}}>
              id: {item.id}
            </Text>
            <Text>title: {item.title}</Text>
            <Text>price: {item.price}</Text>
            <Image
              style={{
                width: 51,
                height: 51,
                resizeMode: 'contain',
              }}
              source={{uri: item.image}}></Image>
          </View>
        );
      })}
    </ScrollView>
  );
};

export default Home;
