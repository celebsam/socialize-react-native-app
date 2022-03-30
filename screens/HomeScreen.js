import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { StatusBar } from "expo-status-bar";
import CustomListItem from "../components/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth } from "../utils/firebase";

const HomeScreen = ({ navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Socialize",
      headerLeft: () => {
        <View>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </View>;
      },
    });
  }, []);

  console.log(auth?.currentUser?.photoURL);
  return (
    <ScrollView>
      <SafeAreaView></SafeAreaView>
      <StatusBar style="auto" />
      <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
      <Text>{auth?.currentUser?.photoURL}</Text>
      <Text>{auth?.currentUser?.displayName}</Text>
      <CustomListItem />
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
