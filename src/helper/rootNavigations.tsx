import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect, useState} from 'react';
import Login, {RootStackParamList} from '../login/login';
import TabScreen from '../tabScreen';
import Storage from './Storage';

const Stack = createNativeStackNavigator<RootStackParamList>();
const RootNavigations = () => {
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
    </NavigationContainer>
  );
};

export default RootNavigations;
