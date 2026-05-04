import { useEffect } from "react";
import "./App.css";
import { useLanguageStore } from "./stores/useLanguageStore";
import { router } from "./routes/router";
import { RouterProvider } from "react-router-dom";

function App() {
  const language = useLanguageStore((s) => s.language);
  useEffect(() => {
    const html = document.documentElement;
    const isFarsi = language === "fa";

    html.dir = isFarsi ? "rtl" : "ltr";
    html.lang = language;

    html.classList.remove("VazirFont", "MyFont");
    html.classList.add(isFarsi ? "VazirFont" : "MyFont");
  }, [language]);
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
