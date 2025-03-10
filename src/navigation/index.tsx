import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BrandingScreen from "../screens/BrandingScreen";
import SignUpScreen from "../screens/SignUpScreen";
import UsernameScreen from "../screens/UsernameScreen";
import BottomNav from "../components/BottomNav";

type AppNavigatorProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const Stack = createStackNavigator();

export default function AppNavigator({ isLoggedIn, setIsLoggedIn }: AppNavigatorProps) {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="MainApp" component={BottomNav} />
      ) : (
        <>
          <Stack.Screen name="BrandingScreen">
            {(props) => <BrandingScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
          <Stack.Screen name="UsernameScreen">
            {(props) => <UsernameScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
            <Stack.Screen name="HomeScreen">
            {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
          </Stack.Screen>
        </>
      )}
    </Stack.Navigator>
  );
}