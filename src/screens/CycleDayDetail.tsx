import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  SafeAreaView,
  Dimensions,
  Platform
} from 'react-native';
import Slider from '@react-native-community/slider';
import * as Haptics from 'expo-haptics';

// Get the screen width for responsive design
const { width } = Dimensions.get('window');

interface CycleDayDetailProps {
  route: {
    params: {
      cycleDay: number;
      cyclePhase: string;
    }
  };
  navigation: any;
}

const CycleDayDetail: React.FC<CycleDayDetailProps> = ({ route, navigation }) => {
  const { cycleDay, cyclePhase } = route.params;
  
  // State for mood selection
  const [selectedMood, setSelectedMood] = useState(3); // 0-5 scale
  const [symptomsIntensity, setSymptomsIntensity] = useState({
    cramps: 0,
    bloating: 0,
    headache: 0,
    fatigue: 0
  });
  const [hadSex, setHadSex] = useState(false);
  
  // Array of moods with emoji
  const moods = [
    { emoji: '😫', label: 'Terrible' },
    { emoji: '😔', label: 'Not Good' },
    { emoji: '😐', label: 'Neutral' },
    { emoji: '🙂', label: 'Good' },
    { emoji: '😊', label: 'Great' },
    { emoji: '🥰', label: 'Amazing' }
  ];
  
  // Trigger haptic feedback when mood changes
  useEffect(() => {
    if (Platform.OS === 'ios') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
  }, [selectedMood]);
  
  // Handle symptom slider change with haptic feedback
  const handleSymptomChange = (symptom: string, value: number) => {
    if (Platform.OS === 'ios' && Math.floor(value * 10) % 2 === 0) {
      Haptics.selectionAsync();
    }
    setSymptomsIntensity({
      ...symptomsIntensity,
      [symptom]: value
    });
  };
  
  // Get recommended playlist based on mood
  const getPlaylist = () => {
    if (selectedMood <= 1) {
      return "Uplifting & Gentle";
    } else if (selectedMood <= 3) {
      return "Balanced & Calming";
    } else {
      return "Energetic & Happy";
    }
  };
  
  // Get cycle phase description and tips
  const getCycleInfo = () => {
    if (cyclePhase === 'Luteal Phase') {
      return {
        description: "Your body is preparing for your next period. Progesterone levels are high, which can sometimes cause PMS symptoms.",
        tips: [
          "Stay hydrated",
          "Focus on foods rich in calcium and B vitamins",
          "Gentle exercise like yoga or walking can help with symptoms"
        ]
      };
    } else if (cyclePhase === 'Follicular Phase') {
      return {
        description: "Your body is preparing to release an egg. Estrogen is rising, which can boost your energy and mood.",
        tips: [
          "A good time for high-intensity exercise",
          "Focus on iron-rich foods",
          "Plan social activities - you may feel more outgoing"
        ]
      };
    } else if (cyclePhase === 'Ovulation') {
      return {
        description: "Your body is releasing an egg. This is when you're most fertile. You might notice increased energy and libido.",
        tips: [
          "Use protection if you're not trying to conceive",
          "Stay hydrated",
          "Track any ovulation symptoms like mild cramping"
        ]
      };
    } else {
      return {
        description: "You're on your period. Your uterine lining is shedding.",
        tips: [
          "Rest when needed",
          "Stay hydrated",
          "Use heat for cramps"
        ]
      };
    }
  };
  
  const cycleInfo = getCycleInfo();
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header with back button */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Cycle Day {cycleDay}</Text>
          <View style={styles.emptySpace} />
        </View>
        
        {/* Cycle phase visualization */}
        <View style={styles.phaseContainer}>
          <Image 
            source={require('../../assets/images/cycle_phases.png')} 
            style={styles.phaseImage}
            resizeMode="contain"
          />
          <View style={styles.phaseTextContainer}>
            <Text style={styles.phaseTitle}>{cyclePhase}</Text>
            <Text style={styles.phaseDescription}>{cycleInfo.description}</Text>
          </View>
        </View>
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {/* Mood Tracker with cute aesthetic */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>How are you feeling today?</Text>
          
          {/* Emoji Mood Display */}
          <View style={styles.moodContainer}>
            {moods.map((mood, index) => (
              <TouchableOpacity 
                key={index}
                onPress={() => {
                  setSelectedMood(index);
                  if (Platform.OS === 'ios') {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
                  }
                }}
                style={[
                  styles.moodItem,
                  selectedMood === index ? styles.selectedMoodItem : {}
                ]}
              >
                <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                {selectedMood === index && (
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Playlist Recommendation */}
          <View style={styles.playlistContainer}>
            <Text style={styles.playlistTitle}>Recommended Playlist</Text>
            <View style={styles.playlistCard}>
              <Text style={styles.playlistName}>{getPlaylist()}</Text>
              <TouchableOpacity style={styles.playButton}>
                <Text style={styles.playButtonText}>▶ Play</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        
        {/* Divider */}
        <View style={styles.divider} />
        
        {/* Symptoms Tracking */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Track Symptoms</Text>
          
          {/* Symptoms with sliders */}
          {Object.keys(symptomsIntensity).map((symptom) => (
            <View key={symptom} style={styles.symptomContainer}>
              <View style={styles.symptomHeader}>
                <Text style={styles.symptomName}>{symptom.charAt(0).toUpperCase() + symptom.slice(1)}</Text>
                <Text style={styles.symptomValue}>
                  {symptomsIntensity[symptom as keyof typeof symptomsIntensity] > 0 
                    ? `${Math.round(symptomsIntensity[symptom as keyof typeof symptomsIntensity] * 10)}` 
                    : 'None'}
                </Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                step={0.1}
                value={symptomsIntensity[symptom as keyof typeof symptomsIntensity]}
                onValueChange={(value) => handleSymptomChange(symptom, value)}
                minimumTrackTintColor="#D16B66"
                maximumTrackTintColor="#EAEAEA"
                thumbTintColor="#D16B66"
              />
            </View>
          ))}
          
          {/* Sex tracking */}
          <TouchableOpacity 
            style={[styles.sexButton, hadSex ? styles.sexButtonActive : {}]}
            onPress={() => {
              setHadSex(!hadSex);
              if (Platform.OS === 'ios') {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              }
            }}
          >
            <Text style={[styles.sexButtonText, hadSex ? styles.sexButtonTextActive : {}]}>
              {hadSex ? '✓ Sexual Activity Logged' : 'Log Sexual Activity'}
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Tips for this phase */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Tips for {cyclePhase}</Text>
          {cycleInfo.tips.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipDot}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
        
        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Today's Log</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  emptySpace: {
    width: 40,
  },
  phaseContainer: {
    backgroundColor: '#FFF5F5',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  phaseImage: {
    width: width - 80,
    height: 150,
    marginBottom: 15,
  },
  phaseTextContainer: {
    alignItems: 'center',
  },
  phaseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#D16B66',
    marginBottom: 10,
  },
  phaseDescription: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    lineHeight: 22,
  },
  divider: {
    height: 1,
    backgroundColor: '#EAEAEA',
    marginVertical: 20,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  moodItem: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 15,
    width: (width - 80) / 6,
  },
  selectedMoodItem: {
    backgroundColor: '#FFF5F5',
    transform: [{ scale: 1.1 }],
  },
  moodEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  moodLabel: {
    fontSize: 12,
    color: '#D16B66',
    fontWeight: '500',
  },
  playlistContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 15,
    padding: 15,
    marginTop: 10,
  },
  playlistTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#555',
    marginBottom: 10,
  },
  playlistCard: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  playlistName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  playButton: {
    backgroundColor: '#D16B66',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  playButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  symptomContainer: {
    marginBottom: 15,
  },
  symptomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  symptomName: {
    fontSize: 16,
    color: '#555',
  },
  symptomValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#D16B66',
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sexButton: {
    backgroundColor: '#F5F5F5',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#EAEAEA',
  },
  sexButtonActive: {
    backgroundColor: '#E8F5E9',
    borderColor: '#81C784',
  },
  sexButtonText: {
    fontSize: 16,
    color: '#555',
  },
  sexButtonTextActive: {
    color: '#388E3C',
    fontWeight: '500',
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingLeft: 5,
  },
  tipDot: {
    fontSize: 18,
    color: '#D16B66',
    marginRight: 10,
  },
  tipText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },
  saveButton: {
    backgroundColor: '#D16B66',
    borderRadius: 25,
    padding: 18,
    alignItems: 'center',
    marginVertical: 20,
  },
  saveButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default CycleDayDetail;