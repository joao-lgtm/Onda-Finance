import styled from "styled-components/native";

interface ContainerProps {
  error?: boolean;
}

interface ContentProps {
  error?: boolean;
}

export const Container = styled.View<ContainerProps>`
  border-width: 1px;
  border-color: ${({ theme, error }) => (error ? theme.colors.error : theme.colors.gray)};
  padding: 5px;
  border-radius: 15px;
  width: 100%;
`;

export const Content = styled.TextInput.attrs((props) => ({
  placeholderTextColor: props.theme.colors.gray_800,
}))<ContentProps>`
  color: ${({ theme, error }) => (error ? theme.colors.error : theme.colors.text)};
  font-size: 16px;
  padding: 10px;
`;
