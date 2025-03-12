import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function CycleRegularityScreen() {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleNext = () => {
    if (selectedOption) {
      navigation.navigate("SymptomsScreen");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Is your cycle regular?</Text>
      {["My cycle is regular", "My cycle is irregular", "I am not sure"].map((option) => (
        <TouchableOpacity
          key={option}
          style={[styles.option, selectedOption === option && styles.selectedOption]}
          onPress={() => setSelectedOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.nextButton} onPress={handleNext} disabled={!selectedOption}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  question: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  option: { width: "80%", padding: 15, borderWidth: 1, borderColor: "#ddd", borderRadius: 10, marginBottom: 10, alignItems: "center" },
  selectedOption: { backgroundColor: "#E6B7A0" },
  optionText: { fontSize: 16 },
  nextButton: { marginTop: 20, backgroundColor: "#D27A62", padding: 15, borderRadius: 10, width: "60%", alignItems: "center" },
  nextButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});