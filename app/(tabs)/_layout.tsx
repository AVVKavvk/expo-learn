import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
const TabRootLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="home" size={28} />;
          },
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: () => {
            return <AntDesign name="contacts" size={28} />;
          },
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => {
            return <FontAwesome name="user" size={28} />;
          },
        }}
      />
    </Tabs>
  );
};

export default TabRootLayout;
