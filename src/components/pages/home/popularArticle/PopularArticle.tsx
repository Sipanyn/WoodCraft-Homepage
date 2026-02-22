import ArticlesSwiper from "@/base/articlesSwiper/ArticlesSwiper";
import { SectionHeader } from "@/base/sectionHeader/SectionHeader";
import { useTranslation } from "react-i18next";

const PopularArticle: React.FC = () => {
  const { t } = useTranslation("articlesSectionHeader");
  return (
    <SectionHeader
      title={t("title")}
      description={t("description")}
      highlight={t("highlight")}
      iconId={
        <i className="bi bi-paperclip size-7 text-gray-700 dark:text-gray-100 flex justify-center items-center"></i>
      }
    >
      <ArticlesSwiper />
    </SectionHeader>
  );
};
export default PopularArticle;
