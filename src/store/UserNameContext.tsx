import React, {createContext, useState, useContext, useEffect} from 'react';
import Storage from '../helper/Storage';

type LoginType = {
  userName: string;
  loginName: (userName: string) => void;
  changeName: (userName: string) => void;
};

const LoginContext = createContext<LoginType>({
  userName: '',
  loginName: function (): void {},
  changeName: function (): void {},
});

export const useLoginContext = () => {
  return useContext(LoginContext);
};

export const LoginProvider = ({children}: any) => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    async function getStoredUserName() {
      const storedUserName = await Storage.getItem('userName');
      if (storedUserName) {
        setUserName(storedUserName);
      }
    }
    getStoredUserName();
  }, []);

  const loginName = (userName: any) => {
    setUserName(userName);
    Storage.setItem('userName', userName);
  };

  const changeName = (newUsername: any) => {
    setUserName(newUsername);
    Storage.setItem('userName', newUsername);
  };

  const Login = {
    userName: userName,
    loginName,
    changeName,
  };

  return (
    <LoginContext.Provider value={Login}>{children}</LoginContext.Provider>
  );
};
