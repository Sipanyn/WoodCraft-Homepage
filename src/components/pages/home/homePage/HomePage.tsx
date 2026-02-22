import Header from "@/base/header/Header";
import Classification from "../classification/Classification";
import Newest from "../newest/Newest";
import BestSelling from "../bestSelling/BestSelling";
import PopularArticle from "../popularArticle/PopularArticle";
import Banner from "@/base/banner/Banner";
import Banners from "../banners/Banners";
import AmazingSlider from "@/base/amazingSlider/AmazingSlider";
import { SwiperSlide } from "swiper/react";
import styles from "./homePage.module.css";
import { clx } from "@/utlities/clx";
import { useCountdown } from "@/hooks/useCountdown";
// @ts-ignore
import OfferIcon from "@/svgs/OfferIcon.svg?react";
// @ts-ignore
// import Amazings from "@/svgs/Amazings.svg?react";
import Brands from "../brands/Brands";
import Features from "../features/Features";
import Footer from "@/base/footer/Footer";
import StickyHeader from "@/base/stickyHeader/StickyHeader";
import { useTranslation } from "react-i18next";
import i18n from "@/utlities/i18n";
import englishToPersianNumber from "@/utlities/englishToPersianNumber";
function HomePage() {
  const { hours, minutes, seconds, isFinished } = useCountdown(
    2 * 3600 + 25 * 60 + 10,
  );
  const { t } = useTranslation("amazingSlider");
  const isFa = i18n.language === "fa";
  interface Product {
    id: number;
    title: string;
    src: string;
    price: string;
    oldPrice: string;
  }
  const products = [
    {
      id: 1,
      title: t("title"),
      src: "/images/chair1.png",
      price: t("price"),
      oldPrice: t("oldPrice"),
      off: t("off"),
      rating: t("rating"),
      totalStars: 5,
    },
    {
      id: 2,
      title: t("title"),
      src: "/images/chair1.png",
      price: t("price"),
      oldPrice: t("oldPrice"),
      off: t("off"),
      rating: t("rating"),
      totalStars: 5,
    },
    {
      id: 3,
      title: t("title"),
      src: "/images/chair1.png",
      price: t("price"),
      oldPrice: t("oldPrice"),
      off: t("off"),
      rating: t("rating"),
      totalStars: 5,
    },
    {
      id: 4,
      title: t("title"),
      src: "/images/chair1.png",
      price: t("price"),
      oldPrice: t("oldPrice"),
      off: t("off"),
      rating: t("rating"),
      totalStars: 5,
    },
    {
      id: 5,
      title: t("title"),
      src: "/images/chair1.png",
      price: t("price"),
      oldPrice: t("oldPrice"),
      off: t("off"),
      rating: t("rating"),
      totalStars: 5,
    },
    {
      id: 6,
      title: t("title"),
      src: "/images/chair1.png",
      price: t("price"),
      oldPrice: t("oldPrice"),
      off: t("off"),
      rating: t("rating"),
      totalStars: 5,
    },
    {
      id: 7,
      title: t("title"),
      src: "/images/chair1.png",
      price: t("price"),
      oldPrice: t("oldPrice"),
      off: t("off"),
      rating: t("rating"),
      totalStars: 5,
    },
  ];
  return (
    <div>
      <StickyHeader />
      <div className="container">
        <Header />
        <Classification />
        <AmazingSlider>
          <SwiperSlide className={styles.amazing_card}>
            {/* timer */}
            <div
              className={clx(
                styles.amazing_card,
                "swiper-slide  swiper-slide-active",
              )}
              role="group"
              aria-label="1 / 8"
              style={{ marginLeft: "10px" }}
            >
              <OfferIcon className="w-32 h-32 text-white dark:text-wood" />
              {/* <Amazings className="w-28 h-28 text-white dark:text-wood" /> */}
              {!isFinished && (
                <div className="flex items-center gap-x-2">
                  <span className={styles.timer_box}>
                    {isFa ? englishToPersianNumber(hours) : hours}
                  </span>
                  <p className="text-white">:</p>
                  <span className={styles.timer_box}>
                    {isFa ? englishToPersianNumber(minutes) : minutes}
                  </span>
                  <p className="text-white">:</p>
                  <span className={styles.timer_box}>
                    {isFa ? englishToPersianNumber(seconds) : seconds}
                  </span>
                </div>
              )}
              <a
                href="shop.html"
                className="flex items-center gap-x-.5 text-gray-100 cursor-pointer"
              >
                <p>{t("viewAll")}</p>
                <i className="bi bi-chevron-right"></i>
              </a>
            </div>
            {/* products */}
          </SwiperSlide>
          {products.map((product) => {
            return (
              <SwiperSlide key={product.id} className={clx(styles.small_card)}>
                <span className="w-full text-gray-400 flex items-center justify-end text-sm gap-x-0.5">
                  <p>
                    {" "}
                    {isFa ? englishToPersianNumber(t("rating")) : t("rating")}
                  </p>
                  <i className="bi-star-fill text-wood"></i>
                </span>

                <a href="product-details.html">
                  <img
                    className={styles.small_card_img}
                    src={product.src}
                    alt=""
                  />
                </a>
                {/* price & discount */}
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
              </SwiperSlide>
            );
          })}
          {/* last slide */}
          <SwiperSlide
            className={clx(
              styles.amazing_card_last,
              "cursor-pointer text-wood font-bold",
            )}
          >
            <a
              href="shop.html"
              className="flex flex-col justify-center items-center"
            >
              <i className="bi bi-arrow-right-circle scale-150 "></i>
              <h2>{t("viewAll")}</h2>
            </a>
          </SwiperSlide>
        </AmazingSlider>
        <Newest />
        <Banners>
          <Banner
            src={
              "https://woodstage.in/wp-content/uploads/2023/01/web-banner-01-01-scaled-1.jpg"
            }
          />
          <Banner
            src={
              "https://woodstage.in/wp-content/uploads/2023/01/web-banner-01-01-scaled-1.jpg"
            }
          />
        </Banners>
        <BestSelling />
        <Brands />
        {/* <MostPopular /> */}
        <PopularArticle />
        <Features />
        <Footer />
      </div>
    </div>
  );
}

export default HomePage;
