import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, SafeAreaView, StatusBar, Alert } from "react-native";

interface HomeScreenProps {
  username: string; // Still keeping this prop in case you need it elsewhere
}

const HomeScreen: React.FC<HomeScreenProps> = () => {
  // Sample data for calendar - you can replace with actual data
  const days = ["T", "F", "S", "S", "M", "T", "W"];
  const dates = [2, 3, 4, 5, 6, 7, 8];
  const todayIndex = 2; // Saturday is today (index 2)
  const periodIndex = 6; // Wednesday is the expected period day (index 6)

  // Function to handle insight box press
  const handleInsightPress = (insightType: string) => {
    switch (insightType) {
      case "cycle":
        Alert.alert(
          "Cycle Day Information",
          "You are on day 18 of your menstrual cycle. This is typically the luteal phase."
        );
        break;
      case "ovulation":
        Alert.alert(
          "Ovulation Information",
          "Ovulation is expected in 3 days. Your fertility is increasing."
        );
        break;
      case "symptoms":
        Alert.alert(
          "Track Symptoms",
          "Record your symptoms such as mood changes, cramps, headaches, or bloating.",
          [
            { text: "Cancel", style: "cancel" },
            { text: "Add Symptoms", onPress: () => console.log("Navigate to symptoms tracker") }
          ]
        );
        break;
      case "addInfo":
        Alert.alert(
          "Add Information",
          "What would you like to add?",
          [
            { text: "Period Flow", onPress: () => console.log("Navigate to period flow input") },
            { text: "Mood", onPress: () => console.log("Navigate to mood input") },
            { text: "Notes", onPress: () => console.log("Navigate to notes input") },
            { text: "Cancel", style: "cancel" }
          ]
        );
        break;
      default:
        break;
    }
  };

  return (
    <>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("../../assets/images/bg_img3.png")}
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            {/* CALENDAR STRIP - Redesigned */}
            <View style={styles.calendarContainer}>
              <View style={styles.calendarStrip}>
                {days.map((day, index) => (
                  <View key={index} style={styles.dayColumn}>
                    <Text style={styles.dayText}>{day}</Text>
                    
                    {/* Date container with conditional styling for today and period day */}
                    <View style={[
                      styles.dateContainer,
                      index === todayIndex ? styles.todayOuterPill : null,
                      index === periodIndex ? styles.periodOuterPill : null
                    ]}>
                      <View style={[
                        styles.dateInnerContainer,
                        index === todayIndex ? styles.todayInnerPill : null,
                        index === periodIndex ? styles.periodInnerPill : null
                      ]}>
                        <Text style={[
                          styles.dateText,
                          (index === todayIndex || index === periodIndex) ? styles.highlightedDateText : null
                        ]}>
                          {dates[index]}
                        </Text>
                      </View>
                    </View>
                    
                    {/* Indicators for today and period */}
                    {index === todayIndex && (
                      <Text style={styles.indicatorText}>Today</Text>
                    )}
                    {index === periodIndex && (
                      <Text style={styles.indicatorText}>Period</Text>
                    )}
                  </View>
                ))}
              </View>
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
              {/* Cycle Day Insight */}
              <TouchableOpacity 
                style={[styles.insightBox, { backgroundColor: "#D16B66" }]}
                onPress={() => handleInsightPress("cycle")}
                activeOpacity={0.7}
              >
                <Text style={styles.insightText}>Cycle day</Text>
                <Text style={styles.insightNumber}>18</Text>
                <View style={styles.insightIconContainer}>
                  <Text style={styles.insightIconText}>→</Text>
                </View>
              </TouchableOpacity>
              
              {/* Ovulation Insight */}
              <TouchableOpacity 
                style={[styles.insightBox, { backgroundColor: "#5A93D4" }]}
                onPress={() => handleInsightPress("ovulation")}
                activeOpacity={0.7}
              >
                <Text style={styles.insightText}>Ovulation</Text>
                <Text style={styles.insightNumber}>3</Text>
                <View style={styles.insightIconContainer}>
                  <Image 
                    source={require("../../assets/images/symptoms.png")} 
                    style={[styles.icon, { tintColor: "#fff", opacity: 0.7 }]} 
                  />
                </View>
              </TouchableOpacity>
              
              {/* Symptoms Insight */}
              <TouchableOpacity 
                style={[styles.insightBox, { backgroundColor: "#EAEAEA" }]}
                onPress={() => handleInsightPress("symptoms")}
                activeOpacity={0.7}
              >
                <Text style={[styles.insightText, { color: "#555" }]}>Symptoms</Text>
                <Image 
                  source={require("../../assets/images/symptoms.png")} 
                  style={styles.icon} 
                />
                <View style={[styles.insightIconContainer, { backgroundColor: "rgba(0,0,0,0.1)" }]}>
                  <Text style={[styles.insightIconText, { color: "#555" }]}>+</Text>
                </View>
              </TouchableOpacity>
              
              {/* Add Info Insight */}
              <TouchableOpacity 
                style={[styles.insightBox, { backgroundColor: "#E6B87E" }]}
                onPress={() => handleInsightPress("addInfo")}
                activeOpacity={0.7}
              >
                <Text style={styles.insightText}>Add info</Text>
                <Text style={styles.insightNumber}>+</Text>
                <View style={styles.insightIconContainer}>
                  <Text style={styles.insightIconText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  backgroundImageStyle: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  calendarContainer: {
    marginTop: 20,
  },
  calendarStrip: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 5,
  },
  dayColumn: {
    alignItems: "center",
    width: 40,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  dateContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    marginTop: 5,
  },
  dateInnerContainer: {
    alignItems: "center",
    justifyContent: "center",
    height: 34,
    width: 34,
    borderRadius: 17,
  },
  todayOuterPill: {
    borderWidth: 2,
    borderColor: "#D19E77",
    borderStyle: "dashed",
  },
  todayInnerPill: {
    backgroundColor: "#D19E77",
  },
  periodOuterPill: {
    borderWidth: 2,
    borderColor: "#D16B66",
    borderStyle: "dashed",
  },
  periodInnerPill: {
    backgroundColor: "#D16B66",
  },
  dateText: {
    fontSize: 16,
    color: "#555",
  },
  highlightedDateText: {
    color: "white",
    fontWeight: "bold",
  },
  indicatorText: {
    fontSize: 10,
    marginTop: 4,
    color: "#555",
    fontWeight: "500",
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
    paddingVertical: 16,
    borderRadius: 14,
    marginHorizontal: 5,
    position: "relative",
    overflow: "hidden",
  },
  insightText: {
    fontSize: 11,
    color: "#fff",
    fontWeight: "500",
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
  insightIconContainer: {
    position: "absolute",
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  insightIconText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default HomeScreen;