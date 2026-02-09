import BrandsSwiper from "@/base/brandsSwiper/BrandsSwiper";
import { SectionHeader } from "@/base/sectionHeader/SectionHeader";
import { useRef, useState } from "react";

const Brands: React.FC = () => {
  const swiperRef = useRef<any>(null);
  const [navState, setNavState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  return (
    <SectionHeader
      swiperState={navState}
      title="Brands"
      description="The Newest and up-to-date brands"
      highlight="Popular"
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
