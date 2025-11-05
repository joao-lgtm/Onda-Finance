import i18n from "@/locales";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Fontisto from "@expo/vector-icons/Fontisto";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, View } from "react-native";
import {
  Balance,
  Change,
  Container,
  CurrencyRow,
  CurrencyValue,
  HeaderRow,
  Info,
  LangButton,
  LangText,
  TopChangeText,
  UserText,
} from "./style";

type CardProps = {
  usdValue: number;
  brlValue: number;
  rateLoading: boolean;
  topGainer: { name: string; change24h: number } | null;
  topLoser: { name: string; change24h: number } | null;
  rate: number
};

export default function Card({
  usdValue,
  brlValue,
  rateLoading,
  topGainer,
  topLoser,
  rate
}: CardProps) {
  const { t } = useTranslation();
  const [currency, setCurrency] = useState<"BRL" | "USD">("BRL");
  const [hidden, setHidden] = useState<boolean>(false);

  const toggleLanguage = async () => {
    const newLang = i18n.language === "pt" ? "en" : "pt";
    await i18n.changeLanguage(newLang);
  };

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === "BRL" ? "USD" : "BRL"));
  };

  const toggleHidden = () => {
    setHidden((prev) => !prev);
  };

  const displayValue = currency === "BRL" ? brlValue : usdValue;

  return (
    <Container>
      {/* Header */}
      <HeaderRow>
        <FontAwesome6 name="user-large" size={26} color="white" />
        <Pressable onPress={toggleLanguage}>
          <LangButton>
            <LangText>{i18n.language === "pt" ? "EN" : "PT"}</LangText>
          </LangButton>
        </Pressable>
      </HeaderRow>


      <Info>
        <Change>
          <FontAwesome6 name="coins" size={16} color="#4CAF50" />
          <TopChangeText change={topGainer?.change24h}>
            {topGainer?.name ?? "-"}{" "}
            {topGainer?.change24h != null ? `${topGainer.change24h}%` : "-"}
          </TopChangeText>
        </Change>

        <Change>
          <FontAwesome6 name="chart-line" size={16} color="#FF5252" />
          <TopChangeText change={topLoser?.change24h}>
            {topLoser?.name ?? "-"}{" "}
            {topLoser?.change24h != null ? `${topLoser.change24h}%` : "-"}
          </TopChangeText>
        </Change>
      </Info>

      <Balance>
        <CurrencyRow>
          <UserText style={{ opacity: 0.8, marginBottom: 6 }}>
            {t("assets")}
          </UserText>

          {rateLoading ? (
            <UserText>Carregando...</UserText>
          ) : (
            <>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <UserText style={{ fontSize: 22 }}>
                  {currency === "BRL" ? "🇧🇷" : "🇺🇸"}
                </UserText>

                <CurrencyValue>
                  {hidden
                    ? "••••••"
                    : new Intl.NumberFormat(
                      currency === "BRL" ? "pt-BR" : "en-US",
                      { style: "currency", currency }
                    ).format(Number(displayValue))}
                </CurrencyValue>
              </View>

              <UserText style={{ fontSize: 13, opacity: 0.7, marginTop: 4 }}>
                ({currency === "BRL" ? "Real brasileiro" : "US Dollar"} •{" "}
                {rate ? `1 USD = R$ ${rate.toFixed(2)}` : "–"})
              </UserText>
            </>
          )}
        </CurrencyRow>

        <View style={{ flexDirection: "row", gap: 15 }}>
          {/* Toggle Hidden */}
          <Pressable
            onPress={toggleHidden}
            accessibilityLabel={hidden ? "Mostrar saldo" : "Ocultar saldo"}
            style={{
              marginLeft: 6,
              padding: 6,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome6
              name={hidden ? "eye-slash" : "eye"}
              size={18}
              color="white"
            />
          </Pressable>

          {/* Toggle Currency */}
          <Pressable
            onPress={toggleCurrency}
            style={{
              backgroundColor: "rgba(255,255,255,0.25)",
              padding: 10,
              borderRadius: 50,
            }}
          >
            <Fontisto name="spinner-refresh" size={18} color="white" />
          </Pressable>
        </View>
      </Balance>
    </Container>
  );
}
