import { Swiper, SwiperSlide } from "swiper/react";
import styles from "./articlesSwiper.module.css";
import { clx } from "@/utlities/clx";

interface Article {
  id: string | number;
  image: string;
  title: string;
  date: string;
  views: number;
  link: string;
}
type ArticlesSwiperProps = {
  articles: Article[];
};
const articles: Article[] = [
  {
    id: 1,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXDg9CI-or9AYalL1KYkMDzoEowucCrYXMrQ&s",
    title: "Woodwork Article – 2011 Issue – Sculptural Woodwork ",
    date: "1403/5/1",
    views: 120,
    link: "/article-details",
  },
  {
    id: 2,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhZLrv3Y_KQosisCamrGy7es8MsCNwZlZXXA&s",
    title: "Woodwork Article – 2011 Issue – Sculptural Woodwork ",
    date: "1403/5/1",
    views: 98,
    link: "/article-details",
  },
  {
    id: 3,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXDg9CI-or9AYalL1KYkMDzoEowucCrYXMrQ&s",
    title: "Woodwork Article – 2011 Issue – Sculptural Woodwork ",
    date: "1403/5/1",
    views: 120,
    link: "/article-details",
  },
  {
    id: 4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhZLrv3Y_KQosisCamrGy7es8MsCNwZlZXXA&s",
    title: "Woodwork Article – 2011 Issue – Sculptural Woodwork ",
    date: "1403/5/1",
    views: 98,
    link: "/article-details",
  },
  {
    id: 5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXDg9CI-or9AYalL1KYkMDzoEowucCrYXMrQ&s",
    title: "Woodwork Article – 2011 Issue – Sculptural Woodwork ",
    date: "1403/5/1",
    views: 120,
    link: "/article-details",
  },
  {
    id: 6,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhZLrv3Y_KQosisCamrGy7es8MsCNwZlZXXA&s",
    title: "Woodwork Article – 2011 Issue – Sculptural Woodwork ",
    date: "1403/5/1",
    views: 98,
    link: "/article-details",
  },
];
const ArticlesSwiper: React.FC<ArticlesSwiperProps> = () => {
  return (
    <div className="w-full mt-5 mb-5">
      <Swiper
        className="articleSlider"
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          320: { slidesPerView: 1.2 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
        }}
      >
        {articles.map((article) => (
          <SwiperSlide
            key={article.id}
            className={clx("group", styles.article_box)}
          >
            {/* Image */}
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={article.image}
                alt={article.title}
                className={styles.article_box_img}
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 flex items-center justify-center group-hover:opacity-100 transition-all duration-300 rounded-bl-3xl rounded-tr-3xl">
                <a
                  href={article.link}
                  className="flex items-center px-2 py-1 gap-x-1 font-DanaMedium rounded-lg border-2 border-white text-white"
                >
                  <p>continue reading</p>
                  <i className="bi bi-chevron-right scale-70 flex justify-center items-center"></i>
                </a>
              </div>
            </div>

            {/* Title */}
            <div className="flex flex-col gap-y-1 py-5 px-1">
              <h2>{article.title}</h2>
            </div>

            <span className="flex w-full h-1 py-1 border-t border-gray-100 dark:border-white/10"></span>

            {/* Meta */}
            <div className="flex items-center justify-between text-sm px-1">
              <span className="flex items-center gap-x-1 text-wood-dark dark:text-wood-light">
                <i className="bi bi-calendar4-week"></i>
                <p className="mt-1">{article.date}</p>
              </span>

              <span className="flex items-start gap-x-1 text-gray-300">
                <p>{article.views}</p>
                <i className="bi bi-eye"></i>
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ArticlesSwiper;
