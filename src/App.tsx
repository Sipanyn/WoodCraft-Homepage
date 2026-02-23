import { useEffect } from "react";
import "./App.css";
import HomePage from "./components/pages/home/homePage/HomePage";
import { useThemeStore } from "./stores/useThemeStore ";
import AiProductCreator from "./components/aiCreaterModal/AiProductCreator";
import Modal from "./base/modal/Modal";
import i18n from "./utlities/i18n";
import { useLanguageStore } from "./stores/useLanguageStore";
import { useAiModal } from "./stores/useAiModal";
import SupprortButton from "./base/supprortButton/supprortButton";

function App() {
  // zustnad store states
  const language = useLanguageStore((state) => state.language);
  const theme = useThemeStore((state) => state.theme);
  const { isAiOpen, setIsAiOpen } = useAiModal();
  // AI modal state
  // const [isAiOpen, setIsOpenAi] = useState(false);

  useEffect(() => {
    const html = document.documentElement;

    const isFarsi = i18n.language === "fa";

    // Direction + lang
    html.setAttribute("dir", isFarsi ? "rtl" : "ltr");
    html.setAttribute("lang", isFarsi ? "fa" : "en");

    // Fonts
    html.classList.remove("VazirFont", "MyFont");
    html.classList.add(isFarsi ? "VazirFont" : "MyFont");

    // Theme
    if (theme === "dark") {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }

    // Change language if needed
    if (i18n.language !== language) {
      i18n.changeLanguage(language);
    }
  }, [language, theme, i18n.language]);
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
