// TODO : Import react in every jsx / tsx file
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import Login, {RootStackParamList} from '../login/login';
import TabScreen from '../tabScreen';
import Storage from './Storage';
import {WishlistProvider} from '../wishlist/WishlistContext';
const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigations = () => {
  // TODO : extract login check flow into a hook
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedName = await Storage.getItem('userName');
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);
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
