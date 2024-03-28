// TODO : JSX / TSX need REACT IMPORT !!!!

import {StyleSheet, Switch, Text, View} from 'react-native';
import {useTheme} from '../store/ThemeProviderContext';

const Setting = () => {
  const {toggleTheme, isDarkMode, backgroundColor, textColor} = useTheme();

  return (
    <View style={[styles.container, {backgroundColor}]}>
      <View style={styles.switchContainer}>
        <Text style={{color: textColor}}>Dark Mode</Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
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
  },
});
