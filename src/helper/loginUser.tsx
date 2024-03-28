import {useEffect, useState} from 'react';
import Storage from './Storage';

export const useLogin = () => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const getUserData = async () => {
      try {
        const storedName = await Storage.getItem('userName');
        if (storedName) {
          setUserName(storedName);
        }
      } catch (error) {
        console.error('Error retrieving user data:', error);
      }
    };

    getUserData();
  }, []);
  return userName;
};
