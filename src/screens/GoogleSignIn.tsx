// YourComponent.tsx (or .js)
import React, { useEffect } from 'react';
import { Button, View, Text } from 'react-native';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from './firebase'; // Your initialized Firebase auth instance

// This is important for Expo to handle web browser redirects
WebBrowser.maybeCompleteAuthSession();

const GoogleSignInButton = () => {
  // Replace these with your actual client IDs
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'TBD',
    iosClientId: 'TBD',
    scopes: ['profile', 'email'], // Request user's profile and email
  });

  
  useEffect(() => {
      console.log('Google Auth response:', response);
    // This effect runs whenever 'response' changes (after a login attempt)
    if (response?.type === 'success') {
      const { authentication } = response;
      if (authentication?.accessToken) {
        // Build a Firebase credential from the Google access token
        const credential = GoogleAuthProvider.credential(authentication.idToken);

        // Sign in with Firebase using the Google credential
        signInWithCredential(auth, credential)
          .then((userCredential) => {
            // Signed in successfully!
            const user = userCredential.user;
            console.log('Firebase user signed in:', user.displayName);
            // You can navigate or update UI here
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error('Firebase Google Sign-In Error:', errorMessage);
          });
      }
    } else if (response?.type === 'error') {
        console.error('Google Auth Session Error:', response.error);
    }
  }, [response]);

  const handleSignIn = async () => {
    console.log('Requesting Google sign-in...');
    try {
      const r = await promptAsync(); // Opens the Google login flow
      console.log('Prompt Async Response:', r);
    } catch (error) {
      console.error("Error during promptAsync:", error);
    }
  };

  return (
    <View>
      <Button
        title="Sign in with Google"
        disabled={!request} // Disable button if request isn't ready
        onPress={handleSignIn}
      />
      {/* You might display user status here */}
      <Text>User status: {auth.currentUser ? auth.currentUser.displayName : 'Not signed in'}</Text>
    </View>
  );
};

export default GoogleSignInButton;
