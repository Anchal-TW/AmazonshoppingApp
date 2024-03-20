import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import React, { useEffect, useState } from 'react';
import Storage from '../helper/Storage';
import Screen from '../helper/view';
import ScreenTitle from '../helper/title';
import { useTheme } from '../store/ThemeProvider-Context';


const Home = () => {
  const { backgroundColor } = useTheme();

  const [userName, setUserName] = useState('');
  const [inputText, setInputText] = useState('');

  const handleTextInput = (text: string) => {
    setInputText(text);
  };

  //Storage.removeItem('userName');

  const registerName = () => {
    return (
      <Screen>
        <>
          <TextInput
            placeholder="Enter your name"
            onChangeText={handleTextInput}
            value={inputText}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </>
      </Screen>
    );
  };

  const handleSubmit = () => {
    setUserName(inputText);
    Storage.setItem('userName', inputText);
  };

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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' ,backgroundColor}}>
      {userName ? (
        <ScreenTitle>{`Hey ${userName}`}</ScreenTitle>
      ) : (
        registerName()
      )}
    </View>
  );
};

export default Home;
