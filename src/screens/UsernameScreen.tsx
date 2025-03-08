import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface UsernameScreenProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const UsernameScreen: React.FC<UsernameScreenProps> = ({ setIsLoggedIn }) => {
  const handleProceed = () => {
    setIsLoggedIn(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Username</Text>
      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UsernameScreen;

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  button: { backgroundColor: "#ff6b81", padding: 15, borderRadius: 10, marginVertical: 10 },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});