import React from "react";
import { View } from "react-native";
import BottomNav from "../src/components/BottomNav"; // Adjust the path if needed

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <BottomNav />
    </View>
  );
}