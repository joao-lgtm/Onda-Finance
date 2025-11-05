import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./en/translation.json";
import pt from "./pt/translation.json";

const resources = {
  en: { translation: en },
  pt: { translation: pt },
};

const deviceLanguage = Localization.getLocales()[0]?.languageCode ?? "en";
const fallback = "en";

i18n
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v4",
    resources,
    lng: deviceLanguage.startsWith("pt") ? "pt" : fallback,
    fallbackLng: fallback,
    interpolation: { escapeValue: false },
  });

export default i18n;
