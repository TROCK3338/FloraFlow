import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function SymptomsScreen() {
  const navigation = useNavigation();
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  const symptomsList = ["Painful cramps", "Appetite changes", "Acne", "Lower back pain", "Mood changes", "Nausea"];

  const toggleSelection = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.question}>Do you experience any of these symptoms?</Text>
      {symptomsList.map((symptom) => (
        <TouchableOpacity
          key={symptom}
          style={[styles.option, selectedSymptoms.includes(symptom) && styles.selectedOption]}
          onPress={() => toggleSelection(symptom)}
        >
          <Text style={styles.optionText}>{symptom}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate("HealthDisordersScreen")}>
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