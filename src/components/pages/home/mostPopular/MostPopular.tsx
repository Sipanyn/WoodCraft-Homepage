import { SectionHeader } from "@/base/sectionHeader/SectionHeader";

const MostPopular: React.FC = () => {
  return (
    <SectionHeader
      title="Products"
      description="The latest and most popular products"
      highlight="Most Popular"
      iconId={
        <i className="bi bi-globe-europe-africa size-7 text-gray-700 dark:text-gray-100 flex justify-center items-center"></i>
      }
    />
  );
};
export default MostPopular;
