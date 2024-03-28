import React from 'react';

import BottomTabScreen from './BottomTabsScreen';
import {ThemeProvider} from './store/ThemeProviderContext';
import {LoginProvider} from './store/UserNameContext';

const TabScreen = (props: any) => {
  const {userName} = props;
  const updatedUserName =
    userName !== undefined ? userName : props?.route?.params.userName;
  return (
    <ThemeProvider>
      <LoginProvider>
        <BottomTabScreen userName1={updatedUserName} />
      </LoginProvider>
    </ThemeProvider>
  );
};

export default TabScreen;
