// src/screens/UsernameScreen.tsx
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Import your local image
// Adjust the path based on your project structure
import avatarImage from "../../assets/images/avatar.png";

interface UsernameScreenProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

const UsernameScreen: React.FC<UsernameScreenProps> = ({ setIsLoggedIn, setUsername }) => {
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleContinue = () => {
    if (inputValue.trim().length > 0) {
      setUsername(inputValue); // Update the username in parent component
      setIsLoggedIn(true);    // Switch to HomeScreen
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <LinearGradient
          colors={["#FFE5F1", "#FFF0F5", "#F8F8FF"]}
          style={styles.gradient}
        >
          <View style={styles.contentContainer}>
            <Image
              source={avatarImage}
              style={styles.avatar}
              resizeMode="cover"
            />
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>What should we call you?</Text>

            <View style={styles.inputWrapper}>
              <View style={[
                styles.inputContainer,
                isFocused && styles.inputContainerFocused
              ]}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter a cute username"
                  placeholderTextColor="#BBBBBB"
                  onChangeText={(text) => setInputValue(text)}
                  value={inputValue}
                  autoCapitalize="none"
                  autoCorrect={false}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                />
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.button,
                inputValue.trim().length === 0 && styles.buttonDisabled
              ]}
              onPress={handleContinue}
              disabled={inputValue.trim().length === 0}
            >
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>

            <Text style={styles.hint}>
              This will be displayed to other users
            </Text>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
    borderWidth: 4,
    borderColor: "#FFF",
    shadowColor: "#FF9EDF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#FF6EB4",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#666",
    marginBottom: 32,
    textAlign: "center",
  },
  inputWrapper: {
    width: "100%",
    marginBottom: 24,
  },
  inputContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: "#FFD1DC",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  inputContainerFocused: {
    borderColor: "#FF6EB4",
    shadowOpacity: 0.2,
  },
  input: {
    fontSize: 16,
    color: "#333",
    width: "100%",
  },
  button: {
    backgroundColor: "#FF6EB4",
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 36,
    shadowColor: "#FF9EDF",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: "#FFB6C1",
    shadowOpacity: 0.1,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
  hint: {
    color: "#999",
    fontSize: 14,
    textAlign: "center",
  },
});

export default UsernameScreen;