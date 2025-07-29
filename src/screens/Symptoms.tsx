import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Symptoms: React.FC = () => (
  <View style={styles.container}>
    <Text style={styles.text}>Symptoms Screen</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, fontWeight: '500' },
});

export default Symptoms;
