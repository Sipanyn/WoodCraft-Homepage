import { forwardRef, useImperativeHandle, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./brandsSwiper.module.css";
import "swiper/swiper.css";
import { clx } from "@/utlities/clx";

interface brand {
  src: string;
  alt: string;
  id: string;
}
const brands: brand[] = [
  {
    src: "/images/brand1-removebg-preview.png",
    alt: "brand",

    id: "1",
  },
  {
    src: "/images/brand2-removebg-preview.png",
    alt: "brand",

    id: "2",
  },
  {
    src: "/images/brand3-removebg-preview.png",
    alt: "brand",

    id: "3",
  },
  {
    src: "/images/brand1-removebg-preview.png",
    alt: "brand",

    id: "4",
  },
  {
    src: "/images/brand2-removebg-preview.png",
    alt: "brand",

    id: "5",
  },
  {
    src: "/images/brand3-removebg-preview.png",
    alt: "brand",

    id: "6",
  },
];
type BrandsSwiperProps = {
  onNavStateChange?: (state: { isBeginning: boolean; isEnd: boolean }) => void;
};
const BrandsSwiper = forwardRef<any, BrandsSwiperProps>(
  ({ onNavStateChange }, ref) => {
    const swiperRef = useRef<any>(null);
    // const rating = 4.5;

    // expose ONLY actions
    useImperativeHandle(ref, () => ({
      slideNext: () => swiperRef.current?.slideNext(),
      slidePrev: () => swiperRef.current?.slidePrev(),
    }));

    const updateNavState = (swiper: any) => {
      onNavStateChange?.({
        isBeginning: swiper.isBeginning,
        isEnd: swiper.isEnd,
      });
    };
    return (
      <div className={`mt-5 w-full`}>
        <Swiper
          dir="ltr"
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            updateNavState(swiper);
          }}
          onSlideChange={updateNavState}
          className={styles.BrandSlider}
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            320: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            1024: { slidesPerView: 5 },
          }}
        >
          {brands.map((brand) => (
            <SwiperSlide
              key={brand.id}
              className={clx(styles.brand_card, "group")}
            >
              {/* we can remove scale if our image is fit */}
              <img src={brand.src} alt={brand.alt} className="scale-150" />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    );
  },
);

export default BrandsSwiper;
