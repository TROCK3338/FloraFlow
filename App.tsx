import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppNavigator from "./src/navigation/index"; // Ensure correct path

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Default to false

  return (
    <NavigationContainer>
      <AppNavigator isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </NavigationContainer>
  );
}
