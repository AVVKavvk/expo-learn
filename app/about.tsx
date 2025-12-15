import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const about = () => {
  return (
    <View className=" bg-blue-200 justify-center items-center">
      <Text>about</Text>
      <Link href="/profile">Go to Profile</Link>
    </View>
  );
};

export default about;
