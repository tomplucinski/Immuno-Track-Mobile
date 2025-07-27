import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import { signOut } from 'firebase/auth';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AvatarButton from '../components/AvatarButton';
import PreferencesModal from '../components/PreferencesModal';
import { auth } from '../../firebase';

type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
};

const Home: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [showPreferences, setShowPreferences] = useState(false);

  const userEmail = auth.currentUser?.email || 'No email';

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.replace('SignIn');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text}>Welcome 🎉</Text>
        <AvatarButton onPress={() => setShowPreferences(true)} />
      </View>

      <Button title="Sign Out" onPress={handleSignOut} />

      <PreferencesModal
        visible={showPreferences}
        onClose={() => setShowPreferences(false)}
        email={userEmail}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
  },
});

export default Home;
