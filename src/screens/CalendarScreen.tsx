import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CalendarScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Calendar Box */}
      <View style={styles.calendarBox}>
        <View style={styles.calendarHeader}>
          <TouchableOpacity>
            <Ionicons name="chevron-back" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.month}>March</Text>
          <TouchableOpacity>
            <Ionicons name="chevron-forward" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <Text key={day} style={styles.dayLabel}>{day}</Text>
          ))}

          {/* Dates - Example structure */}
          {[29, 30, 1, 2, 3, 4, 5].map((date) => (
            <Text key={date} style={styles.inactiveDay}>{date}</Text>
          ))}

          {[6, 7, 8, 9, 10].map((date) => (
            <View key={date} style={styles.periodDay}>
              <Text style={styles.dayText}>{date}</Text>
            </View>
          ))}

          {[23, 24, 25, 26].map((date) => (
            <View key={date} style={styles.ovulationDay}>
              <Text style={styles.dayText}>{date}</Text>
            </View>
          ))}

          <View style={styles.todayDay}>
            <Text style={styles.dayText}>2</Text>
          </View>
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#D46A6A" }]} />
          <Text style={styles.legendText}>Period</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#659DDF" }]} />
          <Text style={styles.legendText}>Ovulation</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: "#D79967" }]} />
          <Text style={styles.legendText}>Today</Text>
        </View>
      </View>

      {/* Pregnancy Chance Chart */}
      <View style={styles.pregnancyBox}>
        <Text style={styles.chartTitle}>Pregnancy chance</Text>
        <View style={styles.barChart}>
          {[
            { day: "Mon", percent: 30, color: "#D79967" },
            { day: "Tue", percent: 30, color: "#555" },
            { day: "Wed", percent: 5, color: "#555" },
            { day: "Thu", percent: 5, color: "#D46A6A" },
            { day: "Fri", percent: 18, color: "#D46A6A" },
            { day: "Sat", percent: 20, color: "#D46A6A" },
            { day: "Sun", percent: 20, color: "#D46A6A" },
          ].map(({ day, percent, color }) => (
            <View key={day} style={styles.barContainer}>
              <View style={[styles.bar, { height: `${percent}%`, backgroundColor: color }]} />
              <Text style={styles.barLabel}>{day}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 15 },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  
  calendarBox: { backgroundColor: "#F8F8F8", borderRadius: 10, padding: 15, margin: 10 },
  calendarHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  month: { fontSize: 18, fontWeight: "bold" },
  
  calendarGrid: { flexDirection: "row", flexWrap: "wrap", marginTop: 10 },
  dayLabel: { width: "14%", textAlign: "center", fontWeight: "bold" },
  inactiveDay: { width: "14%", textAlign: "center", color: "#999", padding: 5 },
  periodDay: { width: "14%", backgroundColor: "#D46A6A", borderRadius: 10, alignItems: "center", padding: 5 },
  ovulationDay: { width: "14%", backgroundColor: "#659DDF", borderRadius: 10, alignItems: "center", padding: 5 },
  todayDay: { width: "14%", backgroundColor: "#D79967", borderRadius: 50, alignItems: "center", padding: 5 },
  dayText: { color: "#fff", fontSize: 16 },
  
  legend: { flexDirection: "row", justifyContent: "center", marginVertical: 10 },
  legendItem: { flexDirection: "row", alignItems: "center", marginHorizontal: 10 },
  legendColor: { width: 12, height: 12, borderRadius: 6, marginRight: 5 },
  legendText: { fontSize: 14, color: "#333" },

  pregnancyBox: { padding: 15, margin: 10 },
  chartTitle: { fontSize: 18, fontWeight: "bold" },

  barChart: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
  barContainer: { alignItems: "center" },
  bar: { width: 12, borderRadius: 6 },
  barLabel: { fontSize: 12, marginTop: 5 },
});

export default CalendarScreen;