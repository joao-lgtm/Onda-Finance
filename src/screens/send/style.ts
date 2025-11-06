import { Platform } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const BackButton = styled.TouchableOpacity`
  width: 38px;
  height: 38px;
  border-radius: 19px;
  background-color: ${({ theme }) => theme.colors.gray_800}33;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
`;

export const HeaderTitle = styled.Text`
  font-size: 22px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const Title = styled.Text`
  font-size: 26px;
  font-weight: bold;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Label = styled.Text`
  font-size: 14px;
  margin-bottom: 6px;
  color: ${({ theme }) => theme.colors.text_secondary};
`;

export const StyledInput = styled.TextInput`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 10px;
  padding: 12px 14px;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.card};
  font-size: 15px;
  ${Platform.OS === "ios" ? "shadow-opacity: 0.05;" : ""}
`;

export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error || "#EF4444"};
  font-size: 13px;
  margin-bottom: 8px;
`;

export const PreviewCard = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 18px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border}55;
  shadow-color: #000;
  shadow-opacity: 0.08;
  shadow-radius: 6px;
  elevation: 3;
`;

export const PreviewRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 6px;
`;

export const PreviewLabel = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.text_secondary};
`;

export const PreviewValue = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const Separator = styled.View`
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border};
  margin-vertical: 10px;
`;

export const SendButton = styled.TouchableOpacity`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 15px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  shadow-color: ${({ theme }) => theme.colors.primary};
  shadow-opacity: 0.3;
  shadow-radius: 8px;
  elevation: 4;
`;

export const SendButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.card};
  font-weight: bold;
  font-size: 17px;
`;

export const Row = styled.View`
  margin-bottom: 8px;
`;

export const BalanceText = styled.Text<{ bold?: boolean }>`
  color: ${({ theme }) => theme.colors.text};
  font-weight: ${({ bold }) => (bold ? "700" : "400")};
  font-size: 15px;
`;
