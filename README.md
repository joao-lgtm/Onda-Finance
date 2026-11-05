# Onda Finance

App mobile de finanças feito com **React Native + Expo**. Mostra a carteira do usuário, permite enviar e receber valores (com QR Code), consultar o histórico de transações e entrar com biometria.

## Funcionalidades

- **Login e cadastro** com opção de autenticação por biometria (digital/Face ID)
- **Carteira**: saldo, lista de ativos e cotação de moedas
- **Enviar e receber** valores, com geração de QR Code para recebimento
- **Histórico de transações**
- **Português e inglês** com i18next
- Navegação com menu lateral (drawer) e tema com styled-components

## Tecnologias

- React Native · Expo · TypeScript
- React Navigation (drawer e native stack)
- styled-components
- i18next / react-i18next
- expo-local-authentication, expo-secure-store, expo-camera
- react-native-qrcode-svg, react-native-toast-message

## Estrutura

```
src/
├── components/   # Input, Button, Card, AssetList, PortfolioHeader, UserMenu
├── contexts/     # UserContext
├── data/         # dados simulados (usuários e transações)
├── hooks/        # useBiometrics, useCurrencyRate, usePortfolio
├── locales/      # traduções pt / en
├── navigation/   # AppNavigator, RootNavigator
├── providers/
├── screens/      # login, register, home, PortfolioScreen, send, receive, transactions
├── services/     # biometricService, userStore
└── styles/       # tema
```

## Como rodar

```bash
git clone https://github.com/joao-lgtm/Onda-Finance.git
cd Onda-Finance
npm install
npm start          # abre o Expo
# ou: npm run android | npm run ios | npm run web
```

> Os dados de usuários e transações são simulados (`src/data`), então o app roda sem back-end.

## Autor

**João Paulo Cassatti** · [LinkedIn](https://www.linkedin.com/in/jo%C3%A3o-paulo-283a551a2/)
