import { forwardRef, useImperativeHandle, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.css";
import styles from "./productsSwiper.module.css";
import { clx } from "@/utlities/clx";
import { Autoplay } from "swiper/modules";
import i18n from "@/utlities/i18n";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";

type Product = {
  id: string | number;
  title: string;
  img1: string;
  img2: string;
  price: string | number;
  oldPrice: string | number;
  off: string | null;
  rating: string;
  totalStars?: number;
};

type ProductsSwiperProps = {
  products: Product[];
  onNavStateChange?: (state: { isBeginning: boolean; isEnd: boolean }) => void;
};

export type ProductsSwiperRef = {
  slideNext: () => void;
  slidePrev: () => void;
};

const ProductsSwiper = forwardRef<ProductsSwiperRef, ProductsSwiperProps>(
  ({ products, onNavStateChange }, ref) => {
    const swiperRef = useRef<any>(null);

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
    const isFa = i18n.language === "fa";
    return (
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          updateNavState(swiper);
        }}
        onSlideChange={updateNavState}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          380: { slidesPerView: 1, spaceBetween: 16 },
          420: { slidesPerView: 2, spaceBetween: 16 },
          768: { slidesPerView: 3, spaceBetween: 16 },
          1024: { slidesPerView: 4, spaceBetween: 16 },
        }}
        dir="ltr"
        modules={[Autoplay]}
        className="mt-5 w-full"
      >
        {products?.map((product) => (
          <SwiperSlide key={product.id}>
            <div className={clx("group", styles.product_card)}>
              {/* header */}
              <div className={styles.product_card_header}>
                <div
                  className={clx(
                    styles.product_card_badge,
                    !isFa ? "flex-row-reverse" : "flex-row",
                  )}
                >
                  <p>{isFa ? `تخفیف` : `Off`}</p>
                  <p> {isFa ? ` ${product.off}` : `${product.off}`}</p>
                </div>

                <div className={styles.product_card_rating}>
                  {Array.from({ length: product?.totalStars }).map((_, i) => {
                    const starNumber = i + 1;

                    let iconClass = "bi-star"; // default empty

                    if (Number(product?.rating) >= starNumber) {
                      iconClass = "bi-star-fill"; // full star
                    } else if (Number(product?.rating) >= starNumber - 0.5) {
                      iconClass = "bi-star-half"; // half star
                    }

                    return <i key={i} className={`bi ${iconClass}`} />;
                  })}

                  <span>
                    {isFa
                      ? englishToPersianNumber(product?.rating)
                      : product?.rating}
                    {}
                  </span>
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

              {/* price + title */}
              <div className="space-y-2">
                <a
                  href="/product-details"
                  className={clx(
                    styles.product_card_link,
                    isFa ? "text-end" : "text-start",
                  )}
                >
                  {product.title}
                </a>

                <div className={styles.product_card_price_wrapper}>
                  <div
                    className={clx(
                      styles.product_card_price,
                      "flex",
                      isFa ? "flex-row-reverse" : "flex-row",
                    )}
                  >
                    <div
                      className={clx(
                        styles.prices,
                        isFa ? "items-end" : "items-start",
                      )}
                    >
                      <p>{product.price}</p>
                      <del>
                        {product.oldPrice}
                        {isFa ? "تومان" : "$"}
                      </del>
                    </div>
                    <span className="flex justify-center items-center">
                      {isFa ? "تومان" : "US $"}
                    </span>
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

ProductsSwiper.displayName = "ProductsSwiper";

export default ProductsSwiper;
