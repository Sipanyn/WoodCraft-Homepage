import { forwardRef, useImperativeHandle, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import styles from "./productsSwiper.module.css";
import { clx } from "@/utlities/clx";
import { Autoplay } from "swiper/modules";

interface Product {
  id: number;
  title: string;
  img1: string;
  img2: string;
  price: string;
  oldPrice: string;
}

const products: Product[] = [
  {
    id: 1,
    title: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
    img1: "/images/chair1.png",
    img2: "/images/chair2.png",
    price: "70,000,000",
    oldPrice: "70,000,000",
  },
  {
    id: 2,
    title: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
    img1: "/images/chair1.png",
    img2: "/images/chair2.png",
    price: "70,000,000",
    oldPrice: "70,000,000",
  },
  {
    id: 3,
    title: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
    img1: "/images/chair1.png",
    img2: "/images/chair2.png",
    price: "70,000,000",
    oldPrice: "70,000,000",
  },
  {
    id: 4,
    title: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
    img1: "/images/chair1.png",
    img2: "/images/chair2.png",
    price: "70,000,000",
    oldPrice: "70,000,000",
  },
  {
    id: 5,
    title: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
    img1: "/images/chair1.png",
    img2: "/images/chair2.png",
    price: "70,000,000",
    oldPrice: "70,000,000",
  },
  {
    id: 6,
    title: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
    img1: "/images/chair1.png",
    img2: "/images/chair2.png",
    price: "70,000,000",
    oldPrice: "70,000,000",
  },
  {
    id: 7,
    title: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
    img1: "/images/chair1.png",
    img2: "/images/chair2.png",
    price: "70,000,000",
    oldPrice: "70,000,000",
  },
];

type ProductsSwiperProps = {
  onNavStateChange?: (state: { isBeginning: boolean; isEnd: boolean }) => void;
};

const ProductsSwiper = forwardRef<any, ProductsSwiperProps>(
  ({ onNavStateChange }, ref) => {
    const swiperRef = useRef<any>(null);
    const rating = 4.5;

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
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavState(swiper);
        }}
        onSlideChange={updateNavState}
        // autoplay={{ delay: 2500, disableOnInteraction: false }}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          380: {
            slidesPerView: 1,
            spaceBetween: 16,
          },
          420: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 16,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 16,
          },
        }}
        dir="ltr"
        modules={[Autoplay]}
        className="mt-5 w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product.id}>
            <div className={clx("group", styles.product_card)}>
              {/* header */}
              <div className={styles.product_card_header}>
                <span className={styles.product_card_badge}>70% Off</span>
                <div className={styles.product_card_rating}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i
                      key={i}
                      className={`bi ${
                        i < Math.floor(rating) ? "bi-star-fill" : "bi-star"
                      }`}
                    />
                  ))}
                  <span>{rating}</span>
                </div>
              </div>

              {/* images */}
              <a href="/product-details">
                <img
                  className={clx(
                    styles.product_card_img,
                    "absolute group-hover:opacity-0",
                  )}
                  src={product.img1}
                  alt={product.title}
                />
                <img
                  className={clx(
                    styles.product_card_img,
                    "opacity-0 group-hover:opacity-100",
                  )}
                  src={product.img2}
                  alt={product.title}
                />
              </a>

              {/* price & discount */}
              <div className="space-y-2">
                <a href="/product-details" className={styles.product_card_link}>
                  {product.title}
                </a>
                <div className={styles.product_card_price_wrapper}>
                  <div className={styles.product_card_price}>
                    <div className={styles.prices}>
                      <p>{product.price}</p>
                      <del>{product.oldPrice}$</del>
                    </div>
                    <span>US $</span>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    );
  },
);

export default ProductsSwiper;
