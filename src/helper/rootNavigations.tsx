import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import Login, {RootStackParamList} from '../login/login';
import TabScreen from '../tabScreen';
import Storage from './Storage';
import {WishlistProvider} from '../wishlist/WishlistContext';
import {useLogin} from './loginUser';
const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigations = () => {
  const userName = useLogin();

  return (
    <NavigationContainer>
      <WishlistProvider>
        {userName ? (
          <TabScreen userName={userName} />
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen
              options={{headerShown: false}}
              name="TabScreen"
              component={TabScreen}
            />
          </Stack.Navigator>
        )}
      </WishlistProvider>
    </NavigationContainer>
  );
};

export default RootNavigations;
