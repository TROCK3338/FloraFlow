import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Screens
import BrandingScreen from "../screens/BrandingScreen";
import UsernameScreen from "../screens/UsernameScreen";
import HomeScreen from "../screens/HomeScreen";
import BottomNav from "../components/BottomNav";

// Onboarding Screens
import CycleRegularityScreen from "../screens/Onboarding/CycleRegularityScreen";
import SymptomsScreen from "../screens/Onboarding/SymptomsScreen";
import HealthDisordersScreen from "../screens/Onboarding/HealthDisordersScreen";
import PeriodLoggingScreen from "../screens/Onboarding/PeriodLoggingScreen";
import CompletionScreen from "../screens/Onboarding/CompletionScreen";

// Define navigation props
export type RootStackParamList = {
  BrandingScreen: { onStartNow: () => void };
  UsernameScreen: { setUsername: React.Dispatch<React.SetStateAction<string>> };
  HomeScreen: { username: string };
  MainApp: undefined;
  CycleRegularityScreen: undefined;
  SymptomsScreen: undefined;
  HealthDisordersScreen: undefined;
  PeriodLoggingScreen: undefined;
  CompletionScreen: undefined;
};

type AppNavigatorProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator({ isLoggedIn, setIsLoggedIn }: AppNavigatorProps) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean | null>(null);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const status = await AsyncStorage.getItem("hasCompletedOnboarding");
      setHasCompletedOnboarding(status === "true");
    };
    checkOnboardingStatus();
  }, []);

  if (hasCompletedOnboarding === null) return null; // Prevent flicker while checking onboarding status

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        hasCompletedOnboarding ? (
          <Stack.Screen name="MainApp" component={BottomNav} />
        ) : (
          <>
            <Stack.Screen name="CycleRegularityScreen" component={CycleRegularityScreen} />
            <Stack.Screen name="SymptomsScreen" component={SymptomsScreen} />
            <Stack.Screen name="HealthDisordersScreen" component={HealthDisordersScreen} />
            <Stack.Screen name="PeriodLoggingScreen" component={PeriodLoggingScreen} />
            <Stack.Screen 
              name="CompletionScreen" 
              component={CompletionScreen} 
              options={{ gestureEnabled: false }} 
            />
          </>
        )
      ) : (
        <>
          <Stack.Screen name="BrandingScreen" component={BrandingScreen} />
          <Stack.Screen name="UsernameScreen" component={UsernameScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
}