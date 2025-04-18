import React, { useState, useRef } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ImageBackground, 
  SafeAreaView, 
  StatusBar, 
  Modal, 
  ScrollView,
  TextInput,
  Animated,
  Dimensions,
  FlatList,
  Pressable
} from "react-native";
import Slider from '@react-native-community/slider';

interface HomeScreenProps {
  username: string;
}

// Get device width
const { width } = Dimensions.get('window');
const insightBoxWidth = (width - 60) / 4; // Accounting for container padding and margins

const HomeScreen: React.FC<HomeScreenProps> = () => {
  // State for modals
  const [cycleModalVisible, setCycleModalVisible] = useState(false);
  const [ovulationModalVisible, setOvulationModalVisible] = useState(false);
  const [symptomsModalVisible, setSymptomsModalVisible] = useState(false);
  const [addInfoModalVisible, setAddInfoModalVisible] = useState(false);
  
  // Animation values
  const slideAnim = useRef(new Animated.Value(0)).current;
  
  // State for symptoms tracking
  const [moodValue, setMoodValue] = useState(3);
  const [painValue, setPainValue] = useState(2);
  const [energyValue, setEnergyValue] = useState(4);
  const [noteText, setNoteText] = useState("");
  
  // Sample data for calendar
  const days = ["T", "F", "S", "S", "M", "T", "W"];
  const dates = [2, 3, 4, 5, 6, 7, 8];
  const todayIndex = 2; // Saturday is today (index 2)
  const periodIndex = 6; // Wednesday is the expected period day (index 6)

  // Cycle phases data
  const cyclePhases = [
    { id: 1, phase: "Menstrual", days: "1-5", status: "completed", description: "Period flow, may experience cramping" },
    { id: 2, phase: "Follicular", days: "6-11", status: "completed", description: "Estrogen rises, preparing for ovulation" },
    { id: 3, phase: "Ovulation", days: "12-16", status: "active", description: "Egg release, fertility at peak" },
    { id: 4, phase: "Luteal", days: "17-28", status: "upcoming", description: "Progesterone rises, PMS symptoms may appear" }
  ];
  
  // Ovulation information cards
  const ovulationCards = [
    { 
      id: 1, 
      title: "Your Fertility Window", 
      description: "You're approaching peak fertility in the next 3 days. This is when you're most likely to conceive if you're trying.",
      color: "#E8B7D4",
      icon: "🌱"
    },
    { 
      id: 2, 
      title: "Physical Changes", 
      description: "Watch for clear, stretchy cervical mucus - a sign of fertility. Your basal body temperature may rise slightly after ovulation.",
      color: "#A2D4AB",
      icon: "🌡️"
    },
    { 
      id: 3, 
      title: "Self-Care Tips", 
      description: "Stay hydrated, get enough sleep, and consider tracking your BBT for more accurate ovulation prediction.",
      color: "#B6D7E4",
      icon: "💧"
    }
  ];
  
  // Recommended playlists based on mood
  const playlists = [
    { id: 1, name: "Peaceful Morning", mood: "calm", emoji: "😌" },
    { id: 2, name: "Energy Boost", mood: "energetic", emoji: "⚡" },
    { id: 3, name: "Comfort Songs", mood: "low", emoji: "🫂" },
    { id: 4, name: "Soothing Melodies", mood: "pain relief", emoji: "🎵" }
  ];
  
  // Book recommendations
  const books = [
    { id: 1, title: "Period Power", author: "Maisie Hill", genre: "Health" },
    { id: 2, title: "Taking Charge of Your Fertility", author: "Toni Weschler", genre: "Health" },
    { id: 3, title: "The Fifth Vital Sign", author: "Lisa Hendrickson-Jack", genre: "Wellness" }
  ];

  // Options for form
  const symptoms = ["Cramps", "Headache", "Bloating", "Fatigue", "Breast tenderness", "Mood swings", "Acne"];

  // Function to handle insight box press
  const handleInsightPress = (insightType: string) => {
    switch (insightType) {
      case "cycle":
        setCycleModalVisible(true);
        break;
      case "ovulation":
        setOvulationModalVisible(true);
        break;
      case "symptoms":
        setSymptomsModalVisible(true);
        break;
      case "addInfo":
        setAddInfoModalVisible(true);
        break;
      default:
        break;
    }
  };

  // Get mood emoji based on slider value
  const getMoodEmoji = (value: number) => {
    const emojis = ["😢", "😔", "😐", "🙂", "😊"];
    return emojis[Math.min(Math.floor(value), emojis.length - 1)];
  };
  
  // Get pain emoji based on slider value
  const getPainEmoji = (value: number) => {
    const emojis = ["😌", "😕", "😣", "😖", "😭"];
    return emojis[Math.min(Math.floor(value), emojis.length - 1)];
  };
  
  // Get energy emoji based on slider value
  const getEnergyEmoji = (value: number) => {
    const emojis = ["😴", "🥱", "😐", "🙂", "⚡"];
    return emojis[Math.min(Math.floor(value), emojis.length - 1)];
  };

  // Get color based on phase status
  const getPhaseColor = (status: string) => {
    switch (status) {
      case "completed":
        return "#A2D4AB"; // Green for completed phases
      case "active":
        return "#F9C784"; // Orange/yellow for active phase
      case "upcoming":
        return "#E0E0E0"; // Gray for upcoming phases
      default:
        return "#E0E0E0";
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
                <View style={styles.insightContent}>
                  <Text style={styles.insightText}>Cycle day</Text>
                  <Text style={styles.insightNumber}>18</Text>
                  <View style={styles.insightIconContainer}>
                    <Text style={styles.insightIconText}>→</Text>
                  </View>
                </View>
              </TouchableOpacity>
              
              {/* Ovulation Insight */}
              <TouchableOpacity 
                style={[styles.insightBox, { backgroundColor: "#5A93D4" }]}
                onPress={() => handleInsightPress("ovulation")}
                activeOpacity={0.7}
              >
                <View style={styles.insightContent}>
                  <Text style={styles.insightText}>Ovulation</Text>
                  <Text style={styles.insightNumber}>3</Text>
                  <View style={styles.insightIconContainer}>
                    <Text style={styles.insightIconText}>→</Text>
                  </View>
                </View>
              </TouchableOpacity>
              
              {/* Symptoms Insight */}
              <TouchableOpacity 
                style={[styles.insightBox, { backgroundColor: "#F9C784" }]}
                onPress={() => handleInsightPress("symptoms")}
                activeOpacity={0.7}
              >
                <View style={styles.insightContent}>
                  <Text style={styles.insightText}>Symptoms</Text>
                  <Text style={styles.insightEmoji}>😊</Text>
                  <View style={styles.insightIconContainer}>
                    <Text style={styles.insightIconText}>→</Text>
                  </View>
                </View>
              </TouchableOpacity>
              
              {/* Add Info Insight */}
              <TouchableOpacity 
                style={[styles.insightBox, { backgroundColor: "#E6B87E" }]}
                onPress={() => handleInsightPress("addInfo")}
                activeOpacity={0.7}
              >
                <View style={styles.insightContent}>
                  <Text style={styles.insightText}>Add info</Text>
                  <Text style={styles.insightEmoji}>✏️</Text>
                  <View style={styles.insightIconContainer}>
                    <Text style={styles.insightIconText}>+</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>

      {/* CYCLE DAY MODAL - Amazon-like tracker */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={cycleModalVisible}
        onRequestClose={() => setCycleModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Your Cycle Progress</Text>
              <TouchableOpacity onPress={() => setCycleModalVisible(false)}>
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.cycleTracker}>
              <View style={styles.cycleInfo}>
                <Text style={styles.cycleInfoTitle}>Cycle Day 18 of 28</Text>
                <Text style={styles.cycleInfoSubtitle}>You are in the Luteal Phase</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: `${(18/28) * 100}%` }]} />
                </View>
              </View>
              
              <View style={styles.phaseList}>
                {cyclePhases.map((phase, index) => (
                  <View key={phase.id} style={styles.phaseItem}>
                    <View style={[styles.phaseIcon, { backgroundColor: getPhaseColor(phase.status) }]}>
                      <Text style={styles.phaseIconText}>{phase.id}</Text>
                    </View>
                    
                    <View style={styles.phaseContent}>
                      <Text style={styles.phaseName}>{phase.phase} Phase</Text>
                      <Text style={styles.phaseDays}>Days {phase.days}</Text>
                      <Text style={styles.phaseDescription}>{phase.description}</Text>
                    </View>
                    
                    <View style={styles.phaseStatus}>
                      {phase.status === "completed" && (
                        <Text style={[styles.statusText, { color: "#A2D4AB" }]}>✓</Text>
                      )}
                      {phase.status === "active" && (
                        <View style={styles.activeDot} />
                      )}
                    </View>
                  </View>
                ))}
              </View>
              
              <View style={styles.tipsContainer}>
                <Text style={styles.tipsTitle}>Tips for Luteal Phase</Text>
                <Text style={styles.tipText}>• Stay hydrated and maintain electrolyte balance</Text>
                <Text style={styles.tipText}>• Include magnesium-rich foods like dark chocolate</Text>
                <Text style={styles.tipText}>• Gentle exercise like yoga or walking can help with symptoms</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* OVULATION MODAL - App Store style cards */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={ovulationModalVisible}
        onRequestClose={() => setOvulationModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ovulation Insights</Text>
              <TouchableOpacity onPress={() => setOvulationModalVisible(false)}>
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.ovulationContainer}>
              <View style={styles.ovulationHeader}>
                <View style={styles.ovulationIconCircle}>
                  <Text style={styles.ovulationIconText}>🌟</Text>
                </View>
                <Text style={styles.ovulationTitle}>Coming in 3 Days</Text>
                <Text style={styles.ovulationSubtitle}>Track your symptoms to predict with better accuracy</Text>
              </View>
              
              <FlatList
                data={ovulationCards}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View style={[styles.ovulationCard, { backgroundColor: item.color }]}>
                    <Text style={styles.cardEmoji}>{item.icon}</Text>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardDescription}>{item.description}</Text>
                  </View>
                )}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={styles.cardList}
              />
              
              <View style={styles.ovulationCalendar}>
                <Text style={styles.calendarTitle}>Your Fertility Window</Text>
                <View style={styles.fertilityTimeline}>
                  <View style={styles.timelineBar} />
                  <View style={styles.timelineDays}>
                    {[...Array(7)].map((_, i) => (
                      <View 
                        key={i} 
                        style={[
                          styles.timelineDay, 
                          i >= 2 && i <= 4 ? styles.fertileDayCircle : null
                        ]}
                      >
                        <Text style={styles.timelineDayText}>{i + 9}</Text>
                        {i === 3 && (
                          <View style={styles.ovulationDayMarker}>
                            <Text style={styles.ovulationDayText}>O</Text>
                          </View>
                        )}
                      </View>
                    ))}
                  </View>
                </View>
                <View style={styles.legendContainer}>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: "#F9C784" }]} />
                    <Text style={styles.legendText}>Fertile Window</Text>
                  </View>
                  <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: "#E8B7D4" }]} />
                    <Text style={styles.legendText}>Ovulation Day</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* SYMPTOMS MODAL - With sliders */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={symptomsModalVisible}
        onRequestClose={() => setSymptomsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>How are you feeling today?</Text>
              <TouchableOpacity onPress={() => setSymptomsModalVisible(false)}>
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.symptomsContainer}>
              {/* Mood Slider */}
              <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>Mood</Text>
                <View style={styles.sliderRow}>
                  <Text style={styles.sliderEmoji}>😢</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={4}
                    step={1}
                    value={moodValue}
                    onValueChange={setMoodValue}
                    minimumTrackTintColor="#E8B7D4"
                    maximumTrackTintColor="#EBEBEB"
                    thumbTintColor="#D16B66"
                  />
                  <Text style={styles.sliderEmoji}>😊</Text>
                </View>
                <Text style={styles.sliderValueText}>Today you're feeling: {getMoodEmoji(moodValue)}</Text>
              </View>
              
              {/* Pain Slider */}
              <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>Discomfort Level</Text>
                <View style={styles.sliderRow}>
                  <Text style={styles.sliderEmoji}>😌</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={4}
                    step={1}
                    value={painValue}
                    onValueChange={setPainValue}
                    minimumTrackTintColor="#E8B7D4"
                    maximumTrackTintColor="#EBEBEB"
                    thumbTintColor="#D16B66"
                  />
                  <Text style={styles.sliderEmoji}>😖</Text>
                </View>
                <Text style={styles.sliderValueText}>Current discomfort: {getPainEmoji(painValue)}</Text>
              </View>
              
              {/* Energy Slider */}
              <View style={styles.sliderContainer}>
                <Text style={styles.sliderLabel}>Energy Level</Text>
                <View style={styles.sliderRow}>
                  <Text style={styles.sliderEmoji}>😴</Text>
                  <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={4}
                    step={1}
                    value={energyValue}
                    onValueChange={setEnergyValue}
                    minimumTrackTintColor="#E8B7D4"
                    maximumTrackTintColor="#EBEBEB"
                    thumbTintColor="#D16B66"
                  />
                  <Text style={styles.sliderEmoji}>⚡</Text>
                </View>
                <Text style={styles.sliderValueText}>Energy today: {getEnergyEmoji(energyValue)}</Text>
              </View>
              
              {/* Recommendations based on mood */}
              <View style={styles.recommendationsContainer}>
                <Text style={styles.recommendationsTitle}>Recommended for You Today</Text>
                
                {/* Playlist Recommendations */}
                <View style={styles.recommendationSection}>
                  <Text style={styles.recommendationSectionTitle}>Playlists</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {playlists.map(playlist => (
                      <TouchableOpacity key={playlist.id} style={styles.playlistCard}>
                        <Text style={styles.playlistEmoji}>{playlist.emoji}</Text>
                        <Text style={styles.playlistName}>{playlist.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
                
                {/* Book Recommendations */}
                <View style={styles.recommendationSection}>
                  <Text style={styles.recommendationSectionTitle}>Books</Text>
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {books.map(book => (
                      <TouchableOpacity key={book.id} style={styles.bookCard}>
                        <View style={styles.bookCover}>
                          <Text style={styles.bookEmoji}>📚</Text>
                        </View>
                        <Text style={styles.bookTitle}>{book.title}</Text>
                        <Text style={styles.bookAuthor}>{book.author}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => setSymptomsModalVisible(false)}
              >
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ADD INFO MODAL - Cute form */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={addInfoModalVisible}
        onRequestClose={() => setAddInfoModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tell us about your day</Text>
              <TouchableOpacity onPress={() => setAddInfoModalVisible(false)}>
                <Text style={styles.closeButton}>×</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.formContainer}>
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>How was your flow today?</Text>
                <View style={styles.flowButtons}>
                  {["None", "Light", "Medium", "Heavy"].map((flow, index) => (
                    <TouchableOpacity 
                      key={index} 
                      style={[
                        styles.flowButton, 
                        index === 1 ? styles.flowButtonSelected : null
                      ]}
                    >
                      <Text 
                        style={[
                          styles.flowButtonText,
                          index === 1 ? styles.flowButtonTextSelected : null
                        ]}
                      >
                        {flow}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Symptoms experienced</Text>
                <View style={styles.symptomsGrid}>
                  {symptoms.map((symptom, index) => (
                    <TouchableOpacity key={index} style={styles.symptomButton}>
                      <Text style={styles.symptomText}>{symptom}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Self-care activities today</Text>
                <View style={styles.selfCareOptions}>
                  {["Rest", "Exercise", "Meditation", "Hot bath", "Reading"].map((activity, index) => (
                    <TouchableOpacity key={index} style={styles.selfCareButton}>
                      <Text style={styles.selfCareText}>{activity}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Journal Entry</Text>
                <View style={styles.journalContainer}>
                  <TextInput
                    style={styles.journalInput}
                    multiline
                    numberOfLines={4}
                    placeholder="How are you feeling today? Any thoughts you want to remember?"
                    value={noteText}
                    onChangeText={setNoteText}
                  />
                </View>
              </View>
              
              <View style={styles.formSection}>
                <Text style={styles.formSectionTitle}>Daily Question</Text>
                <View style={styles.questionCard}>
                  <Text style={styles.questionText}>Did you stay hydrated today?</Text>
                  <View style={styles.questionOptions}>
                    <TouchableOpacity style={styles.questionOption}>
                      <Text style={styles.questionOptionText}>Yes! 💧</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.questionOption}>
                      <Text style={styles.questionOptionText}>Not enough 😕</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.saveButton}
                onPress={() => setAddInfoModalVisible(false)}
              >
                <Text style={styles.saveButtonText}>Save Information</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
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
    fontWeight: "400",
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
    marginBottom: 15,
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
    marginHorizontal: -5,
  },
  insightBox: {
    width: insightBoxWidth,
    marginHorizontal: 5,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  insightContent: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 8,
  },
  insightText: {
    fontSize: 12,
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
  insightNumber: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 5,
  },
  insightEmoji: {
    fontSize: 22,
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
  
  // MODAL STYLES
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  closeButton: {
    fontSize: 28,
    color: "#666",
    padding: 5,
  },
  
  // CYCLE TRACKER MODAL STYLES
  cycleTracker: {
    flex: 1,
    padding: 15,
  },
  cycleInfo: {
    backgroundColor: "#FAF1F1",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
  },
  cycleInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#D16B66",
    marginBottom: 5,
  },
  cycleInfoSubtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 10,
  },
  progressBarContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#E0E0E0",
    borderRadius: 5,
    marginTop: 5,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#D16B66",
  },
  phaseList: {
    marginTop: 10,
  },
  phaseItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 25,
  },
  phaseIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  phaseIconText: {
    color: "#fff",
    fontWeight: "bold",
  },
  phaseContent: {
    flex: 1,
  },
  phaseName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 2,
  },
  phaseDays: {
    color: "#666",
    fontSize: 14,
    marginBottom: 2,
  },
  phaseDescription: {
    color: "#333",
    fontSize: 14,
  },
  phaseStatus: {
    width: 24,
    alignItems: "center",
  },
  statusText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  activeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#F9C784",
  },
  tipsContainer: {
    backgroundColor: "#F4F9F4",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4E8D7C",
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: "#333",
    marginBottom: 6,
  },
  
  // OVULATION MODAL STYLES
  ovulationContainer: {
    flex: 1,
    padding: 15,
  },
  ovulationHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  ovulationIconCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F9F3F3",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  ovulationIconText: {
    fontSize: 30,
  },
  ovulationTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#E8B7D4",
    marginBottom: 5,
  },
  ovulationSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  cardList: {
    paddingVertical: 10,
  },
  ovulationCard: {
    width: 250,
    height: 180,
    borderRadius: 20,
    padding: 15,
    marginRight: 15,
    justifyContent: "center",
  },
  cardEmoji: {
    fontSize: 36,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  ovulationCalendar: {
    marginTop: 20,
    backgroundColor: "#F9F9F9",
    borderRadius: 15,
    padding: 15,
  },
  calendarTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  fertilityTimeline: {
    marginTop: 10,
  },
  timelineBar: {
    height: 3,
    backgroundColor: "#E0E0E0",
    position: "absolute",
    top: 22,
    left: 15,
    right: 15,
    zIndex: 1,
  },
  timelineDays: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  timelineDay: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    zIndex: 2,
  },
  fertileDayCircle: {
    backgroundColor: "#F9C784",
    borderColor: "#F9C784",
  },
  timelineDayText: {
    fontSize: 12,
    fontWeight: "bold",
  },
  ovulationDayMarker: {
    position: "absolute",
    top: -4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#E8B7D4",
    alignItems: "center",
    justifyContent: "center",
  },
  ovulationDayText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#fff",
  },
  legendContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "center",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#666",
  },
  
  // SYMPTOMS MODAL STYLES
  symptomsContainer: {
    flex: 1,
    padding: 15,
  },
  sliderContainer: {
    marginBottom: 20,
    backgroundColor: "#F9F9F9",
    borderRadius: 15,
    padding: 15,
  },
  sliderLabel: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  sliderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  slider: {
    flex: 1,
    height: 40,
    marginHorizontal: 10,
  },
  sliderEmoji: {
    fontSize: 20,
  },
  sliderValueText: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    marginTop: 5,
  },
  recommendationsContainer: {
    marginTop: 10,
  },
  recommendationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
  },
  recommendationSection: {
    marginBottom: 20,
  },
  recommendationSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  playlistCard: {
    width: 120,
    height: 120,
    backgroundColor: "#F0F7FF",
    borderRadius: 15,
    marginRight: 10,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  playlistEmoji: {
    fontSize: 30,
    marginBottom: 10,
  },
  playlistName: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  bookCard: {
    width: 120,
    marginRight: 10,
    alignItems: "center",
  },
  bookCover: {
    width: 80,
    height: 110,
    backgroundColor: "#F9F3F3",
    borderRadius: 8,
    marginBottom: 5,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  bookEmoji: {
    fontSize: 24,
  },
  bookTitle: {
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    color: "#333",
  },
  bookAuthor: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
  saveButton: {
    backgroundColor: "#D16B66",
    borderRadius: 25,
    paddingVertical: 12,
    marginTop: 20,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
  
  // ADD INFO MODAL STYLES
  formContainer: {
    flex: 1,
    padding: 15,
  },
  formSection: {
    marginBottom: 20,
  },
  formSectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  flowButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  flowButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#F9F9F9",
    borderRadius: 25,
    marginHorizontal: 5,
  },
  flowButtonSelected: {
    backgroundColor: "#E8B7D4",
  },
  flowButtonText: {
    fontSize: 14,
    color: "#666",
  },
  flowButtonTextSelected: {
    color: "#fff",
    fontWeight: "bold",
  },
  symptomsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  symptomButton: {
    width: "30%",
    backgroundColor: "#F9F9F9",
    borderRadius: 15,
    paddingVertical: 10,
    alignItems: "center",
    margin: 5,
  },
  symptomText: {
    fontSize: 12,
    color: "#666",
  },
  selfCareOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -5,
  },
  selfCareButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#F4F9F4",
    borderRadius: 20,
    margin: 5,
  },
  selfCareText: {
    fontSize: 12,
    color: "#4E8D7C",
  },
  journalContainer: {
    backgroundColor: "#FFF9F9",
    borderRadius: 15,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  journalInput: {
    minHeight: 100,
    textAlignVertical: "top",
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  questionCard: {
    backgroundColor: "#F0F7FF",
    borderRadius: 15,
    padding: 15,
  },
  questionText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
  },
  questionOptions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  questionOption: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  questionOptionText: {
    fontSize: 14,
    color: "#333",
  }
});

export default HomeScreen;