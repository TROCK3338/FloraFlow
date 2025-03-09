import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";

interface BrandingScreenProps {
  onStartNow: () => void; // Callback to handle "Start Now" action
}

export default function BrandingScreen({ onStartNow }: BrandingScreenProps) {
  return (
    <ImageBackground 
      source={require("../../assets/images/floraFlow.png")} 
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.tagline}>Your Cycle, Your Control</Text>
        <TouchableOpacity 
          style={styles.startButton} 
          onPress={onStartNow} // Call the handler to change screen
        >
          <Text style={styles.startButtonText}>Start Now</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    position: "absolute",
    bottom: "20%", // Adjust this for better alignment
    alignItems: "center",
    width: "80%",
  },
  tagline: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  startButton: {
    backgroundColor: "#FF6B81",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});