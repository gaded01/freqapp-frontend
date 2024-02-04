import React, { useEffect, useState } from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
// import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftIcon,
  Bars3BottomRightIcon,
  PlusCircleIcon,
  PlusIcon,
} from "react-native-heroicons/outline";
import Spinner from "react-native-loading-spinner-overlay";
import { REACT_APP_BASE_API_URL } from "@env";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useBillStatusContext } from "../context/BillStatusContext";

const TransactionLog = () => {
  const navigation = useNavigation();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const { billStatus, setBillStatus } = useBillStatusContext();

  useEffect(() => {
    (async () => {
      let response = await AsyncStorage.getItem("@access_token");
      let config = { headers: { Authorization: `Bearer ${response}` } };
      setLoading(true);
      await axios
        .post(`${REACT_APP_BASE_API_URL}/get-bill`, {}, config)
        .then((res) => {
          setBills(() => res.data.bill);
          console.log("bill", res);
        })
        .catch((err) => {
          console.log("err", err);
        });
      setLoading(false);
    })();
  }, [billStatus]);

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      {/* <LinearGradient
        className=" flex-1 py-5 px-5"
        colors={["rgba(246, 99, 92, 0.40) 0%", "#F6635C"]}
      > */}

      <View className="bg-gray-50 flex-1 py-5 px-5">
        <ArrowLeftIcon
          onPress={() => {
            navigation.goBack();
          }}
          color="#000"
          size="30"
        />
        <View className="flex-row justify-between items-center my-5">
          <Text className="text-red-500 text-3xl font-semibold">
            Transaction Log
          </Text>
        </View>
        <View>
          <View className="bg-white shadow-black shadow-xl rounded-lg px-5 pb-5 h-auto mb-32">
            <ScrollView
              vertical
              contentContainerStyle={{
                paddingVertical: 0,
                flexGrow: 1,
              }}
              showsHorizontalScrollIndicator={false}
              className="pt-4"
              h
            >
              {bills != 0
                ? bills.map((bill, i) =>
                    bill.status == 2 ? (
                      <View
                        className="flex-row items-center justify-between border-b border-gray-200 py-5"
                        key={i}
                      >
                        <View className="flex justify-center">
                          <View className="flex mb-2 ">
                            <Text className="text-base">
                              Send Money via Gcash
                            </Text>
                            <Text className=" text-sm text-gray-500">
                              {`${bill.month}`}, 2023
                            </Text>
                          </View>
                        </View>
                        <View className="flex items-end">
                          <Text className="text-left text-base text-red-500 font-semibold">{`Php ${bill.amount}.00`}</Text>
                        </View>
                      </View>
                    ) : (
                      <View
                        className="flex items-center justify-center border-b py-16"
                        key={1}
                      >
                        <Text className="text-lg font-semibold text-black">
                          {" "}
                          No data found
                        </Text>
                        <Text className="text-base  text-gray-500">
                          {" "}
                          You have no previous transaction log
                        </Text>
                      </View>
                    )
                  )
                : null}
            </ScrollView>
          </View>
        </View>
      </View>

      {/* </LinearGradient> */}
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default TransactionLog;
