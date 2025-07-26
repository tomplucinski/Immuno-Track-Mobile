import React, { useEffect } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebase';

WebBrowser.maybeCompleteAuthSession();

export default function GoogleSignInButton() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_EXPO_CLIENT_ID.apps.googleusercontent.com',
    iosClientId: 'YOUR_IOS_CLIENT_ID.apps.googleusercontent.com',
    androidClientId: 'YOUR_ANDROID_CLIENT_ID.apps.googleusercontent.com',
    scopes: ['profile', 'email'],
  });

  useEffect(() => {
    async function signInWithGoogleNative() {
      try {
        if (response?.type === 'success' && response.authentication?.idToken) {
          const { idToken } = response.authentication;
          const googleCredential = GoogleAuthProvider.credential(idToken);
          const userCredential = await signInWithCredential(auth, googleCredential);
          console.log("✅ Signed in with Firebase:", userCredential.user.email);
        }
      } catch (error: any) {
        console.error("❌ Firebase sign-in error:", error.code, error.message);
      }
    }

    if (response?.type === 'success') {
      signInWithGoogleNative();
    }
  }, [response]);

  return (
    <TouchableOpacity
      style={styles.buttonOutline}
      disabled={!request}
      onPress={() => promptAsync()}
    >
      <View style={styles.inner}>
        <Image
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png',
          }}
          style={styles.icon}
        />
        <Text style={styles.buttonOutlineText}>Sign in with Google</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonOutline: {
    borderColor: '#1976d2',
    borderWidth: 1.5,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonOutlineText: {
    color: '#1976d2',
    fontWeight: '600',
    fontSize: 16,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 12,
  },
});
