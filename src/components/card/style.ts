import styled from "styled-components/native";

export const Container = styled.View`
  background-color: #00c56e;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
  padding-top: 20px;
`;

export const HeaderRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 24px ;
`;

export const UserText = styled.Text`
  color: white;
  font-size: 16px;
`;

export const Info = styled.View`
  flex-direction: row;
  justify-content: space-between;
  background-color: rgba(255, 255, 255, 1);
  border-radius: 15px;
  padding: 14px 18px;
   margin: 32px 24px 40px;
`;

export const Balance = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(185, 0, 0, 0.15);
  border-radius: 15px;
  padding: 30px;

`;

export const CurrencyRow = styled.View`
  flex-direction: column;
  gap: 6px;
`;

export const CurrencyValue = styled.Text`
  color: white;
  font-size: 28px;
  font-weight: 700;
  margin-left: 8px;
`;

export const LangButton = styled.View`
  background-color: rgba(255, 255, 255, 0.25);
  padding: 6px 12px;
  border-radius: 8px;
`;

export const LangText = styled.Text`
  color: white;
  font-weight: bold;
`;

export const Change = styled.View`
  flex-direction: row;
  gap: 6px;
  align-items: center;
`;

export const TopChangeText = styled.Text<{ change?: number }>`
  color: ${({ change }) =>
    change !== undefined && change >= 0 ? "#4CAF50" : "#FF5252"};
  font-weight: 600;
  font-size: 14px;
`;
