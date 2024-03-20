import React from 'react';
import {StyleSheet, Text} from 'react-native';

export const ScreenTitle = ({children}: any) => (
  <Text style={styles.screenText}>{children}</Text>
);

const styles = StyleSheet.create({
  screenText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
  },
});

export default ScreenTitle;
