import React, { useEffect, useState, useCallback, useRef } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import SafeViewAndroid from "../components/SafeViewAndroid";
// import Header from "../components/Header";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  ArrowLeftIcon,
  PaperAirplaneIcon,
} from "react-native-heroicons/outline";
import Spinner from "react-native-loading-spinner-overlay";
import { REACT_APP_BASE_API_URL } from "@env";
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useBillStatusContext } from "../context/BillStatusContext";
import Message from "../components/Message";
import { theme } from "../components/theme";
import { userCurrentUserContext } from "../context/CurrentUserContext";


const CustomerSupport = () => {
  const navigation = useNavigation();
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userId } = userCurrentUserContext();
  const [newData, setNewData] = useState(false);

  const user = useRef(userId);
  const scrollView = useRef();
  const [messages, setMessages] = useState([]); 
  const [faqs, setFaqs] = useState([]); 
  const [reply, setReply] = useState();

  const sentReply = async () => {
      let response = await AsyncStorage.getItem("@access_token");
      let config = { headers: { Authorization: `Bearer ${response}` } };
      setLoading(true);
      await axios
        .post(`${REACT_APP_BASE_API_URL}/save-message`, {message : reply} , config)
        .then((res) => {
          setMessages((messages) => [
            ...messages,
            {
              user_id: res.data.message.user_id,
              formatted_time: res.data.message.formatted_time,
              message: res.data.message.message,
            },
          ]);
          setReply("");
        })
        .catch((err) => {
          console.log('err', err)
        });
      setLoading(false);
    
  };

  const selectFaq = async (question, answer) => {
    
    let response = await AsyncStorage.getItem("@access_token");
    let config = { headers: { Authorization: `Bearer ${response}` } };
    setLoading(true);
    await axios
      .post(`${REACT_APP_BASE_API_URL}/save-faq`, {question : question, answer: answer} , config)
      .then((res) => {
        setMessages((messages) => [
          ...messages,
          {
            user_id: res.data.answer.user_id,
            formatted_time: res.data.answer.formatted_time,
            message: res.data.answer.message,
          },
        ]);
        setReply("");
      })
      .catch((err) => {
        console.log('err', err)
      });
    setLoading(false);
  
};


  useEffect(() => {
     (async () => { 
       let response = await AsyncStorage.getItem("@access_token");
       let config = { headers: { Authorization: `Bearer ${response}` } };
       setLoading(true);
       await axios
         .post(`${REACT_APP_BASE_API_URL}/get-messages`, {} , config)
         .then((res) => {
          setMessages(res.data.convo_message);
          setFaqs(res.data.faq);
          console.log('message', res.data)
         })
         .catch((err) => {
           console.log('err', err)
         });
       setLoading(false);
     })();
  }, [messages.message]);
  
  
  return (
    <SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
      <View className="bg-red-500 flex-1">
        <View className="flex-row justify-start items-center my-6 px-5 bg-red-500">
          <ArrowLeftIcon
            onPress={() => {
              navigation.goBack();
            }}
            color="#fff"
            size="20"
          />
          <Text className="text-white text-base font-semibold ml-10">
            Customer Support
          </Text>
        </View>
        <View className="bg-white shadow-black shadow-xl h-screen mb-32 px-0 ">
          <View className="border-b border-gray-400 py-4 px-5">
            <Text className="text-xs text-gray-500">
              You are chatting with the{" "}
              <Text className="text-xs text-red-500 font-semibold">
                Support Team
              </Text>
            </Text>
          </View>
          <View className="h-full mx-3 pb-10">
            <View className="h-4/5 py-5">
              <ScrollView
                contentContainerStyle={{
                  paddingBottom: 0,
                  flexGrow: 1,
                  overflow: "hidden",
                }}
                ref={(ref) => (scrollView.current = ref)}
                onContentSizeChange={() => {
                  scrollView.current.scrollToEnd({ animated: true });
                }}
              >
                {messages.length? 
                    messages.map((message, index) => (
                    <Message
                      key={index}
                      time={message.formatted_time}
                      isLeft={message.user_id !== user.current}
                      message={message.message}
                    />
                  ))
                  : null
              }
                <View className="border-t border-gray-300 py-5">
                  <Text className="ml-3 text-gray-400 text-base font-semibold">Select a frequently ask question</Text>
                  {faqs.map((faq, index) => (

                    <TouchableOpacity key={index} style={[styles.container]} onPress={()=> selectFaq(faq.question, faq.answer)}>
                      <Text style={[styles.messageContainer]}>{faq.question}</Text>
                    </TouchableOpacity>
                  ))}
                  
                </View>
            
              </ScrollView>
            </View>
            <View className="flex-row items-center justify-between bg-white absolute border w-full px-3 py-1 rounded-md border-gray-300 bottom-40">
              <TextInput
                className="text-xs rounded-md p-1 w-5/6"
                value={reply}
                onChangeText={setReply}
                placeholder="Write your message"
              />
              <TouchableOpacity onPress={sentReply}>
                <PaperAirplaneIcon color="#F6635C" size="20" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      {/* </LinearGradient> */}
      <Spinner visible={loading} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginVertical: 5,
  },
  messageContainer: {
    backgroundColor: theme.colors.messageBackground,
    maxWidth: "80%",
    alignSelf: "flex-start",
    flexDirection: "row",
    borderRadius: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    paddingTop: 8,
    color: "white",
    paddingBottom: 10,
  },
  messageView: {
    backgroundColor: "transparent",
    maxWidth: "80%",
  },
  timeView: {
    backgroundColor: "transparent",
    justifyContent: "flex-start",
    paddingRight: 15,
  },
  message: {
    color: "white",
    backgroundColor : theme.colors.messageBackground,
    alignSelf: "flex-start",
    fontSize: 15,
  },
  time: {
    color: "darkgray",
    alignSelf: "flex-end",
    fontSize: 10,
  },
});
export default CustomerSupport;
