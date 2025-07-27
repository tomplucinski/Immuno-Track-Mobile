import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth } from '../../firebase';

// If you have defined your navigation stack types
type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
};

const EmailSignIn: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleSignIn = async () => {
    setError('');
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log('Success response', result);
      navigation.navigate('Home'); // 👈 Redirect to Home screen
    } catch (err: any) {
      console.error('Error signing in with email:', err);
      setError(err.message);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <Button title="Sign In with Email" onPress={handleSignIn} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { width: '80%' },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
  },
  error: { color: 'red', marginTop: 10 },
});

export default EmailSignIn;
