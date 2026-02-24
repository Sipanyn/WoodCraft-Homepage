import { useEffect } from "react";
import "./App.css";
import HomePage from "./components/pages/home/homePage/HomePage";
import { useThemeStore } from "./stores/useThemeStore ";
import AiProductCreator from "./components/aiCreaterModal/AiProductCreator";
import Modal from "./base/modal/Modal";
import { useLanguageStore } from "./stores/useLanguageStore";
import { useAiModal } from "./stores/useAiModal";
import SupprortButton from "./base/supprortButton/supprortButton";
import { Cart } from "./base/cart/Cart";
import { useCartStore } from "./stores/useCartStore";

function App() {
  const { isAiOpen, setIsAiOpen } = useAiModal();
  const language = useLanguageStore((s) => s.language);
  const theme = useThemeStore((s) => s.theme);
  const { isCartOpen } = useCartStore();
  useEffect(() => {
    const html = document.documentElement;
    const isFarsi = language === "fa";

    html.dir = isFarsi ? "rtl" : "ltr";
    html.lang = language;

    html.classList.remove("VazirFont", "MyFont");
    html.classList.add(isFarsi ? "VazirFont" : "MyFont");
  }, [language]);

  useEffect(() => {
    const html = document.documentElement;
    html.classList.toggle("dark", theme === "dark");
  }, [theme]);
  useEffect(() => {
    if (isCartOpen) {
      // hide scrollbar
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto"; // cleanup
    };
  }, [isCartOpen]);
  return (
    <>
      {/* floating button */}
      <Cart />
      <SupprortButton />
      <HomePage />

      <Modal isOpen={isAiOpen} onClose={() => setIsAiOpen(false)}>
        <AiProductCreator onClose={() => setIsAiOpen(false)} />
      </Modal>
    </>
  );
}

export default App;
