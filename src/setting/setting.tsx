import {Button, StyleSheet, Switch, Text, TextInput, View} from 'react-native';
import {useTheme} from '../store/ThemeProviderContext';
import React, {useState} from 'react';
import {useLoginContext} from '../store/UserNameContext';

const Setting = () => {
  const {toggleTheme, isDarkMode, backgroundColor, textColor} = useTheme();
  const {userName, changeName} = useLoginContext();
  const [newUsername, setNewUsername] = useState(userName);

  const handleChangeName = () => {
    changeName(newUsername);
    setNewUsername('');
  };

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.switchContainer}>
        <Text style={{color: textColor, fontSize: 15}}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder={userName}
          placeholderTextColor={isDarkMode ? '#ffffff' : '#000000'} // Set placeholderTextColor conditionally
          style={[styles.input, {color: textColor}]}
          onChangeText={setNewUsername}
          value={newUsername}
        />
        <Button title="Change Name" onPress={handleChangeName} />
      </View>
    </View>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    width: '60%',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    fontSize: 16,
  },
});
