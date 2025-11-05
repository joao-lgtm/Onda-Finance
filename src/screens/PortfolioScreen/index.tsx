import { AssetList } from "@/components/assetList";
import { PortfolioHeader } from "@/components/portfolioHeader";
import { usePortfolio } from "@/hooks/usePortfolio";
import { View } from "react-native";

export default function PortfolioScreen() {
  const { assets, loading, connected, topGainer, topLoser, refreshPortfolio } = usePortfolio();

  const totalUSD = assets.reduce((acc, a) => acc + a.price, 0);
  const totalBRL = totalUSD * 5.6;
  const variation =
    assets.reduce((acc, a) => acc + a.change24h, 0) / (assets.length || 1);

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <AssetList
        assets={assets}
        ListHeaderComponent={
          <PortfolioHeader
            totalBRL={totalBRL}
            totalUSD={totalUSD}
            variation={variation}
            connected={connected}
            topGainer={topGainer}
            topLoser={topLoser}
          />
        }
        refreshing={loading}
        onRefresh={refreshPortfolio} // ✅ agora atualiza o mock ao puxar
      />
    </View>
  );
}
