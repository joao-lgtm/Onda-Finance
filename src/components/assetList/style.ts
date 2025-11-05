import styled from "styled-components/native";

export const AssetRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom-width: 0.5px;
  border-color: rgba(255, 255, 255, 0.1);
`;

export const Symbol = styled.Text`
  font-weight: bold;
  color: white;
`;

export const Name = styled.Text`
  flex: 1;
  color: rgba(255, 255, 255, 0.7);
  margin-left: 6px;
`;

export const Price = styled.Text`
  color: white;
`;

export const Change = styled.Text<{ change: number }>`
  color: ${({ change }) => (change >= 0 ? "#4CAF50" : "#FF5252")};
  width: 60px;
  text-align: right;
`;

export const Allocation = styled.Text`
  width: 40px;
  text-align: right;
  color: rgba(255, 255, 255, 0.7);
`;
