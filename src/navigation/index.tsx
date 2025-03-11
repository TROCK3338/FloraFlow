import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BrandingScreen from "../screens/BrandingScreen";
import UsernameScreen from "../screens/UsernameScreen";
import HomeScreen from "../screens/HomeScreen";
import CycleDayDetail from '../screens/CycleDayDetail';
import OvulationDetail from '../screens/OvulationDetail';
import AddInfo from "../screens/AddInfo";
import SymptomsLogger from "../screens/SymptomsLogger";
import BottomNav from "../components/BottomNav";

// Define navigation props
export type RootStackParamList = {
  BrandingScreen: { onStartNow: () => void };
  UsernameScreen: { setUsername: React.Dispatch<React.SetStateAction<string>> };
  HomeScreen: { username: string };
  MainApp: undefined;
  CycleDayDetail: { cycleDay: number; cyclePhase: string };
  OvulationDetail: { daysToOvulation: number; fertilitySummary: string };
  SymptomsLogger: undefined;
  AddInfo: undefined; 
};

type AppNavigatorProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator({ isLoggedIn, setIsLoggedIn }: AppNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <>
          <Stack.Screen name="MainApp" component={BottomNav} />
          <Stack.Screen name="CycleDayDetail" component={CycleDayDetail} />
          <Stack.Screen name="OvulationDetail" component={OvulationDetail} />
          <Stack.Screen name="SymptomsLogger" component={SymptomsLogger} />
          <Stack.Screen name="AddInfo" component={AddInfo} />
        </>
      ) : (
        <>
          <Stack.Screen name="BrandingScreen" component={BrandingScreen} />
          <Stack.Screen name="UsernameScreen" component={UsernameScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </>
      )}
      <Stack.Screen name="CycleDayDetail" component={CycleDayDetail} />
    </Stack.Navigator>
  );
}