import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView } from "react-native";

import Button from "@/components/button";
import Card from "@/components/card";
import ScreenWrapper from "@/components/userMenu";
import { useUser } from "@/contexts/UserContext";
import { useCurrencyConverter } from "@/hooks/useCurrencyRate";
import { usePortfolio } from "@/hooks/usePortfolio";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { Container, ContainerInitial } from "./styles";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const { t } = useTranslation();
  const navigation = useNavigation<HomeNavigationProp>();
  const { user, logout } = useUser();
  const { refreshPortfolio, loading, topGainer, topLoser } = usePortfolio();
  const { usdValue, brlValue, loading: loadingRate, refreshRate, rate } = useCurrencyConverter({
    initialUsd: user ? user.balanceUsd : 0,
  });

  const handleRefresh = async () => {
    await refreshPortfolio();
    await refreshRate();
  };


  return (
    <ScreenWrapper>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#000" }}
        refreshControl={
          <RefreshControl
            refreshing={loading || loadingRate}
            onRefresh={handleRefresh}
            tintColor="#fff"
          />
        }
      >
        <Container>
          <Card
            usdValue={usdValue}
            brlValue={brlValue}
            rateLoading={loadingRate}
            topGainer={topGainer}
            topLoser={topLoser}
            rate={rate}
          />
          <ContainerInitial>
            <Button
              label={t("transactions")}
              icon={<MaterialIcons name="history" size={30} color="white" />}
              onPress={() => navigation.navigate("Transactions")}
            />

            <Button
              label={t("send")}
              icon={<MaterialIcons name="send" size={30} color="white" />}
              onPress={() => navigation.navigate("Send")}
            />
            <Button
              label={t("receive")}
              icon={<MaterialIcons name="download" size={30} color="white" />}
              onPress={() => navigation.navigate("Receive")}
            />
            <Button
              label={t("portfolio")}
              icon={<MaterialIcons name="pie-chart" size={30} color="white" />}
              onPress={() => navigation.navigate("Portfolio")}
            />
          </ContainerInitial>
        </Container>
      </ScrollView>
    </ScreenWrapper>
  );
}
