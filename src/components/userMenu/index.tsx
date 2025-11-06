import { useUser } from "@/contexts/UserContext";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Animated, Dimensions } from "react-native";
import {
  CloseButton,
  Container,
  GreetingText,
  MenuButton,
  MenuOption,
  MenuOptionText,
  Overlay,
  SideMenu,
} from "./style";

const SCREEN_WIDTH = Dimensions.get("window").width;

export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { logout, user } = useUser();

  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH * 0.7)).current;

  const openMenu = () => {
    setMenuOpen(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const closeMenu = () => {
    Animated.timing(slideAnim, {
      toValue: -SCREEN_WIDTH * 0.7,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setMenuOpen(false));
  };

  const handleLogout = () => {
    Alert.alert(
      t("logout"),
      t("logoutConfirm"),
      [
        { text: t("cancel"), style: "cancel" },
        {
          text: t("logout"),
          style: "destructive",
          onPress: async () => {
            await logout();
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <Container>
      {children}

      <SideMenu style={{ transform: [{ translateX: slideAnim }] }}>
        <CloseButton onPress={closeMenu}>
          <FontAwesome6 name="xmark" size={22} color="#fff" />
        </CloseButton>

        {user && <GreetingText>{t("helloUser", { name: user.name })}</GreetingText>}

        <MenuOption onPress={() => alert(t("settings") || "Configurações")}>
          <FontAwesome6 name="gear" size={22} color="#fff" />
          <MenuOptionText>{t("settings")}</MenuOptionText>
        </MenuOption>

        <MenuOption onPress={handleLogout}>
          <MaterialIcons name="logout" size={22} color="#fff" />
          <MenuOptionText>{t("logout")}</MenuOptionText>
        </MenuOption>
      </SideMenu>


      {menuOpen && <Overlay onPress={closeMenu} />}

      {!menuOpen && (
        <MenuButton onPress={openMenu}>
          <FontAwesome6 name="user-large" size={26} color="white" />
        </MenuButton>
      )}
    </Container>
  );
}
