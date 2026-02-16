import { useEffect, useState } from "react";
import "./App.css";
import HomePage from "./components/pages/home/homePage/HomePage";
import { useThemeStore } from "./stores/useThemeStore ";
import AiButton from "./base/aiButton/AiButton";
import AiProductCreator from "./components/aiCreaterModal/AiProductCreator";
import Modal from "./base/modal/Modal";

function App() {
  const theme = useThemeStore((state) => state.theme);
  const [isAiOpen, setIsOpenAi] = useState(true);
  useEffect(() => {
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <>
      {/* floating button */}
      <AiButton onClick={() => setIsOpenAi(true)} />
      <HomePage />
      <Modal isOpen={isAiOpen} onClose={() => setIsOpenAi(false)}>
        <AiProductCreator onClose={() => setIsOpenAi(false)} />
      </Modal>
    </>
  );
}

export default App;
