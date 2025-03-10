import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BrandingScreen from "../screens/BrandingScreen";
import UsernameScreen from "../screens/UsernameScreen";
import HomeScreen from "../screens/HomeScreen";
import BottomNav from "../components/BottomNav";

// Define navigation props
type RootStackParamList = {
  BrandingScreen: { onStartNow: () => void };
  UsernameScreen: { setUsername: React.Dispatch<React.SetStateAction<string>> };
  HomeScreen: { username: string };
  MainApp: undefined;
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
        <Stack.Screen name="MainApp" component={BottomNav} />
      ) : (
        <>
          {/* Pass onStartNow prop to BrandingScreen */}
          <Stack.Screen name="BrandingScreen">
            {(props) => <BrandingScreen {...props} onStartNow={() => {}} />}
          </Stack.Screen>

          {/* Pass setUsername prop to UsernameScreen */}
          <Stack.Screen name="UsernameScreen">
            {(props) => <UsernameScreen {...props} setIsLoggedIn={setIsLoggedIn} setUsername={() => {}} />}
          </Stack.Screen>

          {/* Pass username prop to HomeScreen */}
          <Stack.Screen name="HomeScreen">
            {(props) => <HomeScreen {...props} username="Guest" />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
}