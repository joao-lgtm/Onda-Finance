import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  position: relative;
  background-color: ${({ theme }) => theme.colors.background};
  gap: 35px;
`;

export const ContainerBottom = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
`;

export const ContainerInitial = styled.View`
  flex: 1;
  padding: 15px;
  flex-direction: row;
  justify-content: space-between;
`;



export const ValueContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
