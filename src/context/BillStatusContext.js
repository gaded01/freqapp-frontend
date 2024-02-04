import {useContext , createContext} from 'react';

export const BillStatusContext = createContext({
   billStatus: '',
   setBillStatus: () => {}
}) 

export const useBillStatusContext = () => useContext(BillStatusContext);