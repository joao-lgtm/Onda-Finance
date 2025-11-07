import { RootStackParamList } from "@/navigation/AppNavigator";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "styled-components/native";

type Props = NativeStackScreenProps<RootStackParamList, "Asset">;

export default function AssetScreen({ route }: Props) {
  const { symbol } = route.params;
  const theme = useTheme();
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text, fontSize: 24, fontWeight: "bold" }}>
        Detalhes do Ativo
      </Text>
      <Text style={{ color: theme.colors.text_secondary, fontSize: 18, marginTop: 8 }}>
        {symbol}
      </Text>
    </View>
  );
}
