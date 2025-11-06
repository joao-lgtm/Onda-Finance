import i18n from "@/locales";
import { darkTheme, lightTheme } from "@/styles/theme";
import { ReactNode, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { Appearance } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "styled-components/native";

type Props = {
  children: ReactNode;
};

export function AppProviders({ children }: Props) {
  const [theme, setTheme] = useState(
    Appearance.getColorScheme() === "dark" ? darkTheme : lightTheme
  );
 
  return (
    <SafeAreaProvider>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </I18nextProvider>
    </SafeAreaProvider>
  );
}
