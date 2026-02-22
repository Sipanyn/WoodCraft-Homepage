import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
interface FeatureItem {
  icon: ReactNode;
  title: string;
}

const Features: React.FC = () => {
  const { t } = useTranslation("features");
  const features: FeatureItem[] = [
    {
      icon: <i className="bi bi-award text-2xl"></i>,
      title: t("GuaranteeOfOriginality"),
    },
    {
      icon: <i className="bi bi-truck text-2xl"></i>,
      title: t("ExpressDelivery"),
    },
    {
      icon: <i className="bi bi-headset text-2xl"></i>,
      title: t("24/7Support"),
    },
    {
      icon: <i className="bi bi-credit-card text-2xl"></i>,
      title: t("PayOnDelivery"),
    },
    {
      icon: <i className="bi bi-box-seam text-2xl"></i>,
      title: t("7DaysReturn"),
    },
  ];
  return (
    <div className="w-full mt-10 mb-10 lg:mt-20 flex flex-row flex-wrap gap-3 justify-center items-stretch">
      {features.map((feature, index) => (
        <div
          key={index}
          className="
            group
            flex flex-col items-center justify-center
            gap-y-2
            p-4
            rounded-2xl
            bg-white dark:bg-zinc-900
            border border-gray-100 dark:border-white/10
            shadow-sm
            transition-all duration-300 ease-out
            hover:-translate-y-2 hover:shadow-lg
            w-30
            sm:w-45
            hover:cursor-pointer
          "
        >
          {/* Icon */}
          <div
            className="
              flex items-center justify-center
              w-12 h-12
              rounded-xl
              bg-gray-100 dark:bg-zinc-800
              text-gray-700 dark:text-gray-200
              transition-all duration-300
              group-hover:bg-wood group-hover:text-white
              group-pointer
            
            "
          >
            {feature.icon}
          </div>

          {/* Title */}
          <p className="text-center text-sm font-medium text-gray-600 dark:text-gray-300">
            {feature.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Features;
