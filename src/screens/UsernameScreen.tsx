import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

interface UsernameScreenProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>; // Added this to update username
}

const UsernameScreen: React.FC<UsernameScreenProps> = ({ setIsLoggedIn, setUsername }) => {
  const [username, setLocalUsername] = useState("");

  const handleLogin = () => {
    if (username) {
      setUsername(username); // Update global username state
      setIsLoggedIn(true); // Update login state when username is entered
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Username</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setLocalUsername}
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    width: "80%",
    paddingHorizontal: 10,
  },
});

export default UsernameScreen;