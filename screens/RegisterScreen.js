import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView } from "react-native";
import { Text, Input, Button } from "react-native-elements";
import { auth } from "../utils/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [picture, setPicture] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerBackTitle: "Logn Screen",
    });
  }, [navigation]);

  const registerHandler = () => {
    if (!firstName || !lastName || !email || !password) {
      return alert("All fields are required!");
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser, {
          displayName: firstName + " " + lastName,
          photoURL: picture || "https://picsum.photos/340",
        })
          .then(() => {
            console.log("profile Updated");
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Text h3 style={styles.heading}>
        Create a Socialize account
      </Text>
      <View style={styles.inputContainer}>
        <Input
          placeholder="First Name"
          autofocus
          type="text"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <Input
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          type="text"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture"
          type="file"
          value={picture}
          onChangeText={(text) => setPicture(text)}
        />
      </View>
      <Button
        raised
        title="Rgister"
        containerStyle={styles.button}
        onPress={registerHandler}
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    marginBottom: 30,
    color: "#07B9D0",
  },
  inputContainer: {
    width: 350,
  },
  button: {
    width: 150,
    borderRadius: 20,
  },
});
