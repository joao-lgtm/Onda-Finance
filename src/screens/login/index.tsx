import { useUser } from "@/contexts/UserContext";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Platform, Pressable, Text } from "react-native";
import {
  Button,
  ButtonText,
  Container,
  ErrorText,
  HeaderContainer,
  Input,
  InputContainer,
  Title,
} from "./style";

export default function LoginScreen() {
  const { t } = useTranslation();
  const { signIn, loading } = useUser();
  const navigation = useNavigation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    setError(null);

    if (!username.trim() || !password) {
      setError(t("loginErrorEmpty"));
      return;
    }

    try {
      setLocalLoading(true);
      await signIn(username.trim(), password);
    } catch (err: any) {
      setError(err?.message ?? t("loginErrorAuth"));
    } finally {
      setLocalLoading(false);
    }
  };

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
      <HeaderContainer>
        <Title>{t("login")}</Title>
      </HeaderContainer>

      <InputContainer>
        <Input
          placeholder={t("usernamePlaceholder")}
          placeholderTextColor="#666"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <Input
          placeholder={t("passwordPlaceholder")}
          placeholderTextColor="#666"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {error && <ErrorText>{error}</ErrorText>}

        <Button onPress={submit} disabled={localLoading || loading}>
          {localLoading || loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ButtonText>{t("login")}</ButtonText>
          )}
        </Button>

        <Pressable
          onPress={() => navigation.navigate("Register" as never)}
          style={{ marginTop: 16 }}
        >
          <Text style={{ color: "#00C56E", textAlign: "center" }}>
            Não possui conta? Registrar
          </Text>
        </Pressable>
      </InputContainer>
    </Container>
  );
}
