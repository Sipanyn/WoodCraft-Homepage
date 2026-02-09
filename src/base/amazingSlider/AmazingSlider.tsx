import { Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/swiper.css";

import styles from "./AmazingSlider.module.css";
// @ts-ignore
import "swiper/css/navigation";
type AmazingSliderProps = {
  children: React.ReactNode;
};

const AmazingSlider: React.FC<AmazingSliderProps> = ({ children }) => {
  return (
    <section className="mx-4 lg:container mt-20">
      <div className={styles.wrapper}>
        <Swiper
          dir="ltr"
          modules={[Navigation]}
          slidesPerView="auto"
          spaceBetween={10}
          navigation={{
            nextEl: ".AmazingSliderNext",
            prevEl: ".AmazingSliderPrev",
          }}
          className={styles.swiper}
        >
          {children}
        </Swiper>

        {/* Prev */}
        <button
          className={`${styles.sliderNavigateBtn} AmazingSliderNext  absolute right-1 top-1/2 -translate-y-1/2`}
        >
          <i className="bi bi-chevron-right"></i>
        </button>

        {/* Next */}
        <button
          className={`${styles.sliderNavigateBtn}  AmazingSliderPrev absolute left-1 top-1/2 -translate-y-1/2`}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
      </div>
    </section>
  );
};

export default AmazingSlider;
