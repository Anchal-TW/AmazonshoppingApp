import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
// TODO : remove unused code
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
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
  //Storage.removeItem('userName');

  return (
    <View style={styles.loginScreen}>
      <TextInput
        placeholder="Enter your name"
        onChangeText={handleTextInput}
        value={inputText}
        style={styles.input}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  loginScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'whitesmoke',
  },
  input: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    width: '60%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'dodgerblue',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Login;
