import ProductsSwiper from "@/base/productsSwiper/ProductsSwiper";
import { SectionHeader } from "@/base/sectionHeader/SectionHeader";
import { useRef, useState } from "react";

const BestSelling = () => {
  const swiperRef = useRef<any>(null);
  const [navState, setNavState] = useState({
    isBeginning: true,
    isEnd: false,
  });
  return (
    <div>
      <SectionHeader
        swiperState={navState}
        title="Products"
        description="The Newest and up-to-date products"
        highlight="Best selling"
        iconId={
          <i className="bi bi-bookmark-check size-7 text-gray-700 dark:text-gray-100 flex justify-center items-center"></i>
        }
        onPrev={() => swiperRef.current?.slidePrev()}
        onNext={() => swiperRef.current?.slideNext()}
      >
        <ProductsSwiper ref={swiperRef} onNavStateChange={setNavState} />
      </SectionHeader>
    </div>
  );
};
export default BestSelling;
