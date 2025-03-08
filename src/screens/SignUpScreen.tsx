import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

type SignUpScreenProps = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SignUpScreen({ setIsLoggedIn }: SignUpScreenProps) {
  const handleLogin = () => {
    console.log("Login button pressed"); // Debug log
    setIsLoggedIn(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login with Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#ff6b81", padding: 15, borderRadius: 10, marginVertical: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});