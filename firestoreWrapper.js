import firestore from '@react-native-firebase/firestore';

const firestoreWrapper = new Proxy(firestore, {
  get(target, propKey) {
    const originalValue = target[propKey];

    if (typeof originalValue === 'function') {
      return async function (...args) {
        const startTime = Date.now();

        const result = await originalValue.apply(target, args);
        
        const endTime = Date.now();
        const elapsedTimeMs = endTime - startTime;

        console.log(`Firestore async call (${propKey}) took ${elapsedTimeMs} ms`);

        return result; 
      };
    }

    return originalValue; 
  }
});

export default firestoreWrapper;
