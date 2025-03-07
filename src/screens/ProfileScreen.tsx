// src/screens/ProfileScreen.tsx
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5, MaterialIcons, Entypo } from "@expo/vector-icons";

const ProfileScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity>
          <Ionicons name="menu" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/images/profile.jpeg")}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>Martina Pollis</Text>
        <Text style={styles.profileGoal}>Goal: Cycle tracking</Text>
      </View>

      {/* Period & Cycle Length Section */}
      <View style={styles.infoContainer}>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Period length</Text>
          <FontAwesome5 name="tint" size={20} color="#D46A6A" />
          <Text style={styles.infoNumber}>6</Text>
          <Text style={styles.infoUnit}>days</Text>
        </View>
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>Cycle length</Text>
          <Ionicons name="sync" size={20} color="#659DDF" />
          <Text style={styles.infoNumber}>2</Text>
          <Text style={styles.infoUnit}>days</Text>
        </View>
      </View>

      {/* Settings Section */}
      <Text style={styles.settingsTitle}>Settings</Text>
      <View style={styles.settingsGrid}>
        <TouchableOpacity style={styles.settingsItem}>
          <FontAwesome5 name="star" size={24} color="black" />
          <Text style={styles.settingsText}>Go Premium</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <FontAwesome5 name="trophy" size={24} color="black" />
          <Text style={styles.settingsText}>My Goals</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <FontAwesome5 name="crown" size={24} color="black" />
          <Text style={styles.settingsText}>Subscription</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <MaterialIcons name="insert-chart" size={24} color="black" />
          <Text style={styles.settingsText}>Health Report</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <Entypo name="list" size={24} color="black" />
          <Text style={styles.settingsText}>Terms and conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingsItem}>
          <Entypo name="cross" size={24} color="black" />
          <Text style={styles.settingsText}>Delete profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  headerTitle: { fontSize: 22, fontWeight: "bold" },
  profileContainer: { alignItems: "center", marginTop: 10 },
  profileImage: { width: 100, height: 100, borderRadius: 50, marginBottom: 10 },
  profileName: { fontSize: 20, fontWeight: "bold" },
  profileGoal: { fontSize: 14, color: "gray" },
  infoContainer: { flexDirection: "row", justifyContent: "space-between", marginVertical: 20 },
  infoBox: { flex: 1, backgroundColor: "#F8F8F8", borderRadius: 10, padding: 15, alignItems: "center", marginHorizontal: 5 },
  infoTitle: { fontSize: 14, fontWeight: "bold", marginBottom: 5 },
  infoNumber: { fontSize: 24, fontWeight: "bold", marginTop: 5 },
  infoUnit: { fontSize: 14, color: "gray" },
  settingsTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  settingsGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" },
  settingsItem: { width: "30%", alignItems: "center", marginVertical: 10 },
  settingsText: { marginTop: 5, fontSize: 14, textAlign: "center" },
});

export default ProfileScreen;