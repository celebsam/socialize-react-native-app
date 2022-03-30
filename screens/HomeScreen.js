import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth } from "../utils/firebase";
import { signOut } from "firebase/auth";
import { Feather } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
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
          <TouchableOpacity activeOpacity={0.5}>
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
      <CustomListItem />
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
