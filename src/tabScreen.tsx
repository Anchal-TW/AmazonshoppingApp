import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Home from './home/home';
import Wishlist from './wishlist/wishlist';
import Cart from './cart/cart';
import Setting from './setting/setting';
import { ThemeProvider } from './store/ThemeProvider-Context';

const Tab = createBottomTabNavigator();

const TabScreen = () => {
  return (
    <ThemeProvider>
      <NavigationContainer>
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
              tabBarIcon: ({ focused }) => {
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
              tabBarIcon: ({ focused }) => {
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
              tabBarIcon: ({ focused }) => {
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
              tabBarIcon: ({ focused }) => {
                const item = {
                  name: 'https://cdn-icons-png.freepik.com/256/3524/3524636.png?ga=GA1.1.334955396.1710843703&',
                  isFocus: focused,
                };
                return SetIcon(item);
              },
            }}></Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
};

const SetIcon = (prop: any) => {
  const { name, isFocus } = prop;
  return (
    <Image
      style={{ tintColor: isFocus ? 'black' : 'gray' }}
      source={{
        uri: name,
        height: 20,
        width: 20,
      }}></Image>
  );
};

export default TabScreen;
export const App = () => {
  return <TabScreen />;
};
