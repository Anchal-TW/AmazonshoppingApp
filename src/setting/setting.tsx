import { Button, View, StyleSheet } from 'react-native';
import ScreenTitle from '../helper/title';
import Screen from '../helper/view';
import Storage from '../helper/Storage';

const Setting = () => {
  const handleDisplayMode = (mode: string) => {
    Storage.setItem('DisplayMode', mode);
  };

  return (
    <View style={styles.settingsItem}>
      <ScreenTitle>{'Display Mode'}</ScreenTitle>
      <Button title='Light' onPress={() => handleDisplayMode('light')} />
      <Button title='Dark' onPress={() => handleDisplayMode('dark')} />
    </View>
  );

  
};

export default Setting;

const styles = StyleSheet.create({
  settingsItem: {
    flexDirection: 'row'
  }
}
);
