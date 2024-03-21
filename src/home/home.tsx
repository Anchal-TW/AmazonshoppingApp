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
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.rating}>
          Rating: {item.rating.rate} ({item.rating.count} reviews)
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
    padding: 10, // Adjust background color as needed
  },
  itemContainer: {
    flex: 1,
    padding: 10,
    margin: 10,
    borderRadius: 20,
    backgroundColor: 'white', // Adjust background color as needed
  },
  image: {
    width: '100%',
    height: 160,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
  },
  price: {
    fontSize: 14,
    marginTop: 4,
  },
  rating: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default Home;

// import React, {useEffect, useState} from 'react';
// import {Image, ScrollView, Text, View, FlatList} from 'react-native';
// import {useTheme} from '../store/ThemeProvider-Context';

// interface User {
//   id: number;
//   title: string;
//   price: string;
//   category: string;
//   description: string;
//   image: string;
// }
// const Home = () => {
//   const {backgroundColor, textColor} = useTheme();
//   const [items, setItems] = useState<User[]>([]);

//   const getListItem = async () => {
//     const url = 'https://fakestoreapi.com/products';
//     fetch(url)
//       .then(resp => resp.json())
//       .then(json => {
//         setItems(json);
//       })
//       .catch(error => console.error(error));
//   };

//   useEffect(() => {
//     getListItem();
//   }, []);

//   const displayItem = (itemData : any) => {
//     return (
//             <View style={{flex:1,padding: 16}}>
//               {/* <Text style={{backgroundColor: 'blanchedalmond'}}>
//                 id: {itemData.id}
//               </Text> */}
//               <Text>title: {itemData.title}</Text>
//               <Text>price: {itemData.price}</Text>
//               <Image
//                 style={{
//                   width: 51,
//                   height: 51,
//                   resizeMode: 'contain',
//                 }}
//                 source={{uri: itemData.image}}></Image>
//             </View>
//           );
//   }

//   return (
//     <FlatList
//       data={items}
//       keyExtractor={(item) => String(item.id)}
//       renderItem={displayItem}
//       numColumns={2}/>
//     // <ScrollView
//     //   style={{
//     //     backgroundColor,
//     //   }}>
//     //   {items.map(item => {
//     //     return (
//     //       <View style={{padding: 16}}>
//     //         <Text style={{backgroundColor: 'blanchedalmond'}}>
//     //           id: {item.id}
//     //         </Text>
//     //         <Text>title: {item.title}</Text>
//     //         <Text>price: {item.price}</Text>
//     //         <Image
//     //           style={{
//     //             width: 51,
//     //             height: 51,
//     //             resizeMode: 'contain',
//     //           }}
//     //           source={{uri: item.image}}></Image>
//     //       </View>
//     //     );
//     //   })}
//     // </ScrollView>
//   );
// };

// export default Home;
