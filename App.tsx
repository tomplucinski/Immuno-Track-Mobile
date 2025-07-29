import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { TouchableOpacity } from 'react-native';
import AddHome from './src/screens/AddHome';
import EmailSignIn from './src/screens/EmailSignIn';
import Home from './src/screens/Home';
import Labs from './src/screens/Labs';
import Mood from './src/screens/Mood';
import Nutrition from './src/screens/Nutrition';
import OtherFactors from './src/screens/OtherFactors';
import Sleep from './src/screens/Sleep';
import Symptoms from './src/screens/Symptoms';
import Trends from './src/screens/Trends';
import { signOut } from 'firebase/auth';
import { auth } from './firebase'; // adjust path to your firebase config

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Labs') iconName = 'flask';
          else if (route.name === 'Trends') iconName = 'trending-up';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Labs" component={Labs} />
      <Tab.Screen name="Trends" component={Trends} />
    </Tab.Navigator>
  );
}

export default function App() {

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log('User signed out');
      // Optionally navigate to login screen
      // navigation.replace('Login');
    } catch (error) {
      console.error('Sign-out error:', error);
    }
  };

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignIn">
          <Stack.Screen
            name="SignIn"
            component={EmailSignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="AddHome" component={AddHome} />
          <Stack.Screen name="Mood" component={Mood} />
          <Stack.Screen name="Symptoms" component={Symptoms} />
          <Stack.Screen name="Sleep" component={Sleep} />
          <Stack.Screen name="Nutrition" component={Nutrition} />
          <Stack.Screen name="OtherFactors" component={OtherFactors} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home',
              headerRight: () => (
                <TouchableOpacity
                  onPress={handleSignOut}
                  style={{ marginRight: 16 }}
                >
                  <Ionicons name="log-out-outline" size={24} color="#333" />
                </TouchableOpacity>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
