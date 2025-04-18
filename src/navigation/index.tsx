import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Import screens
import BrandingScreen from '../screens/BrandingScreen';
import UsernameScreen from '../screens/UsernameScreen';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LogPeriodScreen from '../screens/LogPeriodScreen';

// Onboarding Screens
import WelcomeScreen from '../screens/Onboarding/WelcomeScreen';
import LastPeriodScreen from '../screens/Onboarding/LastPeriodScreen';
import CycleLengthScreen from '../screens/Onboarding/CycleLengthScreen';
import PeriodLengthScreen from '../screens/Onboarding/PeriodLengthScreen';

// Define navigation types
type RootStackParamList = {
  Branding: undefined;
  Username: undefined;
  Onboarding: undefined;
  Main: undefined;
  LogPeriod: undefined;
};

type OnboardingStackParamList = {
  Welcome: undefined;
  LastPeriod: undefined;
  CycleLength: { lastPeriod: string };
  PeriodLength: { lastPeriod: string; cycleLength: number };
};

type MainTabParamList = {
  Home: undefined;
  Calendar: undefined;
  Profile: undefined;
};

// Create the navigators
const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

// Onboarding navigator component
const OnboardingNavigator = () => (
  <OnboardingStack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
    }}
  >
    <OnboardingStack.Screen name="Welcome" component={WelcomeScreen} />
    <OnboardingStack.Screen name="LastPeriod" component={LastPeriodScreen} />
    <OnboardingStack.Screen name="CycleLength" component={CycleLengthScreen} />
    <OnboardingStack.Screen name="PeriodLength" component={PeriodLengthScreen} />
  </OnboardingStack.Navigator>
);

// Main app navigator component with bottom tabs
const MainNavigator = () => (
  <MainTab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap;
        if (route.name === 'Home') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Calendar') {
          iconName = focused ? 'calendar' : 'calendar-outline';
        } else {
          iconName = focused ? 'person' : 'person-outline';
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#FF6B81',
      tabBarInactiveTintColor: '#666',
    })}
  >
    <MainTab.Screen name="Home" component={HomeScreen} />
    <MainTab.Screen name="Calendar" component={CalendarScreen} />
    <MainTab.Screen name="Profile" component={ProfileScreen} />
  </MainTab.Navigator>
);

// Root navigator
const AppNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);

  useEffect(() => {
    checkLoginStatus();
    checkOnboardingStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('@username');
      if (value) {
        setUsername(value);
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  const checkOnboardingStatus = async () => {
    try {
      const value = await AsyncStorage.getItem('@onboardingComplete');
      setHasCompletedOnboarding(!!value);
    } catch (error) {
      console.error('Error checking onboarding status:', error);
    }
  };

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <RootStack.Screen 
              name="Branding"
              children={(props) => (
                <BrandingScreen
                  {...props}
                  onStartNow={() => props.navigation.navigate('Username')}
                />
              )}
            />
            <RootStack.Screen 
              name="Username"
              children={(props) => (
                <UsernameScreen
                  {...props}
                  setIsLoggedIn={setIsLoggedIn}
                  setUsername={setUsername}
                />
              )}
            />
          </>
        ) : !hasCompletedOnboarding ? (
          <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
        ) : (
          <>
            <RootStack.Screen name="Main" component={MainNavigator} />
            <RootStack.Screen name="LogPeriod" component={LogPeriodScreen} />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;