import { RootStackParamList } from "@/navigation/AppNavigator";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ComponentType, ReactElement } from "react";
import { FlatList, TouchableOpacity } from "react-native";
import { Allocation, AssetRow, Change, Name, Price, Symbol } from "./style";

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;

type Props = {
  assets: any[];
  ListHeaderComponent?: ReactElement | ComponentType<any> | null;
  refreshing?: boolean;
  onRefresh?: () => void;
};

export function AssetList({
  assets,
  ListHeaderComponent,
  refreshing,
  onRefresh,
}: Props) {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <FlatList
      data={assets}
      keyExtractor={(item) => item.symbol}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Asset", { symbol: item.symbol })}
        >
          <AssetRow>
            <Symbol>{item.symbol}</Symbol>
            <Name>{item.name}</Name>
            <Price>${item.price.toLocaleString()}</Price>
            <Change change={item.change24h}>
              {item.change24h > 0 ? "+" : ""}
              {item.change24h}%
            </Change>
            <Allocation>{item.allocation ? `${item.allocation}%` : "-"}</Allocation>
          </AssetRow>
        </TouchableOpacity>
      )}
      ListHeaderComponent={ListHeaderComponent}
      refreshing={refreshing}
      onRefresh={onRefresh}
      style={{ flex: 1 }}
    />
  );
}
