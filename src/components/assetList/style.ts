import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.card};
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  elevation: 2;
`;

export const BackButton = styled(TouchableOpacity)`
  padding: 6px;
  margin-right: 12px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const AssetRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 14px 16px;
  border-bottom-width: 0.5px;
  border-color: ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.card};
  margin-bottom: 4px;
  border-radius: 8px;
`;

export const Symbol = styled.Text`
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`;

export const Name = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.colors.text_secondary};
  margin-left: 8px;
`;

export const Price = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export const Change = styled.Text<{ change: number }>`
  color: ${({ change }) => (change >= 0 ? "#4CAF50" : "#FF5252")};
  width: 60px;
  text-align: right;
`;

export const Allocation = styled.Text`
  width: 50px;
  text-align: right;
  color: ${({ theme }) => theme.colors.text_secondary};
`;
