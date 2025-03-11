import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SymptomsLogger = () => {
  const navigation = useNavigation();
  
  // Sample symptoms to track
  const [symptoms, setSymptoms] = useState([
    { id: 1, name: 'Cramps', active: false },
    { id: 2, name: 'Headache', active: false },
    { id: 3, name: 'Bloating', active: false },
    { id: 4, name: 'Fatigue', active: false },
    { id: 5, name: 'Mood Swings', active: false },
    { id: 6, name: 'Breast Tenderness', active: false },
    { id: 7, name: 'Acne', active: false },
    { id: 8, name: 'Backache', active: false },
  ]);
  
  const toggleSymptom = (id: number) => {
    setSymptoms(symptoms.map(symptom => 
      symptom.id === id ? { ...symptom, active: !symptom.active } : symptom
    ));
  };
  
  const saveSymptoms = () => {
    // Here you would save the symptoms data
    // For now we'll just navigate back
    navigation.goBack();
  };
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.heading}>Log Your Symptoms</Text>
        <Text style={styles.subheading}>Track how you're feeling today</Text>
        
        <ScrollView style={styles.symptomsContainer}>
          {symptoms.map(symptom => (
            <View key={symptom.id} style={styles.symptomItem}>
              <Text style={styles.symptomName}>{symptom.name}</Text>
              <Switch
                value={symptom.active}
                onValueChange={() => toggleSymptom(symptom.id)}
                trackColor={{ false: '#D3D3D3', true: '#D16B66' }}
                thumbColor={symptom.active ? '#fff' : '#f4f3f4'}
              />
            </View>
          ))}
        </ScrollView>
        
        <TouchableOpacity style={styles.saveButton} onPress={saveSymptoms}>
          <Text style={styles.saveButtonText}>Save Symptoms</Text>
        </TouchableOpacity>
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
    color: '#D16B66',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#D16B66',
  },
  subheading: {
    fontSize: 16,
    color: '#777',
    marginBottom: 20,
  },
  symptomsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  symptomItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  symptomName: {
    fontSize: 18,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#D16B66',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SymptomsLogger;