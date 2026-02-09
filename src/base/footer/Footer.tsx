import styles from "./footer.module.css";
// @ts-ignore
import Instagram from "@/svgs/Instagram.svg?react";
// @ts-ignore
import Whatsapp from "@/svgs/Whatsapp.svg?react";
// @ts-ignore
import Youtube from "@/svgs/Youtube.svg?react";
// @ts-ignore
import Unipay from "@/svgs/Unipay.svg?react";
// @ts-ignore
import Master from "@/svgs/Master.svg?react";
// @ts-ignore
import { clx } from "@/utlities/clx";
const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll
    });
  };
  return (
    <div>
      <div className="relative w-full bg-wood-dark dark:bg-zinc-900 text-white rounded-2xl p-5 lg:p-9">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ABOUT */}
          <div className="lg:col-span-1">
            <h2 className={styles.footer_title}>About WoodCraft</h2>
            <p className="leading-8 mb-5 text-gray-200">
              At WoodCraft, every piece begins with carefully selected,
              sustainably sourced wood and is brought to life through thoughtful
              design and meticulous craftsmanship. We honor traditional
              techniques while embracing modern aesthetics, creating products
              that feel both timeless and contemporary. Each creation carries
              its own character, grain, and warmth — made not just to be used,
              but to be lived with, cherished, and passed on.
            </p>

            <div className="flex gap-3">
              {[Instagram, Whatsapp, Youtube].map((Icon, i) => (
                <div
                  key={i}
                  className={clx(
                    styles.icon,
                    "group flex h-11 w-11 items-center justify-center rounded-md cursor-pointer transition hover:-translate-y-1 hover:shadow-lg",
                  )}
                >
                  <Icon className="w-5 h-5 transition-transform group-hover:scale-125" />
                </div>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h2 className={styles.footer_title}>Quick Access</h2>
            <ul className="space-y-3">
              {["Home", "Shop", "Contact Us", "FAQ"].map((item) => (
                <li
                  key={item}
                  className="hover:translate-x-2 transition-all duration-300"
                >
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className={styles.footer_title}>Contact Us</h2>

            <ul className="space-y-5">
              <li>
                <p>Phone</p>
                <p dir="ltr">012-345 678</p>
              </li>
              <li>
                <p>Email</p>
                <p>WoodCraft@gmail.com</p>
              </li>
              <li>
                <p>Address</p>
                <p>Azadi Blvd, Ostad Moein, No. 10</p>
              </li>
            </ul>

            <div className="flex gap-3 mt-4">
              <div
                className="
        w-16 h-16
        flex items-center justify-center
        rounded-2xl
       p-2
        ring-2 ring-white/10
        hover:ring-wood/50
        hover:-translate-y-1
        transition-all duration-300
        cursor-pointer
      "
              >
                {" "}
                <Unipay className="w-16 h-16 flex items-center justify-center rounded-xl " />
              </div>
              <div
                className="
        w-16 h-16
        flex items-center justify-center
        rounded-2xl
       p-2
        ring-2 ring-white/10
        hover:ring-wood/50
        hover:-translate-y-1
        transition-all duration-300
        cursor-pointer
      "
              >
                {" "}
                <Master className="w-16 h-16 flex items-center justify-center rounded-xl " />
              </div>
            </div>
          </div>
        </div>

        {/* BACK TO TOP */}
        <div
          onClick={scrollToTop}
          className="mt-10 flex justify-center lg:justify-end"
        >
          <button className="ring-1 ring-white px-4 py-2 rounded-lg flex items-center gap-2 hover:scale-105 transition cursor-pointer active:scale-95">
            Back to top
            <i className="bi bi-chevron-up"></i>
          </button>
        </div>

        {/* BOTTOM BAR */}
        <div
          className={clx(
            styles.bottom_bar,
            "mt-10 rounded-2xl px-4 py-5 lg:px-6 lg:py-4",
            "flex flex-col lg:flex-row items-center gap-5 lg:gap-0 justify-between",
          )}
        >
          {/* LOGO */}
          <a
            href="/"
            className="text-2xl lg:text-3xl font-MorabbaMedium tracking-wide"
          >
            <span className="text-wood">Wood</span> Craft
          </a>

          {/* NEWSLETTER */}
          <div
            className="
      w-full max-w-md
      bg-gray-200 dark:bg-gray-300
      rounded-2xl p-1.5
      flex items-center
      focus-within:ring-2 focus-within:ring-wood
      transition
    "
          >
            <input
              type="email"
              placeholder="Get notified about discounts"
              className="
        flex-1 bg-transparent px-3 py-2
        text-sm 
        placeholder:text-gray-400
        outline-none
        text-black
      "
            />

            <button
              className="
            cursor-pointer
        shrink-0 px-4 py-2
        bg-wood text-black
        rounded-xl text-sm font-DanaMedium
        hover:brightness-110 active:scale-95
        hover:scale-105
        transition
      "
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <p className="text-gray-400 text-center text-xs mt-8">
        © 2026 WoodCraft. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
