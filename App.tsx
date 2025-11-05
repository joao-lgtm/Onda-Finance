import { AppProviders } from "@/providers/AppProviders";
import { ScreenProvider } from "@/providers/ScreenProvider";
import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <AppProviders>
      <StatusBar backgroundColor="#000" style="light" />
      <ScreenProvider>
        <AppNavigator/>
      </ScreenProvider>
    </AppProviders>
  );
}
