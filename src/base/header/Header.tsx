import NavBar from "../navBar/NavBar";
import HeaderSlider from "@/components/headerSlider/HeaderSlider";

function Header() {
  return (
    <header className=" flex flex-col gap-2">
      {/* navbar */}
      <div className="hidden sm:block">
        <NavBar />
      </div>
      {/* slider */}
      <div>
        <HeaderSlider />
      </div>
    </header>
  );
}

export default Header;
