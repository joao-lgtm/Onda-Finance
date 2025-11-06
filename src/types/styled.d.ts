import "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      card: string;
      text: string;
      text_secondary: string;
      border: string;
      gray_800: string;
      error: string;
      success: string;
      warning: string;
      info: string;
    };
  }
}
