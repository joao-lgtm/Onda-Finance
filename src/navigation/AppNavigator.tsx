import PortfolioScreen from "@/screens/PortfolioScreen";
import AssetScreen from "@/screens/assets";
import HomeScreen from "@/screens/home";
import ReceiveScreen from "@/screens/receive";
import SendScreen from "@/screens/send";
import TransactionsScreen from "@/screens/transactions";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

export type RootStackParamList = {
  Home: undefined;
  Portfolio: undefined;
  Receive: undefined;
  Send: undefined;
  Transactions: undefined;
  Asset: { symbol: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Portfolio" component={PortfolioScreen} />
      <Stack.Screen name="Receive" component={ReceiveScreen} />
      <Stack.Screen name="Send" component={SendScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />
      <Stack.Screen name="Asset" component={AssetScreen} />
    </Stack.Navigator>
  );
}
