import React, { useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../store/ThemeProvider-Context';

interface User {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: { rate: number; count: number };
}

const Wishlist = () => {
  const { backgroundColor, textColor } = useTheme();
  const [wishlist, setWishlist] = useState<User[]>([]);

  const removeFromWishlist = (id: number) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== id);
    setWishlist(updatedWishlist);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
      }}>
      {wishlist.length === 0 ? (
        <Text style={{ color: textColor }}>No items in the wishlist</Text>
      ) : (
        <FlatList
          data={wishlist}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.price}>Price: ${item.price}</Text>
              <Text style={styles.price}>Rating: {item.rating.rate}</Text>
              <Text
                style={{ color: 'blue' }}
                onPress={() => removeFromWishlist(item.id)}>
                Remove from Wishlist
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
  },
});

export default Wishlist;
