import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import Storage from '../helper/Storage';
import Screen from '../helper/view';
import ScreenTitle from '../helper/title';
import { useTheme } from '../store/ThemeProvider-Context';


const Home = () => {
  const { backgroundColor, textColor } = useTheme();

  const [userName, setUserName] = useState('');
  const [inputText, setInputText] = useState('');

  const handleTextInput = (text: string) => {
    setInputText(text);
  };

  Storage.removeItem('userName');

  const registerName = () => {
    return (
      <Screen>
        <>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            onChangeText={handleTextInput}
            value={inputText}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
          >
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor }}>
      {userName ? (
        <ScreenTitle color={textColor} >{`Hey ${userName}`}</ScreenTitle>
      ) : (
        registerName()
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    width:200
  },
  button: {
    backgroundColor: 'deepskyblue',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
