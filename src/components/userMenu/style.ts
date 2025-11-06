import { Animated } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const SideMenu = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  width: 70%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.card};
  padding: 20px;
  z-index: 20;
  elevation: 20;
`;

export const Overlay = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 15;
`;

export const CloseButton = styled.Pressable`
  align-self: flex-end;
  margin-bottom: 30px;
  padding: 8px;
`;

export const MenuButton = styled.Pressable`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 25;
  padding: 6px;
  border-radius: 20px;
`;

export const MenuOption = styled.Pressable`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

export const MenuOptionText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 16px;
  margin-left: 12px;
`;

export const GreetingText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 30px;
`;
