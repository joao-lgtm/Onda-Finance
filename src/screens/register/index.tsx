import { useUser } from "@/contexts/UserContext";
import { createUser, findUserByUsername } from "@/data/mockDb";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Alert, Platform } from "react-native";
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

export default function RegisterScreen() {
    const { t } = useTranslation();
    const { users } = useUser();
    const navigation = useNavigation<any>();

    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const submit = async () => {
        setError(null);

        if (!username.trim() || !password || !name.trim()) {
            setError("Preencha todos os campos");
            return;
        }

        const existingUser = await findUserByUsername(username.trim().toLowerCase());
        if (existingUser) {
            setError("Usuário já existe");
            return;
        }

        try {
            setLoading(true);

            await createUser({
                username: username.trim().toLowerCase(),
                name: name.trim(),
                password,
                balanceUsd: 1000,
            });

            Alert.alert("Sucesso", "Usuário criado com sucesso!");
            setUsername("");
            setPassword("");
            setName("");

            navigation.navigate("Login");
        } catch (err: any) {
            console.error(err);
            setError("Erro ao criar usuário");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <HeaderContainer>
                <Title>Registrar</Title>
            </HeaderContainer>

            <InputContainer>
                <Input
                    placeholder="Nome"
                    placeholderTextColor="#666"
                    value={name}
                    onChangeText={setName}
                />
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

                <Button onPress={submit} disabled={loading}>
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <ButtonText>Registrar</ButtonText>
                    )}
                </Button>
            </InputContainer>
        </Container>
    );
}
