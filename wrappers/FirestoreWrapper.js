import { getFirestore, collection, getDocs, addDoc, doc, getDoc, updateDoc, deleteDoc, query, where, writeBatch } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import Constants from "expo-constants";

// Initialize Firebase
const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.apiKey,
  authDomain: Constants.expoConfig?.extra?.authDomain,
  projectId: Constants.expoConfig?.extra?.projectId,
  storageBucket: Constants.expoConfig?.extra?.storageBucket,
  messagingSenderId: Constants.expoConfig?.extra?.messagingSenderId,
  appId: Constants.expoConfig?.extra?.appId,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const FirestoreWrapper = {
  // Function to log execution time for async operations
  logExecutionTime: async (func, ...args) => {
    const startTime = Date.now();
    const result = await func(...args);
    const endTime = Date.now();
    console.log(`${func.name} took ${endTime - startTime} ms`);
    return result;
  },

  // Asynchronous function with time logging for getDocument
  getDocument: async (collectionName, docId) => {
    return FirestoreWrapper.logExecutionTime(async () => {
      const docRef = doc(firestore, collectionName, docId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      } else {
        throw new Error("No such document!");
      }
    });
  },

  // Synchronous function for getCollection
  getCollection: async (collectionName) => {
    const querySnapshot = await getDocs(collection(firestore, collectionName));
    const docsArray = [];
    querySnapshot.forEach((doc) => {
      docsArray.push({ id: doc.id, ...doc.data() });
    });
    return docsArray;
  },

  // Synchronous function for addDocument
  addDocument: async (collectionName, data) => {
    const docRef = await addDoc(collection(firestore, collectionName), data);
    return docRef.id;
  },

  // Asynchronous function with time logging for updateDocument
  updateDocument: async (collectionName, docId, data) => {
    return FirestoreWrapper.logExecutionTime(async () => {
      const docRef = doc(firestore, collectionName, docId);
      await updateDoc(docRef, data);
      return docRef.id;
    });
  },

  // Asynchronous function with time logging for deleteDocument
  deleteDocument: async (collectionName, docId) => {
    return FirestoreWrapper.logExecutionTime(async () => {
      const docRef = doc(firestore, collectionName, docId);
      await deleteDoc(docRef);
      return docRef.id;
    });
  },

  // Asynchronous function with time logging for batchedWrites
  batchedWrites: async (operations) => {
    const batch = writeBatch(firestore);

    operations.forEach(operation => {
      const { type, collectionName, docId, data } = operation;
      const docRef = doc(firestore, collectionName, docId);

      switch (type) {
        case "set":
          batch.set(docRef, data);
          break;
        case "update":
          batch.update(docRef, data);
          break;
        case "delete":
          batch.delete(docRef);
          break;
        default:
          console.error("Unsupported operation type:", type);
      }
    });

    try {
      await batch.commit();
    } catch (error) {
      console.error("Error performing batch operations:", error);
      throw error;
    }
  },

  // Asynchronous function with time logging for queryWithWhere
  queryWithWhere: async (collectionName, field, operator, value) => {
    return FirestoreWrapper.logExecutionTime(async () => {
      const q = query(collection(firestore, collectionName), where(field, operator, value));
      const querySnapshot = await getDocs(q);
      const docsArray = [];
      querySnapshot.forEach((doc) => {
        docsArray.push({ id: doc.id, ...doc.data() });
      });
      return docsArray;
    });
  },
};

export { FirestoreWrapper };