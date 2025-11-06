import { useUser } from "@/contexts/UserContext";
import { getUserTransactions, Transaction } from "@/data/mockTransactionsDb";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FlatList, Text, View } from "react-native";
import { useTheme } from "styled-components/native";
import {
  Amount,
  BackButton,
  BackIcon,
  Container,
  FilterButton,
  FilterButtonText,
  FilterContainer,
  FilterLabel,
  PickerWrapper,
  Title,
  TransactionItem,
} from "./style";

export default function TransactionsScreen() {
  const navigation = useNavigation();
  const theme = useTheme();
  const { t } = useTranslation();
  const { user } = useUser();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [selectedType, setSelectedType] = useState<"all" | "sent" | "received">("all");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);

  useEffect(() => {
    async function loadTransactions() {
      if (user) {
        const userTxs = await getUserTransactions(user.username);
        const sorted = userTxs.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        setTransactions(sorted);
      }
    }
    loadTransactions();
  }, [user]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const isSender = tx.from === user?.username;
      const txDate = new Date(tx.date);

      if (selectedType === "sent" && !isSender) return false;
      if (selectedType === "received" && isSender) return false;
      if (startDate && txDate < startDate) return false;
      if (endDate && txDate > endDate) return false;

      return true;
    });
  }, [transactions, selectedType, startDate, endDate, user]);

  return (
    <Container>
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20, gap: 8 }}>
        <BackButton onPress={() => navigation.goBack()}>
          <BackIcon>
            <Ionicons name="chevron-back" size={22} color={theme.colors.text} />
          </BackIcon>
        </BackButton>
        <Title>{t("transactionsHistory")}</Title>
      </View>

      <FilterContainer>
        <FilterLabel>{t("type")}:</FilterLabel>
        <PickerWrapper>
          <Picker
            selectedValue={selectedType}
            onValueChange={(value) => setSelectedType(value as "all" | "sent" | "received")}
            style={{ color: theme.colors.text }}
          >
            <Picker.Item label={t("all")} value="all" />
            <Picker.Item label={t("sent")} value="sent" />
            <Picker.Item label={t("received")} value="received" />
          </Picker>
        </PickerWrapper>

        <FilterLabel>{t("period")}:</FilterLabel>
        <View style={{ flexDirection: "row", gap: 8 }}>
          <FilterButton onPress={() => setShowStartPicker(true)}>
            <FilterButtonText>
              {startDate ? startDate.toLocaleDateString() : t("start")}
            </FilterButtonText>
          </FilterButton>

          <FilterButton onPress={() => setShowEndPicker(true)}>
            <FilterButtonText>
              {endDate ? endDate.toLocaleDateString() : t("end")}
            </FilterButtonText>
          </FilterButton>
        </View>
      </FilterContainer>

      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          onChange={(_, date) => {
            setShowStartPicker(false);
            if (date) setStartDate(date);
          }}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          onChange={(_, date) => {
            setShowEndPicker(false);
            if (date) setEndDate(date);
          }}
        />
      )}

      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={{ color: theme.colors.text_secondary }}>
            {t("noTransactionsFound")}
          </Text>
        }
        renderItem={({ item }) => {
          const isSender = item.from === user?.username;
          return (
            <TransactionItem>
              <Text style={{ color: theme.colors.text }}>
                {isSender
                  ? t("sentTo", { name: item.to })
                  : t("receivedFrom", { name: item.from })}
              </Text>
              <Amount type={isSender ? "sent" : "received"}>
                {isSender ? "-" : "+"}${item.amount.toFixed(2)}
              </Amount>
              <Text style={{ color: theme.colors.text_secondary }}>
                {t("tax", { tax: item.tax.toFixed(2) })}
              </Text>
              <Text style={{ color: theme.colors.text_secondary }}>
                {t("date", { date: new Date(item.date).toLocaleString() })}
              </Text>
            </TransactionItem>
          );
        }}
      />
    </Container>
  );
}
