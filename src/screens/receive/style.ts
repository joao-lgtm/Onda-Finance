import { TouchableOpacity } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 16px;
`;

export const BackButton = styled(TouchableOpacity)`
  padding: 8px;
`;

export const HeaderTitle = styled.Text`
  font-size: 24px;
  font-weight: 700;
  margin-left: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Card = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 16px;
  elevation: 3;
`;

export const CardLabel = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text_secondary};
`;

export const MerchantName = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-top: 4px;
  color: ${({ theme }) => theme.colors.text};
`;

export const Small = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text_secondary};
  margin-bottom: 12px;
`;

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const InputWrapper = styled.View`
  flex: 1;
`;

export const StyledInput = styled.TextInput`
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 8px;
  width: 140px;
  margin-top: 6px;
  background-color: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
`;

export const QRCodeWrapper = styled.View`
  align-items: center;
  margin-left: 12px;
`;

export const ButtonsRow = styled.View`
  flex-direction: row;
  margin-top: 16px;
  align-items: center;
  justify-content: center;
`;

export const ButtonStyled = styled(TouchableOpacity)`
  padding-vertical: 10px;
  padding-horizontal: 14px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonStyledPrimary = styled(ButtonStyled)`
  margin-left: 8px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-color: ${({ theme }) => theme.colors.primary};
`;

export const ButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.text};
`;

export const ButtonTextPrimary = styled.Text`
  color: ${({ theme }) => theme.colors.card};
`;

/* Modal */
export const ModalBackdrop = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.4);
  justify-content: center;
  align-items: center;
`;

export const ModalContainer = styled.View`
  width: 90%;
  background-color: ${({ theme }) => theme.colors.card};
  border-radius: 12px;
  padding: 20px;
  align-items: stretch;
`;

export const ModalTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 12px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ModalLabel = styled.Text`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.text_secondary};
  margin-top: 8px;
`;

export const ModalValue = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
  margin-top: 4px;
`;

export const ModalButtonsRow = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;
