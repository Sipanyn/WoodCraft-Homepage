import BrandsSwiper from "@/base/brandsSwiper/BrandsSwiper";
import { SectionHeader } from "@/base/sectionHeader/SectionHeader";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const Brands: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const { t } = useTranslation("popularBrandsSectionHeader");
  const [navState, setNavState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  return (
    <SectionHeader
      swiperState={navState}
      title={t("title")}
      description={t("description")}
      highlight={t("highlight")}
      iconId={
        <i className="bi bi-globe-europe-africa size-7 text-gray-700 dark:text-gray-100 flex justify-center items-center"></i>
      }
      onPrev={() => swiperRef.current?.slidePrev()}
      onNext={() => swiperRef.current?.slideNext()}
    >
      <BrandsSwiper ref={swiperRef} onNavStateChange={setNavState} />
    </SectionHeader>
  );
};
export default Brands;
