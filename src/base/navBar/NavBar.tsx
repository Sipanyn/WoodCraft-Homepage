import { clx } from "@/utlities/clx";

const NavBar: React.FC = () => {
  return (
    <nav
      className={`w-fit  sm:size-full bg-wood-dark dark:bg-neutral-700 rounded-xl px-2 py-1 sm:rounded-3xl  sm:px-4 sm:py-3`}
    >
      <div className="flex items-center justify-start">
        {/* Desktop menu */}
        <ul className="hidden sm:flex flex-row gap-10 text-white transition-all duration-500">
          <li className={clx("relative")}>
            <a href="#">Home page</a>
          </li>
          <li className="relative group transition-all duration-500">
            <a className="flex items-center gap-1 " href="#">
              Categories
              <i className="bi bi-chevron-down flex justify-center items-center group-hover:rotate-180 transition-all duration-300"></i>
            </a>

            <ul className=" absolute top-10 left-0 bg-wood-dark dark:bg-neutral-700 rounded-lg py-2 min-w-37 z-10 opacity-0 invisible translate-y-2  transition-all duration-300 ease-out  group-hover:opacity-100 group-hover:visible group-hover:translate-y-0">
              <li>
                <a
                  href="/cat/1"
                  className="block px-4 py-2 text-white hover:bg-wood-light"
                >
                  Category 1
                </a>
              </li>
              <li>
                <a
                  href="/cat/2"
                  className="block px-4 py-2 text-white hover:bg-wood-light"
                >
                  Category 2
                </a>
              </li>
              <li>
                <a
                  href="/cat/3"
                  className="block px-4 py-2 text-white hover:bg-wood-light"
                >
                  Category 3
                </a>
              </li>
            </ul>
          </li>

          <li className="relative">
            <a href="#">Shop</a>
          </li>
          <li className="relative">
            <a href="#">Blog</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
