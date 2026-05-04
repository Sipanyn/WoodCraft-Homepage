import BookmarkedItem from "@/components/bookmarks/bookmarkedItem/BookmarkedItem";
import { useBookmarkStore } from "@/stores/useBookmarkStore";
import { useTranslation } from "react-i18next";

const Bookmarks: React.FC = () => {
  const items = useBookmarkStore((state) => state.items);
  const { t } = useTranslation("bookmarks");
  return (
    <div className="rounded-lg shadow mb-4 bg-white dark:bg-zinc-900 p-3.5 flex flex-col gap-5">
      <p className="font-medium text-black dark:text-white">
        {t("bookmarks.title")}
      </p>
      {/* Conditional rendering for empty or populated list */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <i className="bi bi-bookmark text-6xl text-gray-300 mb-4"></i>
          <p className="text-xl text-gray-500"> {t("bookmarks.emptyTitle")}</p>
          <p className="text-md text-gray-400 mt-2">
            {" "}
            {t("bookmarks.emptySubtitle")}
          </p>
        </div>
      ) : (
        // This is the grid that displays the bookmarked items
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-6">
          {items.map((item) => (
            <BookmarkedItem key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
};
export default Bookmarks;
