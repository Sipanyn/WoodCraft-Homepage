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
import StickyHeader from "@/base/stickyHeader/SteakyHeader";
function HomePage() {
  const { hours, minutes, seconds, isFinished } = useCountdown(
    2 * 3600 + 25 * 60 + 10,
  );

  interface Product {
    id: number;
    title: string;
    src: string;
    price: string;
    oldPrice: string;
  }
  const products: Product[] = [
    {
      id: 1,
      title: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
      src: "/images/chair1.png",
      price: "70,000,000",
      oldPrice: "70,000,000",
    },
    {
      id: 2,
      title: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
      src: "/images/chair1.png",
      price: "70,000,000",
      oldPrice: "70,000,000",
    },
    {
      id: 3,
      title: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
      src: "/images/chair1.png",
      price: "70,000,000",
      oldPrice: "70,000,000",
    },
    {
      id: 4,
      title: "Ethnicraft - CASALE Dining Chairs | Oak - 46 x 52 x 80cm",
      src: "/images/chair1.png",
      price: "70,000,000",
      oldPrice: "70,000,000",
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
                  <span className={styles.timer_box}>{hours}</span>
                  <p className="text-white">:</p>
                  <span className={styles.timer_box}>{minutes}</span>
                  <p className="text-white">:</p>
                  <span className={styles.timer_box}>{seconds}</span>
                </div>
              )}
              <a
                href="shop.html"
                className="flex items-center gap-x-.5 text-gray-100 cursor-pointer"
              >
                <p>View all</p>
                <i className="bi bi-chevron-right"></i>
              </a>
            </div>
            {/* products */}
          </SwiperSlide>
          {products.map((product) => {
            return (
              <SwiperSlide key={product.id} className={clx(styles.small_card)}>
                <span className="w-full text-gray-400 flex items-center justify-end text-sm gap-x-0.5">
                  <p> 5.0 </p>
                  <i className="bi bi-star"></i>
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
                    className={styles.product_card_link}
                  >
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
              <h2>View all</h2>
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
