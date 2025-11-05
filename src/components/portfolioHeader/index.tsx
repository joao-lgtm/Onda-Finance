import { useTranslation } from "react-i18next";
import { Container, SubText, TotalText, VariationText } from "./style";

export function PortfolioHeader({ totalBRL, totalUSD, variation }: any) {
  const { t } = useTranslation();

  return (
    <Container>
      <SubText>{t("totalBalance")}</SubText>
      <TotalText>R$ {totalBRL.toFixed(2)}</TotalText>
      <SubText>≈ ${totalUSD.toFixed(2)} USD</SubText>
      <VariationText variation={variation}>
        {variation > 0 ? "▲" : "▼"} {variation.toFixed(2)}% (24h)
      </VariationText>
    </Container>
  );
}
