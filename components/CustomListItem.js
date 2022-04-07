import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";
import {
  addDoc,
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { auth, db } from "../utils/firebase";

const CustomListItem = ({ id, chatName, enterChatHandler }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const colRef = collection(db, `/chats/${id}`, "messages");
    const q = query(colRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = [];
      querySnapshot?.forEach((doc) => {
        messages?.push(doc?.data());
      });
      setChatMessages(messages);
    });
    return unsubscribe;
  }, []);

  return (
    <ListItem
      key={id}
      onPress={() => enterChatHandler(id, chatName)}
      bottomDivider
    >
      <Avatar rounded source={{ uri: "https://picsum.photos/340" }} />
      <ListItem.Content>
        <ListItem.Title>{chatName}</ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages?.[0]?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({});

export default CustomListItem;
