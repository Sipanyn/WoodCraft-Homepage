import type { ReactNode } from "react";
import styles from "./sectionHeader.module.css";
import { useTranslation } from "react-i18next";

type SectionHeaderProps = {
  title: string;
  highlight?: string;
  description?: string;
  iconId?: ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  viewAllHref?: string;
  swiperState?: {
    isBeginning: boolean;
    isEnd: boolean;
  };
} & React.PropsWithChildren;

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  highlight,
  description,
  iconId,
  onPrev,
  onNext,
  viewAllHref = "#",
  children,
  swiperState,
}) => {
  const { t } = useTranslation("articlesSectionHeader");
  const { i18n } = useTranslation();

  const isFa = i18n.language === "fa";
  return (
    <section className="mx-4 lg:container mt-10 lg:mt-20">
      {/* SECTION TITLE */}
      <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between w-full sm:text-start">
        {/* Left side: icon + text */}
        <div className="flex items-center justify-center gap-x-2 sm:gap-x-4">
          <span className="size-12 hidden sm:flex rounded-lg bg-white shadow-lg dark:bg-neutral-700 justify-center items-center">
            {iconId}
          </span>

          <div className="space-y-1 flex flex-col items-center sm:items-start">
            <p className="text-xl md:text-2xl font-MorabbaMedium text-gray-800 dark:text-gray-50">
              {highlight && <span className="text-wood mr-1">{highlight}</span>}
              {title}
            </p>

            {description && (
              <p className="text-sm text-gray-500 dark:text-gray-300">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* navigation buttons + view all button */}
        <div
          className={`w-full sm:w-auto flex sm:justify-end items-center gap-x-2 ${
            onNext || onPrev ? "justify-between" : "justify-center"
          }`}
        >
          {(onPrev || onNext) && (
            <div className="flex items-center gap-x-2">
              {onPrev && (
                <button
                  onClick={onPrev}
                  className={styles.sliderNavigateBtn}
                  aria-label="Previous"
                  disabled={swiperState?.isBeginning}
                >
                  <i
                    className={`${isFa ? "bi bi-chevron-right" : " bi bi-chevron-left"}`}
                  />
                </button>
              )}

              {onNext && (
                <button
                  onClick={onNext}
                  className={styles.sliderNavigateBtn}
                  aria-label="Next"
                  disabled={swiperState?.isEnd}
                >
                  <i
                    className={`${isFa ? "bi bi-chevron-left" : " bi bi-chevron-right"}`}
                  />
                </button>
              )}
            </div>
          )}

          {viewAllHref && (
            <a
              href={viewAllHref}
              className="group shadow-xl text-sm md:text-base flex gap-x-1.5 items-center px-2 h-10 md:px-3 text-white bg-wood dark:bg-neutral-700 rounded-xl"
            >
              <p>{t("viewAll")}</p>
              <span
                className={`w-7 h-7 rounded-full bg-wood-light dark:bg-neutral-400 flex-center transition-transform duration-300 flex justify-center items-center ${
                  isFa
                    ? "md:group-hover:-translate-x-1"
                    : "md:group-hover:translate-x-1"
                }`}
              >
                <i
                  className={`bi ${isFa ? "bi-arrow-left" : "bi-arrow-right"}`}
                />
              </span>
            </a>
          )}
        </div>
      </div>

      {children}
    </section>
  );
};
