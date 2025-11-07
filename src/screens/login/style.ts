import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  padding: 24px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 28px;
  font-weight: 700;
  text-align: center;
`;

export const Subtitle = styled.Text`
  color: ${({ theme }) => theme.colors.text_secondary};
  text-align: center;
  margin-top: 8px;
`;

export const Input = styled.TextInput`
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 8px;
`;

export const ErrorText = styled.Text`
  color: #ff6b6b;
  margin-bottom: 8px;
`;

export const Button = styled.Pressable<{ disabled?: boolean }>`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 14px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-weight: 600;
`;

export const QuickLoginContainer = styled.View`
  margin-top: 24px;
`;

export const QuickLoginTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text_secondary};
  margin-bottom: 8px;
`;

export const QuickLoginList = styled.View`
  flex-direction: row;
  gap: 8px;
`;

export const QuickLoginButton = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.card};
  padding: 8px 12px;
  border-radius: 8px;
`;

export const QuickLoginButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export const MockUsersButton = styled.Pressable`
  align-items: center;
  margin-top: 4px;
`;

export const MockUsersButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text_secondary};
`;

export const HeaderContainer = styled.View`
  margin-bottom: 28px;
`;

export const InputContainer = styled.View`
  gap: 12px;
`;
