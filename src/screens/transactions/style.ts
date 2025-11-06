import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
  padding: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
`;

export const BackButton = styled.TouchableOpacity`
  padding: 6px;
`;

export const BackIcon = styled.View`
  justify-content: center;
  align-items: center;
`;

export const FilterContainer = styled.View`
  margin-bottom: 16px;
`;

export const FilterLabel = styled.Text`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text_secondary};
  margin-bottom: 4px;
`;

export const PickerWrapper = styled.View`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  margin-bottom: 12px;
  background-color: ${({ theme }) => theme.colors.card};
`;

export const FilterButton = styled.TouchableOpacity`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px;
  border-radius: 8px;
`;

export const FilterButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: 600;
`;

export const TransactionItem = styled.View`
  background-color: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 10px;
`;

export const Amount = styled.Text<{ type: "sent" | "received" }>`
  font-weight: bold;
  color: ${({ type, theme }) =>
    type === "sent" ? "#EF4444" : theme.colors.primary};
`;
