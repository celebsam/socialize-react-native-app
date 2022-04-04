import { StatusBar } from "expo-status-bar";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import AddChatScreen from "./screens/AddChatScreen";
import Toast from "react-native-toast-message";
import ChatScreen from "./screens/chatScreen";

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#7D2AE8",
            },
            headerTitleStyle: { color: "#fff" },
            headerTintColor: "#fff",
            headerTitleAlign: "center",
          }}
          initialRouteName="Login"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Add Chat" component={AddChatScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({});
