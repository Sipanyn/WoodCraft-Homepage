import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/swiper.css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/navigation";
// @ts-ignore
import "swiper/css/effect-fade";
import { useRef } from "react";

type Slide = {
  src: string;
  href: string;
  alt?: string;
};

const slides: Slide[] = [
  {
    src: "https://as2.ftcdn.net/v2/jpg/18/63/74/81/1000_F_1863748187_0NslLIhfw0ilA0GzgZpRrFdAFMo9dEJU.jpg",
    href: "/shop",
    alt: "Slide 1",
  },
  {
    src: "https://as2.ftcdn.net/v2/jpg/04/20/89/97/1000_F_420899769_pv2ly9rz3fkATFiidN2oowRTBBolEPiu.jpg",
    href: "/shop",
    alt: "Slide 2",
  },
  {
    src: "https://as1.ftcdn.net/v2/jpg/04/20/89/96/1000_F_420899641_xymRK6iywWkUFus1QZR9ZYZtPPniOF1B.jpg",
    href: "/shop",
    alt: "Slide 3",
  },
  {
    src: "https://as2.ftcdn.net/v2/jpg/04/20/89/97/1000_F_420899745_PtFdGBE3p5sa6CnhD2qEjguhJ3AqebDu.jpg",
    href: "/shop",
    alt: "Slide 4",
  },
];

export default function HeaderSlider() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  return (
    <div className="px-3 lg:container group w-full mt-4 lg:mt-10">
      <Swiper
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        effect={"fade"}
        dir="ltr"
        loop={true}
        modules={[Navigation, Pagination, EffectFade, Autoplay]}
        pagination={{
          el: ".swiper-pagination",
          clickable: true,
        }}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        onBeforeInit={(swiper) => {
          // 👇 attach refs BEFORE swiper initializes
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        className="header-slider h-52 md:h-96 cursor-pointer"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <a href={slide.href}>
              <img
                src={slide.src}
                alt={slide.alt ?? ""}
                className="rounded-xl w-full h-full object-cover"
              />
            </a>
          </SwiperSlide>
        ))}

        {/* Pagination */}
        <div className="swiper-pagination-wrapper">
          <div className="swiper-pagination" />
        </div>

        {/* Navigation */}
        <div
          className="absolute z-10 bottom-5 right-6 hidden lg:flex items-center gap-x-2
                opacity-0 invisible group-hover:opacity-100 group-hover:visible
                transition-all duration-300"
        >
          <button
            ref={prevRef} // ✅ ATTACHED
            className="flex-center w-9 h-9 cursor-pointer bg-white dark:bg-neutral-800 rounded-full shadow"
          >
            <i className="bi bi-chevron-left dark:text-white hover:text-wood-dark" />
          </button>

          <button
            ref={nextRef} // ✅ ATTACHED
            className="flex-center w-9 h-9 cursor-pointer bg-white dark:bg-neutral-800 rounded-full shadow"
          >
            <i className="bi bi-chevron-right dark:text-white hover:text-wood-dark" />
          </button>
        </div>
      </Swiper>
    </div>
  );
}
