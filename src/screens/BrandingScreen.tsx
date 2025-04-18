import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, SafeAreaView, StatusBar, Dimensions } from "react-native";

interface BrandingScreenProps {
  onStartNow: () => void;
}

export default function BrandingScreen({ onStartNow }: BrandingScreenProps) {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("../../assets/images/floraFlow.png")}
        style={styles.background}
        imageStyle={styles.imageStyle}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.overlay}>
            <Text style={styles.tagline}>Your Cycle, Your Control</Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={onStartNow}
            >
              <Text style={styles.startButtonText}>Start Now</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  imageStyle: {
    width: width,
    height: height,
  },
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "20%",
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