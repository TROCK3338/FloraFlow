import React from 'react';
import { View, Button, Text, StyleSheet, Image } from 'react-native';

interface BrandingScreenProps {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const BrandingScreen: React.FC<BrandingScreenProps> = ({ setIsLoggedIn }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/sihana-logo.png')} style={styles.logo} />
      <Text style={styles.text}>YOUR PERSONAL PERIOD TRACKER</Text>
      <Button title="Start Now" onPress={() => setIsLoggedIn(true)} />
    </View>
  );
};

export default BrandingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' },
  logo: { width: 200, height: 200, marginBottom: 20 },
  text: { fontSize: 18, fontWeight: 'bold', color: '#555', marginBottom: 20 },
});