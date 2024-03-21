import React from 'react';

import BottomTabScreen from './BottomTabsScreen';
import {ThemeProvider} from './store/ThemeProvider-Context';

const TabScreen = (props: any) => {
  const {userName} = props;
  const updatedUserName =
    userName !== undefined ? userName : props?.route?.params.userName;
  return (
    <ThemeProvider>
      <BottomTabScreen userName={updatedUserName}></BottomTabScreen>
    </ThemeProvider>
  );
};

export default TabScreen;
