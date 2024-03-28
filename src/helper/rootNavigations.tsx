import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login, {RootStackParamList} from '../login/login';
import TabScreen from '../tabScreen';
import {WishlistProvider} from '../wishlist/WishlistContext';
import {CartProvider} from '../cart/CartContext';
// import {useLogin} from './loginUser';
import {useLoginContext} from '../store/UserNameContext';
const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigations = () => {
  const {userName} = useLoginContext();

  return (
    <NavigationContainer>
      <WishlistProvider>
        <CartProvider>
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
        </CartProvider>
      </WishlistProvider>
    </NavigationContainer>
  );
};

export default RootNavigations;
