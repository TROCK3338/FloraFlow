import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CalendarRow = () => {
  return (
    <View style={styles.container}>
      {["T", "F", "S", "S", "M", "T", "W"].map((day, index) => (
        <View key={index} style={[styles.dayBox, index === 4 && styles.selectedDay]}>
          <Text style={[styles.dayText, index === 4 && styles.selectedText]}>{day}</Text>
          <Text style={styles.dateText}>{index + 2}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  dayBox: {
    alignItems: "center",
    padding: 8,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 14,
    color: "gray",
  },
  selectedDay: {
    borderColor: "#D36B6B",
    borderWidth: 2,
    borderRadius: 8,
    padding: 6,
  },
  selectedText: {
    color: "#D36B6B",
  },
});

export default CalendarRow;