import React, { useState } from "react";
import { View } from "react-native";
import BrandingScreen from "../src/screens/BrandingScreen";
import UsernameScreen from "../src/screens/UsernameScreen";
import BottomNav from "../src/components/BottomNav";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState(""); // Track the username state
  const [showBranding, setShowBranding] = useState(true);

  const handleStartNow = () => {
    setShowBranding(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {showBranding ? (
        <BrandingScreen onStartNow={handleStartNow} />
      ) : isLoggedIn ? (
        <BottomNav />
      ) : (
        <UsernameScreen setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
      )}
    </View>
  );
}