import { SectionHeader } from "@/base/sectionHeader/SectionHeader";

const Classification = () => {
  return (
    <SectionHeader
      title="Classificatios"
      description="The latest and most up-to-date categories."
      highlight="Popular"
      iconId={
        <i className="bi bi-square-half size-7 text-gray-700 dark:text-gray-100 flex justify-center items-center" />
      }
    >
      <div className="flex items-center justify-evenly flex-wrap mt-12 gap-x-8 gap-y-8 text-gray-800 dark:text-gray-300">
        <a
          href="shop.html"
          className="group flex flex-col items-center gap-y-1"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNFR3bWUvgfiuw5i7sJvi5oAi5I4cM7PWhRQ&s"
            className="w-25 h-25 lg:w-30 lg:h-30 rounded-full object-cover group-hover:grayscale group-hover:opacity-90 duration-300"
            alt="category"
          />
          <p className="pt-1 text-sm lg:text-lg line-clamp-1">Tables</p>
        </a>

        <a
          href="shop.html"
          className="group flex flex-col items-center gap-y-1"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-SH9GRYAuJ_wzex-YXgy1XxWgdIoZ4geYkw&s"
            className="w-25 h-25 lg:w-30 lg:h-30 rounded-full object-cover group-hover:grayscale group-hover:opacity-90 duration-300"
            alt="category"
          />
          <p className="pt-1 text-sm lg:text-lg line-clamp-1">Chairs</p>
        </a>

        <a
          href="shop.html"
          className="group flex flex-col items-center gap-y-1"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRfb5teS3XqxdWCgyqpjEuhwhTFS25_tX22w&s"
            className="w-25 h-25 lg:w-30 lg:h-30 rounded-full object-cover group-hover:grayscale group-hover:opacity-90 duration-300"
            alt="category"
          />

          <p className="pt-1 text-sm lg:text-lg line-clamp-1">Beds</p>
        </a>

        <a
          href="shop.html"
          className="group flex flex-col items-center gap-y-1"
        >
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9KEY97yGQCNp08vnFH_ZdAEj7qfmPBaKU8Q&s"
            className="w-25 h-25 lg:w-30 lg:h-30 rounded-full object-cover group-hover:grayscale group-hover:opacity-90 duration-300"
            alt="category"
          />
          <p className="pt-1 text-sm lg:text-lg line-clamp-1">
            Cabinets & Wardrobes
          </p>
        </a>

        <a
          href="shop.html"
          className="group flex flex-col items-center gap-y-1"
        >
          <img
            src="https://woodive.store/cdn/shop/files/JBR4_M16_1500x1500_R2_1000x.jpg?v=1750846769"
            className="w-25 h-25 lg:w-30 lg:h-30 rounded-full object-cover group-hover:grayscale group-hover:opacity-90 duration-300"
            alt="category"
          />
          <p className="pt-1 text-sm lg:text-lg line-clamp-1">
            Shelves & Storage
          </p>
        </a>
      </div>
    </SectionHeader>
  );
};

export default Classification;
