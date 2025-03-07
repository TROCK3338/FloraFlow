import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Countdown = () => {
  return (
    <View style={styles.container}>
      <View style={styles.circle}>
        <Text style={styles.count}>4+</Text>
        <Text style={styles.days}>days</Text>
        <Text style={styles.subtext}>Low pregnancy chance</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginVertical: 20,
  },
  circle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#D36B6B",
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#fff",
  },
  days: {
    fontSize: 18,
    color: "#fff",
  },
  subtext: {
    fontSize: 14,
    color: "#fff",
    marginTop: 5,
  },
});

export default Countdown;