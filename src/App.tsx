import { useEffect } from "react";
import "./App.css";
import HomePage from "./components/pages/home/homePage/HomePage";
import { useThemeStore } from "./stores/useThemeStore ";
import AiButton from "./base/aiButton/AiButton";

function App() {
  const theme = useThemeStore((state) => state.theme);

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
      <AiButton />
      <HomePage />
    </>
  );
}

export default App;
