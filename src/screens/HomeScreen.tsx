import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HomeScreenProps {
  username: string; // Add username prop
}

const HomeScreen: React.FC<HomeScreenProps> = ({ username }) => {
  return (
    <ImageBackground
      source={require("../../assets/images/bg_img3.png")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.greeting}>Good Morning, {username}!</Text> {/* Dynamic greeting */}
          <TouchableOpacity>
            <Ionicons name="menu" size={28} color="black" />
          </TouchableOpacity>
        </View>

        {/* CALENDAR STRIP */}
        <View style={styles.calendarStrip}>
          {["T", "F", "S", "S", "M", "T", "W"].map((day, index) => (
            <View key={index} style={index === 4 ? styles.selectedDay : styles.day}>
              <Text style={index === 4 ? styles.selectedDayText : styles.dayText}>{day}</Text>
              <Text style={styles.date}>{index + 2}</Text>
            </View>
          ))}
        </View>

        {/* PERIOD TRACKER CIRCLE */}
        <View style={styles.trackerContainer}>
          <View style={styles.outertrackerCircle}>
            <View style={styles.trackerCircle}>
              <Text style={styles.trackerText}>Your period starts in</Text>
              <Text style={styles.trackerDays}>4 days</Text>
              <View style={styles.circleDivider} />
              <Text style={styles.trackerSubText}>Low pregnancy chance</Text>
            </View>
          </View>
        </View>

        {/* DAILY INSIGHTS */}
        <View style={styles.insightsHeader}>
          <Text style={styles.insightsTitle}>YOUR DAILY INSIGHTS</Text>
          <View style={styles.divider} />
        </View>
        <View style={styles.insightsContainer}>
          <View style={[styles.insightBox, { backgroundColor: "#D16B66" }]}>
            <Text style={styles.insightText}>Cycle day</Text>
            <Text style={styles.insightNumber}>18</Text>
          </View>
          <View style={[styles.insightBox, { backgroundColor: "#5A93D4" }]}>
            <Text style={styles.insightText}>Ovulation</Text>
            <Text style={styles.insightNumber}>3</Text>
          </View>
          <View style={[styles.insightBox, { backgroundColor: "#EAEAEA" }]}>
            <Text style={styles.insightText}>Symptoms</Text>
            <Image source={require("../../assets/images/symptoms.png")} style={styles.icon} />
          </View>
          <View style={[styles.insightBox, { backgroundColor: "#E6B87E" }]}>
            <Text style={styles.insightText}>Add info</Text>
            <Text style={styles.insightNumber}>+</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
  },
  calendarStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  day: {
    alignItems: "center",
  },
  selectedDay: {
    alignItems: "center",
    backgroundColor: "#D19E77",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 30,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600",
  },
  selectedDayText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  date: {
    fontSize: 14,
    color: "#555",
  },
  trackerContainer: {
    alignItems: "center",
    marginVertical: 30,
  },
  trackerCircle: {
    width: 235,
    height: 235,
    borderRadius: 125,
    backgroundColor: "#D16B66",
    alignItems: "center",
    justifyContent: "center",
  },
  outertrackerCircle: {
    width: 280,
    height: 280,
    borderRadius: 132,
    borderWidth: 2,
    borderColor: "#D16B66",
    borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },
  circleDivider: {
    width: "40%",
    height: 3,
    backgroundColor: "rgb(255, 255, 255)",
    marginTop: 5,
  },
  trackerText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  trackerDays: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
  },
  trackerSubText: {
    color: "#fff",
    fontSize: 14,
    marginTop: 5,
    paddingHorizontal: 35,
    textAlign: "center",
  },
  insightsHeader: {
    alignItems: "center",
    marginBottom: 10,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "rgba(119, 119, 119, 0.46)",
    marginTop: 5,
  },
  insightsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  insightBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 14,
    marginHorizontal: 5,
  },
  insightText: {
    fontSize: 11,
    color: "#fff",
  },
  insightNumber: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 5,
  },
});

export default HomeScreen;