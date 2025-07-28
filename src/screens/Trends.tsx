// src/screens/Trends.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Trends: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Trends Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, fontWeight: '500' },
});

export default Trends;
