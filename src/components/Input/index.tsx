import React from "react";
import { TextInputProps } from "react-native";
import { Container, Content } from "./styles";

interface InputProps {
  children: React.ReactNode;
  error?: boolean;
}

function Input({ children, error }: InputProps) {
  return (
    <Container error={error}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { error });
        }
        return child;
      })}
    </Container>
  );
}

interface FieldProps extends TextInputProps {
  error?: boolean;
}

function Field({ error, style, ...rest }: FieldProps) {
  return <Content {...rest} error={error} />;
}

Input.Field = Field;

export { Input };

