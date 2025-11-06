import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { Container, Square } from "./style";

interface ButtonProps {
  label: string;
  icon: React.ReactNode;
  onPress?: () => void; 
}

export default function Button({ label, icon, onPress }: ButtonProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Container>
        <Square>{icon}</Square>
        <Text style={{ color: "white" }}>{label}</Text>
      </Container>
    </TouchableOpacity>
  );
}
