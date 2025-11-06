import { UserProvider } from "@/contexts/UserContext";
import { AppProviders } from "@/providers/AppProviders";
import { ScreenProvider } from "@/providers/ScreenProvider";
import { StatusBar } from "expo-status-bar";

import Toast from "react-native-toast-message";
import RootNavigator from "./src/navigation/RootNavigator";

export default function App() {
  return (
    <AppProviders>
      <UserProvider>
        <StatusBar backgroundColor="#000" style="light" />
        <ScreenProvider>
          <RootNavigator />
          <Toast />
        </ScreenProvider>
      </UserProvider>
    </AppProviders>
  );
}
