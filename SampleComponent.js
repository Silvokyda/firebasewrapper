import React from 'react';
import { View, Text, Button } from 'react-native';
import firestoreWrapper from './firestoreWrapper';

const SampleComponent = () => {

  const fetchData = async () => {
    try {
      const snapshot = await firestoreWrapper.collection('users').get();
      const docs = snapshot.docs.map(doc => doc.data());
      console.log('Firestore Data:', docs);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Sample Component</Text>
      <Button title="Fetch Data" onPress={fetchData} />
    </View>
  );
};

export default SampleComponent;
