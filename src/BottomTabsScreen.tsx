import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Image, Text, View} from 'react-native';
import {useTheme} from './store/ThemeProvider-Context';
import Storage from './helper/Storage';
import Home from './home/home';
import Wishlist from './wishlist/wishlist';
import Cart from './cart/cart';
import Setting from './setting/setting';

const Tab = createBottomTabNavigator();

const BottomTabScreen = (props: any) => {
  const {backgroundColor, textColor, isDarkMode} = useTheme();
  const {userName} = props;
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const usernameFromStorage = await Storage.getItem('userName');
        setUsername(usernameFromStorage);
      } catch (error) {
        console.error('Error retrieving username:', error);
      }
    };

    getUsername();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: textColor,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: backgroundColor,
        },
        headerStyle: {
          backgroundColor: backgroundColor,
        },
        headerTitleStyle: {
          color: textColor,
        },
        headerRight: () => (
          <View style={{marginRight: 20, backgroundColor: backgroundColor}}>
            <Text style={{color: textColor}}>
              {username ? `Hey ${username}!` : 'Loading...'}
            </Text>
          </View>
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{userName}}
        options={{
          tabBarIcon: ({focused}) => {
            const item = {
              name: 'https://cdn-icons-png.freepik.com/256/263/263115.png',
              isFocus: focused,
              isDark: isDarkMode,
            };
            return SetIcon(item);
          },
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: ({focused}) => {
            const item = {
              name: 'https://cdn-icons-png.freepik.com/256/1077/1077035.png?ga=GA1.1.334955396.1710843703&',
              isFocus: focused,
              isDark: isDarkMode,
            };
            return SetIcon(item);
          },
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({focused}) => {
            const item = {
              name: 'https://cdn-icons-png.freepik.com/256/1170/1170678.png?ga=GA1.1.334955396.1710843703&',
              isFocus: focused,
              isDark: isDarkMode,
            };
            return SetIcon(item);
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Setting}
        options={{
          tabBarIcon: ({focused}) => {
            const item = {
              name: 'https://cdn-icons-png.freepik.com/256/3524/3524636.png?ga=GA1.1.334955396.1710843703&',
              isFocus: focused,
              isDark: isDarkMode,
            };
            return SetIcon(item);
          },
        }}
      />
    </Tab.Navigator>
  );
};

const SetIcon = (prop: any) => {
  const {name, isDark, isFocus} = prop;

  let tintColor = isFocus && isDark ? 'white' : 'gray';

  return (
    <Image
      style={{tintColor: isFocus ? 'black' : 'gray'}}
      source={{
        uri: name,
        height: 20,
        width: 20,
      }}
    />
  );
};

export default BottomTabScreen;
