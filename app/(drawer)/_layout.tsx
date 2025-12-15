import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Drawer } from "expo-router/drawer";
import React from "react";
const TabRootLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: () => {
            return <FontAwesome name="home" size={28} />;
          },
        }}
      />
      <Drawer.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: () => {
            return <AntDesign name="contacts" size={28} />;
          },
        }}
      />
      <Drawer.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: () => {
            return <FontAwesome name="user" size={28} />;
          },
        }}
      />
    </Drawer>
  );
};

export default TabRootLayout;
