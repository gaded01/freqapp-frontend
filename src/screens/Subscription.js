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

const Subscription = () => {
  const navigation = useNavigation();
  const [subscribers, setSubcribers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      let response = await AsyncStorage.getItem("@access_token");
      let config = { headers: { Authorization: `Bearer ${response}` } };
      setLoading(true);
      await axios
        .get(`${REACT_APP_BASE_API_URL}/get-subscribers`, config)
        .then((res) => {
          setSubcribers(() => res.data);
        });
      setLoading(false);
    })();
  }, []);

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <LinearGradient
        className=" flex-1 py-5 px-5"
        colors={["rgba(246, 99, 92, 0.40) 0%", "#F6635C"]}
      >
        <ArrowLeftIcon
          onPress={() => {
            navigation.goBack();
          }}
          color="#000"
          size="30"
        />
        <View className="flex-row justify-between items-center my-5">
          <Text className="text-3xl font-semibold">Subscriber</Text>
          <TouchableOpacity
            className="bg-red-500 p-2 rounded-full"
            onPress={() => {
              navigation.navigate("AddSubscriber");
            }}
          >
            <PlusIcon color="#fff" size="25" />
          </TouchableOpacity>
        </View>
        <View>
          <View className="bg-white shadow-lg rounded-lg px-5 py-5 h-auto mb-32">
            <ScrollView
              vertical
              contentContainerStyle={{
                paddingVertical: 0,
                flexGrow: 1,
              }}
              showsHorizontalScrollIndicator={false}
              className="pt-4"
            >
              {subscribers != 0
                ? subscribers.map((subscriber, i) => {
                    return (
                      <View
                        className="flex-row items-center border-b border-gray-200 py-5"
                        key={i}
                      >
                        <Image
                          source={require("../../assets/user.png")}
                          className="h-12 w-12"
                        />
                        <View className="flex justify-center ml-5">
                          <Text className="font-bold text-base">{`${subscriber.user_subscriber.first_name} ${subscriber.user_subscriber.last_name}`}</Text>
                          <Text className="text-sm">
                            {subscriber.user_subscriber.contact_number}
                          </Text>
                        </View>
                      </View>
                    );
                  })
                : null}
            </ScrollView>
          </View>
        </View>
      </LinearGradient>
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default Subscription;
