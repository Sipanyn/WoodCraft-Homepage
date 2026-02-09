import React, { ReactNode } from "react";
import styles from "./sectionHeader.module.css";

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
  return (
    <section className="mx-4 lg:container mt-10 lg:mt-20">
      {/* SECTION TITLE */}
      <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between w-full sm:text-start">
        {/* Left side: icon + text */}
        <div className="flex items-center justify-center gap-x-2 sm:gap-x-4">
          <span className="size-12 hidden sm:flex rounded-lg bg-white shadow-lg dark:bg-neutral-700 justify-center items-center">
            {iconId}
          </span>

          <div className="space-y-1">
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
                  <i className="bi bi-chevron-left" />
                </button>
              )}

              {onNext && (
                <button
                  onClick={onNext}
                  className={styles.sliderNavigateBtn}
                  aria-label="Next"
                  disabled={swiperState?.isEnd}
                >
                  <i className="bi bi-chevron-right" />
                </button>
              )}
            </div>
          )}

          {viewAllHref && (
            <a
              href={viewAllHref}
              className="group shadow-xl text-sm md:text-base flex gap-x-1.5 items-center px-2 h-10 md:px-3 text-white bg-wood dark:bg-neutral-700 rounded-xl"
            >
              <p>View all</p>
              <span className="w-7 h-7 rounded-full bg-wood-light dark:bg-neutral-400 flex-center md:group-hover:translate-x-1 transition-transform duration-300 flex justify-center items-center">
                <i className="bi bi-arrow-right" />
              </span>
            </a>
          )}
        </div>
      </div>

      {children}
    </section>
  );
};
