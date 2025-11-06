// src/styles/globalStyles.ts
import styled from "styled-components/native";

// Container geral da tela
export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 16px;
`;

// Cabeçalho
export const HeaderContainer = styled.View`
  margin-bottom: 24px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

// Inputs
export const InputContainer = styled.View`
  margin-bottom: 16px;
`;

export const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 12px;
`;

// Botões
export const Button = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.gray_800 : theme.colors.primary};
  padding: 14px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 600;
`;

// Mensagens de erro
export const ErrorText = styled.Text`
  color: ${({ theme }) => theme.colors.error};
  font-size: 14px;
  margin-bottom: 8px;
`;

// Quick login / textos adicionais
export const InfoText = styled.Text`
  color: ${({ theme }) => theme.colors.text_secondary};
  font-size: 14px;
  margin-top: 6px;
  text-align: center;
`;
