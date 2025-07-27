import { StyleSheet, View } from 'react-native';
import GoogleSignInButton from './GoogleSignIn';
import EmailSignIn from './EmailSignIn';

export default function App() {
   return (
    <View style={styles.container}>
      <GoogleSignInButton />
      <EmailSignIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
