import { useUser } from "@/contexts/UserContext";
import LoginScreen from "@/screens/login";
import RegisterScreen from "@/screens/register";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import AppNavigator from "./AppNavigator";

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useUser();

  if (loading) return null;

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="App" component={AppNavigator} />
        ) : (
          <>
            <RootStack.Screen name="Login" component={LoginScreen} />
            <RootStack.Screen name="Register" component={RegisterScreen} /> 
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
