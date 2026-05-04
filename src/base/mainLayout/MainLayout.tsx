import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import ScrollToTop from "@/utlities/ScrollToTop";

const MainLayout: React.FC = () => {
  return (
    <div>
      <ScrollToTop />
      <Header />
      <div className="container">
        <Outlet />
        <Footer />
      </div>
    </div>
  );
};
export default MainLayout;
