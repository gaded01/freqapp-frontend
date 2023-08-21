import React, {useEffect} from "react";
import { useNavigation } from '@react-navigation/native';

const Logout = () => {
const navigation = useNavigation();
  useEffect(() => {
    const out = async () => {
    navigation.navigate("Login")
    };
    out();
  }, []);
  return (
    <></>
  )
};

export default Logout;
