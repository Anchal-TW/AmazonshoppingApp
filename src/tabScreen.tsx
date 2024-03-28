import React from 'react';

import BottomTabScreen from './BottomTabsScreen';
import {ThemeProvider} from './store/ThemeProviderContext';

const TabScreen = (props: any) => {
  const {userName} = props;
  const updatedUserName =
    userName !== undefined ? userName : props?.route?.params.userName;
  return (
    <ThemeProvider>
      <BottomTabScreen userName={updatedUserName} />
    </ThemeProvider>
  );
};

export default TabScreen;
