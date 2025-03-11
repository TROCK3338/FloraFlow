import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../navigation'; // Adjust the import based on your project structure

// Define the expected type for route params
type OvulationDetailProps = {
  route: RouteProp<RootStackParamList, 'OvulationDetail'>;
};

const OvulationDetail: React.FC<OvulationDetailProps> = ({ route }) => {
  const { daysToOvulation, fertilitySummary } = route.params;
  const navigation = useNavigation();
  
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        
        <Text style={styles.heading}>Ovulation Details</Text>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Days to Ovulation:</Text>
          <Text style={styles.infoValue}>{daysToOvulation}</Text>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={styles.infoLabel}>Fertility Status:</Text>
          <Text style={styles.infoValue}>{fertilitySummary}</Text>
        </View>
        
        <View style={styles.explanationCard}>
          <Text style={styles.explanationTitle}>What This Means</Text>
          <Text style={styles.explanationText}>
            Ovulation is when your ovary releases an egg. This typically happens around
            the middle of your menstrual cycle. The days leading up to ovulation are 
            when fertility is highest if you're trying to conceive.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

// Styles remain unchanged
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
    color: '#5A93D4',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#5A93D4',
  },
  infoCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  infoLabel: {
    fontSize: 16,
    color: '#555',
  },
  infoValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5A93D4',
  },
  explanationCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    marginTop: 10,
  },
  explanationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  explanationText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#555',
  },
});

export default OvulationDetail;