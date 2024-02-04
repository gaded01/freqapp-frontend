import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import {
  FlingGestureHandler,
  Directions,
  State,
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
import Animated, {
  withSpring,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  useSharedValue,
} from "react-native-reanimated";

import { theme } from "./theme";

const Message = ({ time, isLeft, message, onSwipe }) => {
  const startingPosition = 0;
  const x = useSharedValue(startingPosition); 
  
  const isOnLeft = (type) => {
    if (isLeft && type === "messageContainer") {
      return {
        alignSelf: "flex-start",
        backgroundColor: "#f0f0f0",
        borderTopLeftRadius: 0,
      };
    } else if (isLeft && type === "message") {
      return {
        color: "#000",
      };
    } else if (isLeft && type === "time") {
      return {
        color: "darkgray",
      };
    } else if (isLeft && type === "timeContainer") {
      return {
        alignSelf: "flex-start",
        paddingLeft: 15,
        borderTopLeftRadius: 0,
    };
    } else {
      return {
        borderTopRightRadius: 0,
      };
    }
  };

  const eventHandler = useAnimatedGestureHandler({
    onStart: (event, ctx) => {},
    onActive: (event, ctx) => {
      x.value = isLeft ? 50 : -50;
    },
    onEnd: (event, ctx) => {
      x.value = withSpring(startingPosition);
    },
  });

  const uas = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: x.value }],
    };
  });

  return (
    <GestureHandlerRootView>
      <FlingGestureHandler
        direction={isLeft ? Directions.RIGHT : Directions.LEFT}
        onGestureEvent={eventHandler}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            onSwipe(message, isLeft);
          }
        }}
      >
        <Animated.View style={[styles.container, uas]}>
          <View
            className=""
            style={[styles.messageContainer, isOnLeft("messageContainer")]}
          >
            <View style={styles.messageView}>
              <Text style={[styles.message, isOnLeft("message")]}>
                {message}
              </Text>
            </View>
          </View>
          <View style={[styles.timeView, isOnLeft("timeContainer")]}>
              <Text style={[styles.time, isOnLeft("time")]}>{time}</Text>
          </View>
        </Animated.View>
      </FlingGestureHandler>
    </GestureHandlerRootView>
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
    alignSelf: "flex-end",
    flexDirection: "row",
    borderRadius: 15,
    paddingHorizontal: 20,
    marginHorizontal: 10,
    paddingTop: 8,
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
    alignSelf: "flex-start",
    fontSize: 15,
  },
  time: {
    color: "darkgray",
    alignSelf: "flex-end",
    fontSize: 10,
  },
});

export default Message;
