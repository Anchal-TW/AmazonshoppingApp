import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Image, Text, View} from 'react-native';
import Cart from './cart/cart';
import {useLogin} from './helper/loginUser';
import Home from './home/home';
import Setting from './setting/setting';
import {useTheme} from './store/ThemeProviderContext';
import Wishlist from './wishlist/wishlist';
import {useLoginContext} from './store/UserNameContext';

const Tab = createBottomTabNavigator();

const BottomTabScreen = (props: any) => {
  const {backgroundColor, textColor, isDarkMode} = useTheme();
  const {userName1} = props;
  const {userName} = useLoginContext();

  console.log('user', userName);

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
              {userName ? `Hey ${userName}!` : 'Loading...'}
            </Text>
          </View>
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        initialParams={{userName1}}
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
      style={[{tintColor: tintColor}]}
      source={{
        uri: name,
        height: 25,
        width: 25,
      }}
    />
  );
};

export default BottomTabScreen;
