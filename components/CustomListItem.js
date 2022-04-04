import React from "react";
import { StyleSheet } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const CustomListItem = ({ id, chatName, enterChatHandler }) => {
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
          This is the subtitle and just trying to make it long for nothing.
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

const styles = StyleSheet.create({});

export default CustomListItem;
