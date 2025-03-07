import React from "react";
import { View, Text, StyleSheet } from "react-native";

const DailyInsights = () => {
  const insights = [
    { title: "Cycle day", value: "18", color: "#D36B6B" },
    { title: "Ovulation", value: "3", color: "#4A90E2" },
    { title: "Symptoms", value: "✔️", color: "#E2E2E2" },
    { title: "Add info", value: "+", color: "#E6B87F" },
  ];

  return (
    <View style={styles.container}>
      {insights.map((item, index) => (
        <View key={index} style={[styles.box, { backgroundColor: item.color }]}>
          <Text style={styles.value}>{item.value}</Text>
          <Text style={styles.label}>{item.title}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 20,
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  value: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
  },
  label: {
    fontSize: 12,
    color: "#fff",
    marginTop: 5,
  },
});

export default DailyInsights;