import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enfooter from "./locales/en/footer.json";
import frfooter from "./locales/fa/footer.json";

import enfeatures from "./locales/en/features.json";
import fafeatures from "./locales/fa/features.json";

import enarticlesSectionHeader from "./locales/en/articlesSectionHeader.json";
import faarticlesSectionHeader from "./locales/fa/articlesSectionHeader.json";

import enarticlesSwiper from "./locales/en/articlesSwiper.json";
import faarticlesSwiper from "./locales/fa/articlesSwiper.json";

import enpopularBrandsSectionHeader from "./locales/en/popularBrandsSectionHeader.json";
import fapopularBrandsSectionHeader from "./locales/fa/popularBrandsSectionHeader.json";

import enbestSellingSectionHeader from "./locales/en/bestSellingSectionHeader.json";
import fabestSellingSectionHeader from "./locales/fa/bestSellingSectionHeader.json";

import ennewestSectionHeader from "./locales/en/newestSectionHeader.json";
import fanewestSectionHeader from "./locales/fa/newestSectionHeader.json";

import enclassificationSectionHeader from "./locales/en/classificationSectionHeader.json";
import faclassificationSectionHeader from "./locales/fa/classificationSectionHeader.json";

import enclassificationContent from "./locales/en/classificationContent.json";
import faclassificationContent from "./locales/fa/classificationContent.json";

import ennewestProducts from "./locales/en/newestProducts.json";
import fanewestProducts from "./locales/fa/newestProducts.json";

import enbestSellingProducts from "./locales/en/bestSellingProducts.json";
import fabestSellingProducts from "./locales/fa/bestSellingProducts.json";

import enamazingSlider from "./locales/en/amazingSlider.json";
import faamazingSlider from "./locales/fa/amazingSlider.json";

import ennavBar from "./locales/en/navBar.json";
import fanavBar from "./locales/fa/navBar.json";

import ensticky from "./locales/en/sticky.json";
import fasticky from "./locales/fa/sticky.json";

import enhamburgerMenu from "./locales/en/hamburgerMenu.json";
import fahamburgerMenu from "./locales/fa/hamburgerMenu.json";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      footer: enfooter,
      features: enfeatures,
      articlesSectionHeader: enarticlesSectionHeader,
      articlesSwiper: enarticlesSwiper,
      popularBrandsSectionHeader: enpopularBrandsSectionHeader,
      bestSellingSectionHeader: enbestSellingSectionHeader,
      newestSectionHeader: ennewestSectionHeader,
      classificationSectionHeader: enclassificationSectionHeader,
      classificationContent: enclassificationContent,
      newestProducts: ennewestProducts,
      bestSellingProducts: enbestSellingProducts,
      amazingSlider: enamazingSlider,
      navBar: ennavBar,
      sticky: ensticky,
      hamburgerMenu: enhamburgerMenu,
    },
    fa: {
      footer: frfooter,
      features: fafeatures,
      articlesSectionHeader: faarticlesSectionHeader,
      articlesSwiper: faarticlesSwiper,
      popularBrandsSectionHeader: fapopularBrandsSectionHeader,
      bestSellingSectionHeader: fabestSellingSectionHeader,
      newestSectionHeader: fanewestSectionHeader,
      classificationSectionHeader: faclassificationSectionHeader,
      classificationContent: faclassificationContent,
      newestProducts: fanewestProducts,
      bestSellingProducts: fabestSellingProducts,
      amazingSlider: faamazingSlider,
      navBar: fanavBar,
      sticky: fasticky,
      hamburgerMenu: fahamburgerMenu,
    },
  },

  lng: "en",
  fallbackLng: "fa",
  ns: ["footer"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
