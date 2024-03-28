import React from 'react';

import BottomTabScreen from './BottomTabsScreen';
// TODO : ThemeProvider-Context is not the case convention followed
import {ThemeProvider} from './store/ThemeProvider-Context';

const TabScreen = (props: any) => {
  const {userName} = props;
  const updatedUserName =
    userName !== undefined ? userName : props?.route?.params.userName;
  return (
    <ThemeProvider>
      {/* TODO : Use self closing tags */}
      <BottomTabScreen userName={updatedUserName} />
    </ThemeProvider>
  );
};

export default TabScreen;
