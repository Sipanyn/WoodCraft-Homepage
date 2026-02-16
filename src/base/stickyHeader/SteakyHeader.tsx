import { useState } from "react";
import Logo from "../logo/Logo";
import { useThemeStore } from "@/stores/useThemeStore ";

const StickyHeader = () => {
  const theme = useThemeStore((state) => state.theme);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  const [menuOpen, setMenuOpen] = useState(false);
  const [catOpen, setCatOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-50 dark:bg-neutral-800 border-b border-gray-200 dark:border-zinc-700 transition-all duration-500 mb-3.5">
        <div className="sm:container flex flex-row-reverse sm:flex-row justify-between items-center pt-3 pb-4 px-4 m-auto ">
          {/* Hamburger */}
          <div className="sm:hidden">
            <button
              onClick={() => setMenuOpen(true)}
              className="text-2xl text-gray-600 dark:text-gray-200 cursor-pointer"
            >
              <i className="bi bi-list"></i>
            </button>
          </div>

          {/* Logo */}
          <div className="sm:flex-1 flex justify-start cursor-pointer">
            <Logo />
          </div>

          {/* Actions */}
          <div className="flex flex-row justify-start sm:justify-end items-center gap-2 sm:flex-1">
            {/* Language */}
            <button className=" hidden sm:inline-flex items-center justify-center cursor-pointer border border-gray-300 dark:border-neutral-700 text-gray-500 dark:text-gray-200 hover:shadow-md transition-all p-1 rounded-full">
              <p className="size-7 flex items-center justify-center">Fa</p>
            </button>

            {/* Theme */}
            <button
              onClick={toggleTheme}
              className="inline-flex items-center justify-center cursor-pointer border border-gray-300 dark:border-neutral-700 text-gray-500 dark:text-gray-200 hover:shadow-md transition-all duration-300 p-1 rounded-full "
            >
              <i
                className={`bi ${theme === "dark" ? "bi-moon-stars" : "bi-brightness-high"} size-7 flex justify-center items-center`}
              ></i>
            </button>

            {/* Sign in desktop */}
            <button className="hidden sm:inline-flex items-center gap-2 cursor-pointer border border-gray-300 dark:border-neutral-700 text-gray-500 dark:text-gray-200 hover:shadow-md transition-all px-4 py-1 rounded-3xl ">
              <p>Sign In</p>
              <i className="bi bi-box-arrow-in-left"></i>
            </button>
          </div>
        </div>
      </header>

      {/* Backdrop */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-60 h-full"
          onClick={() => {
            setMenuOpen(false);
            setCatOpen(false);
          }}
        />
      )}

      {/* Mobile Slide Menu */}
      <aside
        className={`fixed top-0 right-0 h-full w-72 text-white bg-wood dark:bg-neutral-900 z-70 transform transition-transform duration-300 ease-in-out
        ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Menu Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-neutral-700">
          <h2 className="text-lg font-semibold ">Menu</h2>
          <button onClick={() => setMenuOpen(false)}>
            <i className="bi bi-x text-2xl cursor-pointer"></i>
          </button>
        </div>

        {/* Menu Links */}
        <nav className="flex flex-col gap-4 px-6 py-6   font-medium">
          <div className="flex flex-row items-center gap-3 w-full text-left  transition">
            <i className="bi bi-house"></i>
            <p className=" cursor-pointer">Home</p>
          </div>
          <div className="flex flex-row items-center gap-3 w-full text-left dark:hover:text-white transition">
            <i className="bi bi-shop"></i>
            <p className=" cursor-pointer">Shop</p>
          </div>
          <div className="flex flex-row items-center gap-3 w-full text-left  transition">
            <i className="bi bi-substack"></i>
            <p className=" cursor-pointer">Blog</p>
          </div>
          {/* Categories */}
          <button
            onClick={() => setCatOpen(!catOpen)}
            className="flex flex-row items-center gap-3 w-full text-left   transition"
          >
            <div className="flex flex-row items-center gap-3 w-full text-left  transition">
              {" "}
              <i className="bi bi-tags"></i>
              <p className=" cursor-pointer"> Categories</p>
            </div>
            <i className={`bi bi-chevron-${catOpen ? "up" : "down"}`}></i>
          </button>

          {catOpen && (
            <ul className="ml-4 mt-2 space-y-2 text-sm ">
              <li className=" cursor-pointer">
                <a href="/cat/1">Category 1</a>
              </li>
              <li className=" cursor-pointer">
                <a href="/cat/2">Category 2</a>
              </li>
              <li className=" cursor-pointer">
                <a href="/cat/3">Category 3</a>
              </li>
            </ul>
          )}
        </nav>

        {/* Divider */}
        <div className="border-t dark:border-neutral-700 my-4" />

        {/* Mobile Sign In */}
        <div className="px-6">
          <a
            href="/signin"
            className="block w-full text-center bg-white text-wood dark:bg-white dark:text-black  py-2 rounded-md transition"
          >
            Sign In
          </a>
        </div>
      </aside>
    </>
  );
};

export default StickyHeader;
