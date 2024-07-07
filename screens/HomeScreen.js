import React from "react";
import { View, StyleSheet, Button } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { FirestoreWrapper } from "../wrappers/FirestoreWrapper";

export const HomeScreen = () => {
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const handleAsyncFirestoreRequest = () => {
    FirestoreWrapper.getDocument("mycollection", "ykFmHCtxjelXUtB6i7Sd")
      .then((data) => {
        console.log("Fetched document:", data);
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
      });
  };

  const handleSyncFirestoreRequest = () => {
    FirestoreWrapper.getCollection("mycollection")
      .then((data) => {
        console.log("Fetched collection:", data);
      })
      .catch((error) => {
        console.error("Error fetching collection:", error);
      });
  };

  const handleUpdateDocument = () => {
    FirestoreWrapper.updateDocument("mycollection", "ykFmHCtxjelXUtB6i7Sd", { content: "Updated content!" })
      .then((docId) => {
        console.log("Updated document with ID:", docId);
      })
      .catch((error) => {
        console.error("Error updating document:", error);
      });
  };

  const handleDeleteDocument = () => {
    FirestoreWrapper.deleteDocument("mycollection", "toBeDeletedDocId")
      .then((docId) => {
        console.log("Deleted document with ID:", docId);
      })
      .catch((error) => {
        console.error("Error deleting document:", error);
      });
  };

  const handleBatchedWrites = () => {
    const batchOperations = [
      { type: "set", collectionName: "mycollection", docId: "newDocId", data: { title: "New Document", content: "Hello Firestore!" } },
      { type: "update", collectionName: "mycollection", docId: "ykFmHCtxjelXUtB6i7Sd", data: { content: "Updated content!" } },
      { type: "delete", collectionName: "mycollection", docId: "toBeDeletedDocId" },
    ];

    FirestoreWrapper.batchedWrites(batchOperations)
      .then(() => {
        console.log("Batch operations completed successfully.");
      })
      .catch((error) => {
        console.error("Error performing batch operations:", error);
      });
  };

  const handleQueryWithWhere = () => {
    FirestoreWrapper.queryWithWhere("mycollection", "field", "==", "value")
      .then((data) => {
        console.log("Query results:", data);
      })
      .catch((error) => {
        console.error("Error querying collection:", error);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleLogout} />
      
      <View style={styles.buttonContainer}>
        <Button title="Sync Firestore Request" onPress={handleSyncFirestoreRequest} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Async Firestore Request" onPress={handleAsyncFirestoreRequest} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Update Document" onPress={handleUpdateDocument} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Delete Document" onPress={handleDeleteDocument} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Batched Writes" onPress={handleBatchedWrites} />
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Query With Where" onPress={handleQueryWithWhere} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginVertical: 10,
  },
});

export default HomeScreen;