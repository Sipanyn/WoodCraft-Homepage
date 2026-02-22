import ProductsSwiper from "@/base/productsSwiper/ProductsSwiper";
import { SectionHeader } from "@/base/sectionHeader/SectionHeader";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const Newest = () => {
  const swiperRef = useRef<any>(null);
  const { t } = useTranslation("newestSectionHeader");
  const { t: T } = useTranslation("newestProducts");
  const [navState, setNavState] = useState({
    isBeginning: true,
    isEnd: false,
  });

  const products = [
    {
      id: 1,
      title: T("title"),
      img1: "/images/chair1.png",
      img2: "/images/chair2.png",
      price: T("price"),
      oldPrice: T("oldPrice"),
      off: T("off"),
      rating: T("rating"),
      totalStars: 5,
    },
    {
      id: 2,
      title: T("title"),
      img1: "/images/chair1.png",
      img2: "/images/chair2.png",
      price: T("price"),
      oldPrice: T("oldPrice"),
      off: T("off"),
      rating: T("rating"),
      totalStars: 5,
    },
    {
      id: 3,
      title: T("title"),
      img1: "/images/chair1.png",
      img2: "/images/chair2.png",
      price: T("price"),
      oldPrice: T("oldPrice"),
      off: T("off"),
      rating: T("rating"),
      totalStars: 5,
    },
    {
      id: 4,
      title: T("title"),
      img1: "/images/chair1.png",
      img2: "/images/chair2.png",
      price: T("price"),
      oldPrice: T("oldPrice"),
      off: T("off"),
      rating: T("rating"),
      totalStars: 5,
    },
    {
      id: 5,
      title: T("title"),
      img1: "/images/chair1.png",
      img2: "/images/chair2.png",
      price: T("price"),
      oldPrice: T("oldPrice"),
      off: T("off"),
      rating: T("rating"),
      totalStars: 5,
    },
    {
      id: 6,
      title: T("title"),
      img1: "/images/chair1.png",
      img2: "/images/chair2.png",
      price: T("price"),
      oldPrice: T("oldPrice"),
      off: T("off"),
      rating: T("rating"),
      totalStars: 5,
    },
    {
      id: 7,
      title: T("title"),
      img1: "/images/chair1.png",
      img2: "/images/chair2.png",
      price: T("price"),
      oldPrice: T("oldPrice"),
      off: T("off"),
      rating: T("rating"),
      totalStars: 5,
    },
  ];
  return (
    <div>
      <SectionHeader
        swiperState={navState}
        title={t("title")}
        description={t("description")}
        highlight={t("highlight")}
        iconId={
          <i className="bi bi-magic size-7 text-gray-700 dark:text-gray-100 flex justify-center items-center"></i>
        }
        onPrev={() => swiperRef.current?.slidePrev()}
        onNext={() => swiperRef.current?.slideNext()}
      >
        <ProductsSwiper
          ref={swiperRef}
          onNavStateChange={setNavState}
          products={products}
        />
      </SectionHeader>
    </div>
  );
};
export default Newest;
