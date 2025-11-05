import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import { RefreshControl, ScrollView } from "react-native";

import Button from "@/components/button";
import Card from "@/components/card";
import { useCurrencyConverter } from "@/hooks/useCurrencyRate";
import { usePortfolio } from "@/hooks/usePortfolio";
import { useUser } from "@/hooks/useUser";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { Container, ContainerInitial } from "./styles";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

export default function HomeScreen() {
  const navigation = useNavigation<HomeNavigationProp>();
   const { user } = useUser();
  const { refreshPortfolio, loading, topGainer, topLoser } = usePortfolio();
  const { usdValue, brlValue, loading: loadingRate, refreshRate ,rate} = useCurrencyConverter({
    initialUsd: user?.balanceUsd ?? 0,
  });

  const handleRefresh = async () => {
    await refreshPortfolio();
    await refreshRate(); 
  };

  return (
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
            label="Histórico"
            icon={<MaterialIcons name="history" size={30} color="white" />}
          />
          <Button
            label="Enviar"
            icon={<MaterialIcons name="send" size={30} color="white" />}
          />
          <Button
            label="Receber"
            icon={<MaterialIcons name="download" size={30} color="white" />}
          />
          <Button
            label="Portfólio"
            icon={<MaterialIcons name="pie-chart" size={30} color="white" />}
            onPress={() => navigation.navigate("Portfolio")}
          />
        </ContainerInitial>
      </Container>
    </ScrollView>
  );
}
