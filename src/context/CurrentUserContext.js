import {useContext , createContext} from 'react';

export const CurrentUserContext = createContext({
   userId: '',
   setUser: () => {}
}) 

export const userCurrentUserContext = () => useContext(CurrentUserContext);