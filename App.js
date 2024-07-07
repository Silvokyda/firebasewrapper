import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firestore from './firestoreWrapper'; 

export default function App() {
  const [asyncLog, setAsyncLog] = useState('');
  const [nonAsyncLog, setNonAsyncLog] = useState('');

  const handleAsyncRequest = async () => {
    try {
      const startTime = Date.now();
      const doc = await firestore().collection('testCollection').doc('testDoc').get();
      const endTime = Date.now();
      const log = `Async request took ${endTime - startTime} ms`;
      console.log('Document data:', doc.data());
      setAsyncLog(log);
    } catch (error) {
      console.error('Error fetching document:', error);
    }
  };

  const handleNonAsyncRequest = () => {
    const startTime = Date.now();
    const collectionRef = firestore().collection('testCollection');
    const endTime = Date.now();
    const log = `Non-async request took ${endTime - startTime} ms`;
    console.log('Collection ref:', collectionRef);
    setNonAsyncLog(log);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Firestore Wrapper Example</Text>
      <View style={styles.buttonContainer}>
        <Button title="Async Request" onPress={handleAsyncRequest} />
        <Text>{asyncLog}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Non-Async Request" onPress={handleNonAsyncRequest} />
        <Text>{nonAsyncLog}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 10,
  },
});
