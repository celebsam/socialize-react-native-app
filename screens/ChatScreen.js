import React, { useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-elements";

const ChatScreen = ({ navigation }) => {
  const route = useRoute();
  const { id, chatName } = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitle: () => (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Avatar source={{ uri: "https://picsum.photos/200" }} rounded />
          <Text style={styles.chatTitle}>{chatName}</Text>
        </View>
      ),
    });
  }, [navigation]);

  return (
    <View>
      <Text>ChatScreen</Text>
      <Text>{chatName} is</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chatTitle: {
    color: "white",
    textTransform: "capitalize",
    fontSize: 21,
    marginLeft: 15,
  },
});

export default ChatScreen;
