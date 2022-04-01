import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth, db } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { Feather } from "@expo/vector-icons";
import { collection, getDocs } from "firebase/firestore";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const colRef = collection(db, "chats");
    getDocs(colRef)
      .then((snapshot) => {
        let chats = [];
        snapshot.docs.forEach((doc) => {
          chats.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setChats(chats);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const signOutHandler = () => {
    if (showConfirmDialog(navigation)) {
    }
  };

  const showConfirmDialog = (navigation) => {
    return Alert.alert("Are your sure?", "Are you sure you want to logout?", [
      {
        text: "Yes",
        onPress: () => {
          signOut(auth)
            .then(() => {
              navigation.replace("Login");
            })
            .catch((err) => {
              alert(err.message);
            });
        },
      },
      {
        text: "No",
      },
    ]);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Socialize",
      headerLeft: () => (
        <TouchableOpacity onPress={signOutHandler}>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity activeOpacity={0.5}>
            <Feather name="camera" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate("Add Chat")}
          >
            <Feather name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, []);

  console.log(auth?.currentUser?.photoURL);
  return (
    <ScrollView>
      <SafeAreaView></SafeAreaView>
      <StatusBar style="auto" />
      {chats.map((chat) => (
        <CustomListItem key={chat.id} id={chat.id} chatName={chat.chatName} />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  headerRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 67,
    marginRight: 7,
  },
});

export default HomeScreen;
