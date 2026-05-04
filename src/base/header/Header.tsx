import NavBar from "../navBar/NavBar";

import StickyHeader from "../stickyHeader/StickyHeader";

function Header() {
  return (
    <>
      <header className="sticky top-0 z-50">
        <StickyHeader />
      </header>
      {/* navbar */}
      <div className="hidden sm:block container">
        <NavBar />
      </div>
    </>
  );
}

export default Header;
