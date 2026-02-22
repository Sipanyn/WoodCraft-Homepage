import { useEffect } from "react";
import "./App.css";
import HomePage from "./components/pages/home/homePage/HomePage";
import { useThemeStore } from "./stores/useThemeStore ";

import AiProductCreator from "./components/aiCreaterModal/AiProductCreator";
import Modal from "./base/modal/Modal";
import { useTranslation } from "react-i18next";
import i18n from "./utlities/i18n";
import { useLanguageStore } from "./stores/useLanguageStore";
import { useAiModal } from "./stores/useAiModal";
import SupprortButton from "./base/supprortButton/supprortButton";

function App() {
  const { t } = useTranslation();
  // zustnad store states
  const language = useLanguageStore((state) => state.language);
  const theme = useThemeStore((state) => state.theme);
  const { isAiOpen, setIsAiOpen } = useAiModal();
  // AI modal state
  // const [isAiOpen, setIsOpenAi] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    // --- Language & Direction ---
    const isFarsi = i18n.language === "fa";
    html.setAttribute("dir", isFarsi ? "rtl" : "ltr");
    html.setAttribute("lang", isFarsi ? "fa" : "en");

    // Update font class safely without overwriting others
    html.classList.add(isFarsi ? "VazirFont" : "MyFont");

    // --- Theme ---
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // --- Language change ---
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, theme, i18n]);

  return (
    <>
      {/* floating button */}
      <SupprortButton />
      <HomePage />
      <Modal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)}>
        <AiProductCreator onClose={() => setIsAiOpen(false)} />
      </Modal>
    </>
  );
}

export default App;
