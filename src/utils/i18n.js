import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";

import en from "./locales/en";
import fr from "./locales/fr";
import AsyncStorage from "@react-native-community/async-storage";

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
    I18n.locale = locales[0].languageTag;
}

I18n.fallbacks = true;


I18n.translations = {
    en,
    fr
};

(async () => {
    const lan = await AsyncStorage.getItem("lan");
    console.log(lan);
    if (lan === "English") {
        I18n.locale = 'en'
    } else if (lan === "French") {
        I18n.locale = 'fr'
    }
})()

export default I18n;