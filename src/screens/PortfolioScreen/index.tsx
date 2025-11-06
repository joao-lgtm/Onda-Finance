import { AssetList } from "@/components/assetList";
import { PortfolioHeader } from "@/components/portfolioHeader";
import { usePortfolio } from "@/hooks/usePortfolio";
import { RootStackParamList } from "@/navigation/AppNavigator";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { useTheme } from "styled-components/native";
import {
  BackButton,
  Container,
  Header,
  HeaderTitle,
} from "./style";

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "Portfolio">;

export default function PortfolioScreen() {
  const { t } = useTranslation();
  const { assets, loading, connected, topGainer, topLoser, refreshPortfolio } = usePortfolio();
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp>();

  const totalUSD = assets.reduce((acc, a) => acc + a.price, 0);
  const totalBRL = totalUSD * 5.6;
  const variation =
    assets.reduce((acc, a) => acc + a.change24h, 0) / (assets.length || 1);

  return (
    <Container>
      <Header>
        <BackButton onPress={() => navigation.goBack()} activeOpacity={0.7}>
          <Ionicons name="chevron-back" size={24} color={theme.colors.text} />
        </BackButton>
        <HeaderTitle>{t("portfolio")}</HeaderTitle>
      </Header>

      <AssetList
        assets={assets}
        ListHeaderComponent={
          <PortfolioHeader
            totalBRL={totalBRL}
            totalUSD={totalUSD}
            variation={variation}
          />
        }
        refreshing={loading}
        onRefresh={refreshPortfolio}
      />
    </Container>
  );
}
