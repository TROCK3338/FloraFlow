import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const AddInfo = () => {
  const navigation = useNavigation();
  
  // Categories of information that can be added
  const infoCategories = [
    { id: 1, name: 'Period Flow', icon: '💧', description: 'Record your period flow intensity' },
    { id: 2, name: 'Mood', icon: '😊', description: 'Track your emotional state' },
    { id: 3, name: 'Sleep', icon: '😴', description: 'Log your sleep quality and duration' },
    { id: 4, name: 'Exercise', icon: '🏃‍♀️', description: 'Record your physical activity' },
    { id: 5, name: 'Nutrition', icon: '🥗', description: 'Track your eating habits' },
    { id: 6, name: 'Water', icon: '💦', description: 'Monitor your hydration' },
    { id: 7, name: 'Notes', icon: '📝', description: 'Add any other information' },
  ];
  
  const handleCategorySelect = (categoryId: number) => {
    // Here you would navigate to a specific form for the selected category
    // For now we'll just go back
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.heading}>Add Information</Text>
        <Text style={styles.subheading}>Select a category to add information</Text>
        
        <ScrollView style={styles.categoriesContainer}>
          {infoCategories.map(category => (
            <TouchableOpacity 
              key={category.id} 
              style={styles.categoryItem}
              onPress={() => handleCategorySelect(category.id)}
            >
              <View style={styles.categoryIcon}>
                <Text style={styles.iconText}>{category.icon}</Text>
              </View>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryName}>{category.name}</Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#E6B87E',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#E6B87E',
  },
  subheading: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  categoriesContainer: {
    flex: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    marginBottom: 15,
  },
  categoryIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#E6B87E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 24,
  },
  categoryInfo: {
    flex: 1,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: '#777',
  },
});

export default AddInfo;