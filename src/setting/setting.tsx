import { Button, View, StyleSheet, Text, Switch } from 'react-native';
import ScreenTitle from '../helper/title';
import Storage from '../helper/Storage';
import { useTheme } from '../store/ThemeProvider-Context';

const Setting = () => {
  const { toggleTheme, isDarkMode, backgroundColor ,textColor} = useTheme();

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <View style={styles.switchContainer}>
        <Text style = {{color:textColor}}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
        />
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

