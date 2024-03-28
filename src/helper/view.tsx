import React from 'react';
import {StyleSheet, View} from 'react-native';

export const Screen = ({children}: {children: JSX.Element}) => (
  <View style={styles.screen}>{children}</View>
);

const styles = StyleSheet.create({
  screen: {flex: 1, justifyContent: 'center', alignItems: 'center'},
});

// TODO : multiple exports for same component
export default Screen;
