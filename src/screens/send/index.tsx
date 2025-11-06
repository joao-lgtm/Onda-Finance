import { useUser } from "@/contexts/UserContext";
import { findUserByUsername, incrementBalance } from "@/data/mockDb";
import { addTransaction, generateTransactionId } from "@/data/mockTransactionsDb";
import { useCurrencyConverter } from "@/hooks/useCurrencyRate";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator } from "react-native";
import Toast from "react-native-toast-message";
import { useTheme } from "styled-components/native";
import {
  BackButton,
  BalanceText,
  Container,
  ErrorText,
  Header,
  HeaderTitle,
  Label,
  PreviewCard,
  PreviewLabel,
  PreviewRow,
  PreviewValue,
  SendButton,
  SendButtonText,
  Separator,
  StyledInput,
} from "./style";

export default function SendScreen() {
  const { t } = useTranslation();
  const { user, updateBalance } = useUser();
  const { rate, brlValue } = useCurrencyConverter({
    initialUsd: user?.balanceUsd ?? 0,
  });
  const theme = useTheme();
  const navigation = useNavigation();

  const [destinatario, setDestinatario] = useState("");
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(false);

  const numericValue = Number(valor.replace(",", ".") || 0);
  const tax = useMemo(() => numericValue * 0.01, [numericValue]);
  const total = useMemo(() => numericValue + tax, [numericValue, tax]);

  const showToast = (type: "success" | "error", title: string, message?: string) => {
    Toast.show({
      type,
      text1: title,
      text2: message,
      position: "bottom",
      visibilityTime: 3500,
    });
  };

  const handleSend = async () => {
    if (!user) return showToast("error", t("error"), t("userNotFound"));
    if (!destinatario.trim())
      return showToast("error", t("error"), t("enterRecipient"));
    if (numericValue <= 0)
      return showToast("error", t("error"), t("enterValidAmount"));

    const recipient = await findUserByUsername(destinatario.trim().toLowerCase());
    if (!recipient) return showToast("error", t("error"), t("recipientNotFound"));
    if (recipient.id === user.id)
      return showToast("error", t("error"), t("cannotSendToSelf"));
    if (total > user.balanceUsd)
      return showToast("error", t("error"), t("insufficientBalance"));

    setLoading(true);
    try {
      await incrementBalance(user.id, -total);
      await incrementBalance(recipient.id, numericValue);
      await updateBalance(user.balanceUsd - total);

      const transaction = {
        id: generateTransactionId(),
        from: user.username,
        to: recipient.username,
        amount: numericValue,
        tax,
        total,
        date: new Date().toISOString(),
      };

      await addTransaction(transaction);

      showToast(
        "success",
        t("transactionCompleted"),
        t("sentAmount", {
          amount: numericValue.toFixed(2),
          name: recipient.name,
          tax: tax.toFixed(2),
        })
      );

      setDestinatario("");
      setValor("");
    } catch (error) {
      console.error(error);
      showToast("error", t("error"), t("transactionFailed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Ionicons name="chevron-back" size={22} color={theme.colors.text} />
        </BackButton>
        <HeaderTitle>{t("sendMoney")}</HeaderTitle>
      </Header>

      <PreviewCard style={{ marginTop: 10, marginBottom: 24 }}>
        <BalanceText>
          {t("yourBalanceUsd")}: <BalanceText bold>${user?.balanceUsd?.toFixed(2)}</BalanceText>
        </BalanceText>
        <Separator />
        <BalanceText>
          {t("yourBalanceBrl", { rate: rate.toFixed(2) })}:{" "}
          <BalanceText bold>R$ {brlValue.toFixed(2)}</BalanceText>
        </BalanceText>
      </PreviewCard>

      <Label>{t("recipient")}</Label>
      <StyledInput
        placeholder={t("exampleUsername")}
        placeholderTextColor={theme.colors.text_secondary}
        autoCapitalize="none"
        value={destinatario}
        onChangeText={setDestinatario}
      />
      {!destinatario && <ErrorText>{t("enterRecipient")}</ErrorText>}

      <Label>{t("amountUsd")}</Label>
      <StyledInput
        placeholder="0.00"
        placeholderTextColor={theme.colors.text_secondary}
        keyboardType="numeric"
        value={valor}
        onChangeText={(t) => setValor(t.replace(",", ".").replace(/[^\d.]/g, ""))}
      />
      {numericValue <= 0 && valor !== "" && <ErrorText>{t("enterValidAmount")}</ErrorText>}

      <PreviewCard>
        <PreviewRow>
          <PreviewLabel>{t("tax1Percent")}</PreviewLabel>
          <PreviewValue>$ {tax.toFixed(2)}</PreviewValue>
        </PreviewRow>
        <PreviewRow>
          <PreviewLabel>{t("total")}</PreviewLabel>
          <PreviewValue>$ {total.toFixed(2)}</PreviewValue>
        </PreviewRow>
      </PreviewCard>

      <SendButton onPress={handleSend} disabled={loading} activeOpacity={0.9}>
        {loading ? <ActivityIndicator color={theme.colors.card} /> : <SendButtonText>{t("send")}</SendButtonText>}
      </SendButton>
    </Container>
  );
}
