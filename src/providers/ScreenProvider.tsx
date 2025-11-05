import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export function ScreenProvider({ children }: { children: ReactNode }) {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {children}
    </SafeAreaView>
  );
}
