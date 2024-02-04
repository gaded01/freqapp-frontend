import React, { useState, useEffect } from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import Spinner from "react-native-loading-spinner-overlay";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from 'axios';
import { REACT_APP_BASE_API_URL } from "@env";

const DataConsumption = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [consumption, setConsumption] = useState([]);
  const [latest, setLatest] =  useState();

  useEffect(()=> {
    (async () => {
      let response = await AsyncStorage.getItem("@access_token");
      let config = { headers: { Authorization: `Bearer ${response}` } };
      setLoading(true);
      await axios
        .post(`${REACT_APP_BASE_API_URL}/data-consumption-v2`, {} , config)  
        .then((res) => {
          setConsumption(() => res.data.consumption);
          setLatest(res.data.latest);
          console.log('res', res.data.latest) 
        })
        .catch((err) => {
          console.log('err', err) 
        });
      setLoading(false);  
    })();
  }, [])
  

  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
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
            Data Consumption
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
              {consumption.length? <LineChart
                data={{
                  labels: consumption?.map((data)=> data.month),
                  datasets: [
                    {
                      data:  consumption?.map((data)=> data.consumption),
                    },
                  ],
                }}
                width={400} // from react-native
                height={220}
               //  yAxisLabel="$"
                yAxisSuffix="gb"
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: "#EF4444",
                  backgroundGradientFrom: "#EF4444",
                  backgroundGradientTo: "#ffa726",
                  decimalPlaces: 1, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  labelColor: (opacity = 1) =>
                    `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16,
                  },
                  propsForDots: {
                    r: "6",
                    strokeWidth: "2",
                    stroke: "#ffa726",
                  },
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 5,
                }}
              />:null}
              
              
              <View className="flex text-center items-center justify-center my-14"> 
                <Text className="text-2xl">{latest}GB</Text>
                <Text className="text-sm text-red-500">Used this month</Text>
              </View>
              <View>
                <View className="flex-row">
                  <Text className="w-1/2 text-center text-sm text-gray-500">Month</Text>
                  <Text className="w-1/2 text-center text-sm text-gray-500">Consumption</Text>
                </View>
                {consumption?.map((data)=>(
                   <View className="flex-row justify-around py-2" key={data.id}>
                    <Text className="w-1/2 text-center text-base">{data.formatted_month}</Text>
                    <Text className="w-1/2 text-center text-base text-red-500">{data.consumption}gb</Text>
                 </View>
                ))}
               
          
              
              </View>

            </ScrollView>
          </View>
        </View>
      </View>

      {/* </LinearGradient> */}
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};

export default DataConsumption;
