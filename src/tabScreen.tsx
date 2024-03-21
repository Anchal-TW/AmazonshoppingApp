import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import React from 'react';

import {ThemeProvider, useTheme} from './store/ThemeProvider-Context';
import BottomTabScreen from './BottomTabsScreen';

const TabScreen = () => {
  return (
    <ThemeProvider>
      <BottomTabScreen></BottomTabScreen>
    </ThemeProvider>
  );
};

export default TabScreen;
