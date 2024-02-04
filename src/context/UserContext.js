import {useContext , createContext} from 'react';

export const UserContext = createContext({
   user: '',
   setUserMain: () => {}
}) 

export const useUserContext = () => useContext(UserContext);