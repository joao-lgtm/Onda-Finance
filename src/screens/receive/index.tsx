import { useUser } from "@/contexts/UserContext";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Clipboard from "expo-clipboard";
import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Alert, Dimensions, Modal } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { useTheme } from "styled-components/native";
import {
  BackButton,
  ButtonsRow,
  ButtonStyled,
  ButtonStyledPrimary,
  ButtonText,
  ButtonTextPrimary,
  Card,
  CardLabel,
  Container,
  InputWrapper,
  MerchantName,
  ModalBackdrop,
  ModalButtonsRow,
  ModalContainer,
  ModalLabel,
  ModalTitle,
  ModalValue,
  QRCodeWrapper,
  Row,
  Small,
  StyledInput,
  Title,
} from "./style";

export default function ReceiveScreen() {
  const { t } = useTranslation();
  const { user } = useUser();
  const theme = useTheme();
  const navigation = useNavigation();

  const [valor, setValor] = useState(() => Number(user?.balanceUsd ?? 0).toFixed(2));
  const [modalVisible, setModalVisible] = useState(false);
  const [scannedData, setScannedData] = useState<null | {
    userId: number;
    name: string;
    amount: string;
    txid: string;
  }>(null);

  if (!user) {
    return (
      <Container style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator color={theme.colors.primary} size="large" />
      </Container>
    );
  }

  const qrSize = Math.min(Dimensions.get("window").width - 60, 320);

  const qrJsonString = useMemo(() => {
    const payload = {
      userId: user.id,
      name: user.name,
      amount: Number(valor).toFixed(2),
      txid: `USER${user.id}-${Date.now().toString().slice(-6)}`,
    };
    return JSON.stringify(payload);
  }, [user, valor]);

  async function copyToClipboard() {
    await Clipboard.setStringAsync(qrJsonString);
    Alert.alert(t("copied"), t("copiedMessage"));
  }

  function simulateScan() {
    try {
      const parsed = JSON.parse(qrJsonString);
      setScannedData(parsed);
      setModalVisible(true);
    } catch (e) {
      Alert.alert(t("invalidPayload"));
    }
  }

  return (
    <Container>
      <Row style={{ alignItems: "center", marginBottom: 16 }}>
        <BackButton onPress={() => navigation.goBack()} activeOpacity={0.8}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
        </BackButton>
        <Title style={{ marginLeft: 8 }}>{t("receive")}</Title>
      </Row>

      <Card>
        <CardLabel>{t("receiver")}</CardLabel>
        <MerchantName>{user.name}</MerchantName>
        <Small>ID: {user.id}</Small>

        <Row>
          <InputWrapper>
            <CardLabel>{t("value")}</CardLabel>
            <StyledInput
              value={valor}
              onChangeText={(t) =>
                setValor(t.replace(",", ".").replace(/[^\d.]/g, ""))
              }
              keyboardType="numeric"
            />
          </InputWrapper>

          <QRCodeWrapper>
            <QRCode value={qrJsonString} size={qrSize / 2.2} />
          </QRCodeWrapper>
        </Row>

        <ButtonsRow>
          <ButtonStyled onPress={copyToClipboard}>
            <ButtonText>{t("copyPayload")}</ButtonText>
          </ButtonStyled>

          <ButtonStyledPrimary onPress={simulateScan}>
            <ButtonTextPrimary>{t("simulateScan")}</ButtonTextPrimary>
          </ButtonStyledPrimary>
        </ButtonsRow>
      </Card>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <ModalBackdrop>
          <ModalContainer>
            <ModalTitle>{t("receiveConfirmation")}</ModalTitle>

            {scannedData ? (
              <>
                <ModalLabel>{t("name")}</ModalLabel>
                <ModalValue>{scannedData.name}</ModalValue>

                <ModalLabel>{t("amount")}</ModalLabel>
                <ModalValue>R$ {Number(scannedData.amount).toFixed(2)}</ModalValue>

                <ModalLabel>{t("txid")}</ModalLabel>
                <ModalValue>{scannedData.txid}</ModalValue>

                <ModalButtonsRow>
                  <ButtonStyled
                    onPress={() => {
                      setModalVisible(false);
                      setScannedData(null);
                    }}
                  >
                    <ButtonText>{t("cancel")}</ButtonText>
                  </ButtonStyled>

                  <ButtonStyledPrimary
                    onPress={() => {
                      setModalVisible(false);
                      Alert.alert(t("paymentFlowCompleted"));
                      setScannedData(null);
                    }}
                  >
                    <ButtonTextPrimary>{t("confirm")}</ButtonTextPrimary>
                  </ButtonStyledPrimary>
                </ModalButtonsRow>
              </>
            ) : (
              <ModalValue>{t("noData")}</ModalValue>
            )}
          </ModalContainer>
        </ModalBackdrop>
      </Modal>
    </Container>
  );
}
