import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image} from 'react-native';
import Cart from './cart/cart';
import Home from './home/home';
import Setting from './setting/setting';
import Wishlist from './wishlist/wishlist';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: 'aliceblue',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            const item = {
              name: 'https://cdn-icons-png.freepik.com/256/263/263115.png',
              isFocus: focused,
            };
            return SetIcon(item);
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: ({focused}) => {
            const item = {
              name: 'https://cdn-icons-png.freepik.com/256/1077/1077035.png?ga=GA1.1.334955396.1710843703&',
              isFocus: focused,
            };
            return SetIcon(item);
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => {
            const item = {
              name: 'https://cdn-icons-png.freepik.com/256/1170/1170678.png?ga=GA1.1.334955396.1710843703&',
              isFocus: focused,
            };
            return SetIcon(item);
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({focused}) => {
            const item = {
              name: 'https://cdn-icons-png.freepik.com/256/3524/3524636.png?ga=GA1.1.334955396.1710843703&',
              isFocus: focused,
            };
            return SetIcon(item);
          },
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};

const SetIcon = (prop: any) => {
  const {name, isFocus} = prop;
  return (
    <Image
      style={{tintColor: isFocus ? 'black' : 'gray'}}
      source={{
        uri: name,
        height: 20,
        width: 20,
      }}></Image>
  );
};

export default TabScreen;
