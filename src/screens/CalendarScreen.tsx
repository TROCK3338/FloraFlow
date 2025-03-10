import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ViewStyle, TextStyle } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const CalendarScreen = () => {
  const [currentMonth, setCurrentMonth] = useState('March');
  

  // Sample data for the calendar
  const daysOfWeek = ['Mon', 'Tu', 'We', 'Thu', 'Fri', 'Sa', 'Su'];
  const daysInMonth = [
    { day: 29, prevMonth: true }, { day: 30, prevMonth: true }, 
    { day: 1 }, { day: 2, isToday: true }, { day: 3 }, { day: 4 }, { day: 5 },
    { day: 6, isPeriod: true }, { day: 7, isPeriod: true }, { day: 8, isPeriod: true }, 
    { day: 9, isPeriod: true }, { day: 10, isPeriod: true }, { day: 11 }, { day: 12 },
    { day: 13 }, { day: 14 }, { day: 15 }, { day: 16 }, 
    { day: 17 }, { day: 18 }, { day: 19 },
    { day: 20 }, { day: 21 }, { day: 22 }, 
    { day: 23, isOvulation: true }, { day: 24, isOvulation: true }, 
    { day: 25, isOvulation: true }, { day: 26, isOvulation: true },
    { day: 27 }, { day: 28 }, { day: 29 }, { day: 30 }, { day: 31 },
    { day: 1, nextMonth: true }, { day: 2, nextMonth: true }
  ];

  // Sample pregnancy chance data
  const pregnancyChanceData = [
    { day: 'Mon', chance: 30, highlight: true },
    { day: 'Tu', chance: 30, highlight: false },
    { day: 'We', chance: 5, highlight: false },
    { day: 'Thu', chance: 5, highlight: false },
    { day: 'Fri', chance: 18, highlight: false },
    { day: 'Sa', chance: 20, highlight: false },
    { day: 'Su', chance: 20, highlight: false },
  ];

  const navigateToPreviousMonth = () => {
    // Implementation for navigating to previous month
    console.log('Navigate to previous month');
  };

  const navigateToNextMonth = () => {
    // Implementation for navigating to next month
    console.log('Navigate to next month');
  };

  const navigateBack = () => {
    // Implementation for navigating back
    console.log('Navigate back');
  };

  const openMenu = () => {
    // Implementation for opening menu
    console.log('Open menu');
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={navigateBack} style={styles.backButton}>
          <MaterialIcons name="chevron-left" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Calendar</Text>
        <TouchableOpacity onPress={openMenu} style={styles.menuButton}>
          <MaterialIcons name="menu" size={28} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.calendarCard}>
        <View style={styles.monthNavigator}>
          <TouchableOpacity onPress={navigateToPreviousMonth}>
            <MaterialIcons name="chevron-left" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.monthTitle}>{currentMonth}</Text>
          <TouchableOpacity onPress={navigateToNextMonth}>
            <MaterialIcons name="chevron-right" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.calendarGrid}>
          {/* Days of week header */}
          <View style={styles.daysOfWeekRow}>
            {daysOfWeek.map((day, index) => (
              <View key={`header-${index}`} style={styles.dayHeader}>
                <Text style={styles.dayHeaderText}>{day}</Text>
              </View>
            ))}
          </View>

          {/* Calendar days grid */}
          <View style={styles.daysGrid}>
            {daysInMonth.map((day, index) => {
              // Create a copy of the base styles for type safety
              const cellStyle: ViewStyle = {
                width: '14.28%',
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 3,
              };
              
              const textStyle: TextStyle = {
                fontSize: 16,
              };
              
              // Apply conditional styling
              if (day.prevMonth || day.nextMonth) {
                textStyle.color = '#bbbbbb';
              }
              
              if (day.isToday) {
                cellStyle.backgroundColor = '#E9BC7E';
                cellStyle.borderRadius = 50;
              }
              
              if (day.isPeriod) {
                cellStyle.backgroundColor = '#E39E9E';
                cellStyle.borderRadius = 0;
                if (!day.prevMonth && !day.nextMonth) {
                  textStyle.color = 'white';
                }
              }
              
              if (day.isOvulation) {
                cellStyle.backgroundColor = '#82AECF';
                cellStyle.borderRadius = 0;
                if (!day.prevMonth && !day.nextMonth) {
                  textStyle.color = 'white';
                }
              }
              
              return (
                <View key={`day-${index}`} style={cellStyle}>
                  <Text style={textStyle}>{day.day}</Text>
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.legendContainer}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#E39E9E' }]} />
            <Text style={styles.legendText}>Period</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#82AECF' }]} />
            <Text style={styles.legendText}>Ovulation</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#E9BC7E' }]} />
            <Text style={styles.legendText}>Today</Text>
          </View>
        </View>
      </View>

      <View style={styles.pregnancyChanceContainer}>
        <Text style={styles.pregnancyChanceTitle}>Pregnancy chance</Text>
        
        <View style={styles.chartContainer}>
          {pregnancyChanceData.map((item, index) => {
            const barStyle: ViewStyle = {
              width: 20,
              height: item.chance * 2,
              backgroundColor: item.highlight ? '#E9BC7E' : '#E39E9E',
              borderRadius: 10,
            };
            
            return (
              <View key={`chart-${index}`} style={styles.chartColumn}>
                <View style={styles.barContainer}>
                  <View style={barStyle} />
                </View>
                <Text style={styles.chartPercentage}>{item.chance}%</Text>
                <Text style={styles.chartDay}>{item.day}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  backButton: {
    padding: 5,
  },
  menuButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  calendarCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  monthNavigator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    marginBottom: 10,
    // borderRadius: 8,
  },
  monthTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  daysOfWeekRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  dayHeader: {
    flex: 1,
    alignItems: 'center',
  },
  dayHeaderText: {
    fontWeight: '600',
  },
  calendarGrid: {
    marginBottom: 15,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 14,
  },
  pregnancyChanceContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    margin: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pregnancyChanceTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 150,
    paddingBottom: 20,
    marginBottom: 15,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  barContainer: {
    height: 100,
    justifyContent: 'flex-end',
  },
  chartPercentage: {
    marginTop: 5,
    fontSize: 12,
  },
  chartDay: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '500',
  },
  navigationBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingVertical: 10,
    backgroundColor: '#ffffff',
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  activeNavItem: {
    borderTopWidth: 2,
    borderTopColor: '#E39E9E',
    marginTop: -2,
  },
  navText: {
    marginTop: 4,
    fontSize: 12,
    color: '#999',
  },
});

export default CalendarScreen;
