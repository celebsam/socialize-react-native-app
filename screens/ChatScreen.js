import React, { useLayoutEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import {
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Avatar } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";

const ChatScreen = ({ navigation }) => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const route = useRoute();
  const { id, chatName } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar
            source={{
              uri:
                chatMessages[0]?.data?.photoURL || "https://picsum.photos/200",
            }}
            rounded
          />
          <Text style={styles.chatTitle}>{chatName}</Text>
        </View>
      ),
    });
  }, [navigation, chatMessages]);

  const sendMessageHandler = () => {
    const colRef = collection(db, `/chats/${id}`, "messages");

    addDoc(colRef, {
      timestamp: serverTimestamp(),
      message: message,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    })
      .then(() => {
        setMessage("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useLayoutEffect(() => {
    const colRef = collection(db, `/chats/${id}`, "messages");
    const q = query(colRef, orderBy("timestamp"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot?.forEach((doc) => {
        messages?.push({
          id: doc?.id,
          message: doc?.data(),
        });
      });
      setChatMessages(messages);
    });
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <ScrollView style={{ marginTop: 20, paddingHorizontal: 4 }}>
          {chatMessages?.map(({ id, message }) =>
            message?.email === auth?.currentUser?.email ? (
              <View key={id} style={styles.sender}>
                <Avatar
                  rounded
                  source={{ uri: message.photoURL }}
                  containerStyle={{ alignSelf: "flex-end" }}
                />
                <Text style={styles.senderText}>{message?.message}</Text>
              </View>
            ) : (
              <View key={id} style={styles.receiver}>
                <Avatar rounded source={{ uri: message.photoURL }} />
                <Text style={styles.receiverText}>{message?.message}</Text>
                <Text style={styles.receiverName}>{message?.displayName}</Text>
              </View>
            )
          )}
        </ScrollView>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Type message"
            value={message}
            onChangeText={(text) => setMessage(text)}
            style={styles.input}
          />
          <TouchableOpacity activeOpacity={0.5} onPress={sendMessageHandler}>
            <Ionicons name="send" size={32} color="#7D2AE8" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatTitle: {
    color: "white",
    textTransform: "capitalize",
    fontSize: 21,
    marginLeft: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginBottom: 10,
  },
  input: {
    width: "90%",
    color: "black",
    fontSize: 15,
    flex: 1,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 30,
    marginRight: 10,
  },
  sender: {
    padding: 16,
    backgroundColor: "#eee",
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 10,
    maxWidth: "800%",
    position: "relative",
    alignSelf: "flex-end",
  },
  receiver: {
    padding: 16,
    backgroundColor: "#7D2AE8",
    borderRadius: 30,
    marginRight: 10,
    marginBottom: 10,
    maxWidth: "800%",
    position: "relative",
    alignSelf: "flex-start",
    color: "white",
  },
  receiverText: {
    fontSize: 16,
    color: "white",
  },
  receiverName: {
    color: "turquoise",
    paddingTop: 5,
  },
});

export default ChatScreen;
