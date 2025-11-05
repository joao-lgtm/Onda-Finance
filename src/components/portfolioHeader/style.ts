import styled from "styled-components/native";

export const Container = styled.View`
  align-items: center;
  padding: 24px 0;
`;

export const TotalText = styled.Text`
  font-size: 32px;
  font-weight: bold;
  color: white;
`;

export const SubText = styled.Text`
  font-size: 16px;
  opacity: 0.8;
  color: white;
`;

export const VariationText = styled.Text<{ variation: number }>`
  font-size: 14px;
  margin-top: 6px;
  color: ${({ variation }) => (variation >= 0 ? "#4CAF50" : "#FF5252")};
`;
