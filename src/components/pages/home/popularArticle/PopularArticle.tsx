import ArticlesSwiper from "@/base/articlesSwiper/ArticlesSwiper";
import { SectionHeader } from "@/base/sectionHeader/SectionHeader";

const PopularArticle: React.FC = () => {
  return (
    <SectionHeader
      title="Articles"
      description="The newest and most up‑to‑date articles"
      highlight="Most Popular"
      iconId={
        <i className="bi bi-paperclip size-7 text-gray-700 dark:text-gray-100 flex justify-center items-center"></i>
      }
    >
      <ArticlesSwiper />
    </SectionHeader>
  );
};
export default PopularArticle;
