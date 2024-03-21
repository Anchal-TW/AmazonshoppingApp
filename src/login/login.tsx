import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';
import Storage from '../helper/Storage';

export type RootStackParamList = {
  Login: undefined;
  TabScreen: {userName: string};
};

type LoginScreenProp = NativeStackScreenProps<RootStackParamList, 'Login'>;
const Login = ({navigation}: LoginScreenProp) => {
  const [inputText, setInputText] = useState('');

  const handleTextInput = (text: string) => {
    setInputText(text);
  };

  const handleSubmit = () => {
    Storage.setItem('userName', inputText);
    navigation.replace('TabScreen', {userName: inputText});
  };

  return (
    <View style={styles.loginScreen}>
      <TextInput
        placeholder="Enter your name"
        onChangeText={handleTextInput}
        value={inputText}
      />
      <Button onPress={handleSubmit} title="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'aliceblue',
  },
});

export default Login;
