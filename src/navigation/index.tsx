import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomNav from "../components/BottomNav";
import NavigationAliasFromApp from "@/App"; // renamed the import

const Stack = createStackNavigator();

export default function LocalNavigation() { // renamed the local function
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Main" component={BottomNav} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}