import React from 'react';
import RootNavigations from './src/helper/rootNavigations';
import {LoginProvider} from './src/store/UserNameContext';

const App = () => {
  return (
    <LoginProvider>
      <RootNavigations />
    </LoginProvider>
  );
};

export default App;
