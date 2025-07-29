import React, { memo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  ImageBackground,
  Platform,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';

const TILES = [
  { key: 'mood', title: 'Mood', icon: 'happy-outline', route: 'Mood', subtitle: 'Track feelings' },
  { key: 'symptoms', title: 'Symptoms', icon: 'medkit-outline', route: 'Symptoms', subtitle: 'Log flares' },
  { key: 'sleep', title: 'Sleep', icon: 'moon-outline', route: 'Sleep', subtitle: 'Hours & quality' },
  { key: 'nutrition', title: 'Nutrition', icon: 'nutrition-outline', route: 'Nutrition', subtitle: 'Meals & macros' },
  { key: 'factors', title: 'Other Factors', icon: 'leaf-outline', route: 'OtherFactors', subtitle: 'Stress, weather…' },
];

const HomeTile = memo(({ item, onPress }: { item: any; onPress: () => void }) => (
  <Pressable
    onPress={onPress}
    android_ripple={{ radius: 140 }}
    style={({ pressed }) => [
      styles.tile,
      pressed && Platform.OS === 'ios' ? { opacity: 0.8 } : null,
    ]}
  >
    <View style={styles.iconWrap}>
      <Ionicons name={item.icon} size={28} />
    </View>
    <Text style={styles.tileTitle}>{item.title}</Text>
    <Text style={styles.tileSubtitle}>{item.subtitle}</Text>
  </Pressable>
));

const Home: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      navigation.replace('SignIn');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        // source={require('../assets/health-bg.jpg')}
        resizeMode="cover"
        style={styles.background}
        imageStyle={{ opacity: 0.15 }}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Home</Text>
          <TouchableOpacity onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <FlatList
          data={TILES}
          keyExtractor={(it) => it.key}
          numColumns={2}
          columnWrapperStyle={styles.column}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => (
            <HomeTile item={item} onPress={() => navigation.navigate(item.route)} />
          )}
        />
      </ImageBackground>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 24,
  },
  header: {
    paddingHorizontal: 4,
    paddingTop: 10,
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#222',
  },
  listContent: {
    paddingBottom: 60,
  },
  column: {
    gap: 12,
    marginBottom: 12,
  },
  tile: {
    flex: 1,
    minHeight: 140,
    padding: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  tileTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111',
    marginBottom: 4,
  },
  tileSubtitle: {
    fontSize: 13,
    opacity: 0.6,
    color: '#333',
  },
});
