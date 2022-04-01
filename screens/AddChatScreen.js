import React, { useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  View,
} from "react-native";
import { Button, Input } from "react-native-elements";
import { db } from "../utils/firebase";
import { collection, addDoc } from "firebase/firestore";
import Toast from "react-native-toast-message";

const AddChatScreen = ({ navigation }) => {
  const [chatName, setChatName] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats",
    });
  }, []);

  const createChatHandler = async () => {
    if (!chatName) {
      return alert("Please enter a chat name");
    }
    Keyboard.dismiss();
    try {
      await addDoc(collection(db, "chats"), {
        chatName: chatName,
      });
      Toast.show({
        type: "success",
        text1: "Created",
        text2: "Chat created successfully.",
      });
      navigation.goBack();
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log("dismiss");
        Keyboard.dismiss();
      }}
      accessible={false}
      style={styles.container}
    >
      <View style={styles.container}>
        <Input
          placeholder="Enter chat name"
          value={chatName}
          leftIcon={{ type: "entypo", name: "chat" }}
          onChangeText={(text) => setChatName(text)}
          style={{ paddingLeft: 5 }}
        />
        <Button title="Add chat" onPress={createChatHandler} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 30,
    flex: 1,
  },
});

export default AddChatScreen;
