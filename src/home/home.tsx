import React from 'react';
import {Text, View} from 'react-native';
import ScreenTitle from '../helper/title';
import {useTheme} from '../store/ThemeProvider-Context';

const Home = (prop: any) => {
  const {backgroundColor, textColor} = useTheme();
  const {userName} = prop;

 

  const displayUserName =
    userName !== undefined ? userName : prop?.route?.params.userName;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor,
      }}>
      
    </View>
  );
};

export default Home;
