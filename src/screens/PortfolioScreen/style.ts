
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
  elevation: 3;
`;

export const BackButton = styled(TouchableOpacity)`
  margin-right: 12px;
  padding: 8px;
  border-radius: 8px;

`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;
