import {View, Text, TextInput, Button, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const [userName, setUserName] = useState('');
  const [inputText, setInputText] = useState('');

  const handleTextInput = (text: string) => {
    setInputText(text);
  };

  const handleSubmit = () => {
    setUserName(inputText);
    AsyncStorage.setItem('userName', inputText);
  };
  //AsyncStorage.removeItem('userName');

  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');
        if (storedName !== null) {
          setUserName(storedName);
        } else {
          setInputText('');
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      {userName ? (
        <Text style={{color: 'black'}}>Hey {userName}</Text>
      ) : (
        <>
          <TextInput
            placeholder="Enter your name"
            onChangeText={handleTextInput}
            value={inputText}
          />
          <Button onPress={handleSubmit} title="Submit" />
        </>
      )}
    </View>
  );
};

export default Home;
