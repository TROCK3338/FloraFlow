import React, { useState } from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator, BottomTabBarButtonProps } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import CalendarScreen from "../screens/CalendarScreen";
import ProfileScreen from "../screens/ProfileScreen";

const Tab = createBottomTabNavigator();

const BottomNav = () => {
  const [selected, setSelected] = useState("Home");

  const CustomTabButton = ({
    children,
    onPress,
    screen,
  }: BottomTabBarButtonProps & { screen: string }) => (
    <Pressable
      style={[styles.navItem, selected === screen && styles.activeItem]}
      onPress={(event) => {
        setSelected(screen);
        if (onPress) onPress(event);
      }}
    >
      {children}
    </Pressable>
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.navBar,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton {...props} screen="Home">
              <View style={[styles.iconContainer, selected === "Home" && styles.activeIconContainer]}>
                <Ionicons
                  name="home"
                  size={24}
                  color={selected === "Home" ? "#D79967" : "gray"}
                />
                <Text style={[styles.text, selected === "Home" && styles.activeText]}>Home</Text>
              </View>
            </CustomTabButton>
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={CalendarScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton {...props} screen="Calendar">
              <View style={styles.iconContainer}>
                <Ionicons
                  name="calendar"
                  size={24}
                  color={selected === "Calendar" ? "#D79967" : "gray"}
                />
                <Text style={[styles.text, selected === "Calendar" && styles.activeText]}>Calendar</Text>
              </View>
            </CustomTabButton>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarButton: (props) => (
            <CustomTabButton {...props} screen="Profile">
              <View style={styles.iconContainer}>
                <Ionicons
                  name="person"
                  size={24}
                  color={selected === "Profile" ? "#D79967" : "gray"}
                />
                <Text style={[styles.text, selected === "Profile" && styles.activeText]}>Profile</Text>
              </View>
            </CustomTabButton>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  navBar: {
    backgroundColor: "#F5F5F5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    paddingBottom: 2,
    paddingTop: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activeItem: {
    borderRadius: 30,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 8,
    elevation: 5,
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  activeIconContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    padding: 10,
  },
  text: {
    fontSize: 12,
    color: "gray",
    marginTop: 5,
  },
  activeText: {
    color: "#D79967",
    fontWeight: "bold",
  },
});

export default BottomNav;