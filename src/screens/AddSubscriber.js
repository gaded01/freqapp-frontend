import React, { useState } from "react";
import SafeViewAndroid from "../components/SafeViewAndroid";
import SelectDropdown from "react-native-select-dropdown";
import { useNavigation } from "@react-navigation/native";
import { ChevronDownIcon } from "react-native-heroicons/outline";
import { LinearGradient } from "expo-linear-gradient";
import Spinner from "react-native-loading-spinner-overlay";
import { REACT_APP_BASE_API_URL } from "@env";
import { ArrowLeftIcon } from "react-native-heroicons/outline";
import {
  Text,
  SafeAreaView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const plan_types = [
  { id: "1", type: "Plan 1" },
  { id: "2", type: "Plan 2" },
  { id: "3", type: "Plan 3" },
];

const AddSubscriber = () => {
	const [loading, setLoading] = useState(false);
	const navigation = useNavigation();

	const [data, setData] = useState({
		first_name: "",
		last_name: "",
		contact_number: "",
		plan_type_id: "",
	});

  	const inputHandler = (prop, value) => {
    	setData({ ...data, [prop]: value });
  	};

  	const submitRegistration = async () => {    
		let response = await AsyncStorage.getItem('@access_token');
		let config = { headers: { Authorization: `Bearer ${response}` }};
		setLoading(true);
		console.log(data)
      try {
        	const res = await axios.post(`${REACT_APP_BASE_API_URL}/subs-registration`,data,config );
			if (res.data.status !== "failed") {
				navigation.navigate("Subscription");
				alert("Registration Success");
				setData("");
			} 
			else {
				alert(res.data.message);
			}
      } 
		catch (error) {
        	console.log(error);
      }
		setLoading(false);
  	};

  	return (
		<SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
			<LinearGradient
				className="flex-1 px-5 py-5"
				colors={["rgba(246, 99, 92, 0.40) 0%", "#F6635C"]}
			>
			<ArrowLeftIcon
				onPress={() => {
					navigation.navigate("Subscription");
				}}
				color="#000"
				size="30"
			/>
			<View className="flex-row justify-between items-center my-5">
				<View className="flex-col">
					<Text className="text-3xl font-semibold">Start an</Text>
					<Text className="text-3xl font-semibold text-red-500">
						subscriber account
					</Text>
				</View>
			</View>
			<View className="flex-col items-center">
				<View className="relative mb-5 w-full">
					<Text className="absolute text-red-500 text-xs top-2 left-2 z-10">
						First Name
					</Text>
					<TextInput
						className="bg-gray-200 rounded-md px-2 pb-2 pt-5"
						onChangeText={(first_name) =>
							inputHandler("first_name", first_name)
						}
						value={data.first_name}
						placeholder="Enter first name"
					/>
				</View>
				<View className="relative mb-5 w-full">
					<Text className="absolute text-red-500 text-xs top-2 left-2 z-10">
					Last Name
					</Text>
					<TextInput
						className="bg-gray-200 rounded-md px-2 pb-2 pt-5"
						onChangeText={(last_name) => inputHandler("last_name", last_name)}
						value={data.last_name}
						placeholder="Enter last name"
					/>
				</View>
				<View className="relative mb-5 w-full">
					<Text className="absolute text-red-500 text-xs top-2 left-2 z-10">
						Contact Number
					</Text>
					<TextInput
						className="bg-gray-200 rounded-md px-2 pb-2 pt-5"
						onChangeText={(contact_number) =>
							inputHandler("contact_number", contact_number)
						}
						value={data.contact_number}
						placeholder="Enter contact number"
					/>
				</View>
				<View className="relative mb-5">
					<Text className="absolute text-red-500 text-xs top-2 left-2 z-10">
					Type of Plan
					</Text>
					<SelectDropdown
						buttonStyle={{
							backgroundColor: "#e5e7eb",
							width: "100%",
							borderRadius: 5,
							height: "37%",
						}}
						buttonTextStyle={{
							color: "#9ca3af",
							textAlign: "left",
							fontSize: 14,
							marginLeft: 0,
							marginTop: 10,
						}}
						defaultButtonText={"Select plan type"}
						data={plan_types}
						onSelect={(selectedItem, index) => {
							setData({ ...data, plan_type_id: selectedItem.id });
						}}
						buttonTextAfterSelection={(selectedType, index) => {
							return selectedType.type;
						}}
						renderDropdownIcon={() => {
							return (
								<ChevronDownIcon className="shadow-md " color="#F6635C" />
							);
						}}
						rowTextForSelection={(planTypes, index) => {
							return planTypes.type;
						}}
					/>
				</View>
				<TouchableOpacity
					className="bg-white mt-4 rounded-md h-12 w-full absolute bottom-12"
					onPress={submitRegistration}
				>
					<Text className="text-red-500 text-base pt-3 font-bold text-center">
						Register
					</Text>
				</TouchableOpacity>
			</View>
			</LinearGradient>
			<Spinner visible={loading} />
		</SafeAreaView>
  );
};

export default AddSubscriber;
