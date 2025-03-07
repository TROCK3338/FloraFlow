import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";
import BottomNav from "./src/components/BottomNav";
import CalendarScreen from "./src/screens/CalendarScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
// Removed unused import of NavigationAlias
// import NavigationAlias from "./src/navigation/index";

const Stack = createStackNavigator();

export default function LocalNavigation(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomNav} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}