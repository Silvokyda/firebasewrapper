import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { initializeApp, getApps } from '@react-native-firebase/app'; 
import SampleComponent from './SampleComponent';

const firebaseConfig = {
  apiKey: "AIzaSyCTDTDVKuIpz5ojHJI7fVUwA-UTCBS7ktU",
  authDomain: "al-salam-af8a5.firebaseapp.com",
  projectId: "al-salam-af8a5",
  storageBucket: "al-salam-af8a5.appspot.com",
  messagingSenderId: "87213785550",
  appId: "1:87213785550:web:8679a504db714288752b9f",
  measurementId: "G-4GN309G6DY",
};

const App = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    const initializeFirebase = async () => {
      console.log('Initializing Firebase...');
      try {
        if (!getApps().length) {
          await initializeApp(firebaseConfig);
          console.log('Firebase initialized successfully!');
        }
        setFirebaseInitialized(true); 
      } catch (error) {
        console.error('Error initializing Firebase:', error);
      }
    };

    initializeFirebase();
  }, []);
  

  if (!firebaseInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading Firebase...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <SampleComponent />
    </View>
  );
};

export default App;
