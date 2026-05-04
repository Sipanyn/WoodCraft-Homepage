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

import encart from "./locales/en/cart.json";
import facart from "./locales/fa/cart.json";

import enmainCart from "./locales/en/mainCart.json";
import famainCart from "./locales/fa/mainCart.json";

import ensideMenu from "./locales/en/sideMenu.json";
import fasideMenu from "./locales/fa/sideMenu.json";

import enfilterBox from "./locales/en/filterBox.json";
import fafilterBox from "./locales/fa/filterBox.json";

import enorderStatus from "./locales/en/orderStatus.json";
import faorderStatus from "./locales/fa/orderStatus.json";

import enmessageData from "./locales/en/messageData.json";
import famessageData from "./locales/fa/messageData.json";

import enbookmarks from "./locales/en/bookmarks.json";
import fabookmarks from "./locales/fa/bookmarks.json";

import enaddresses from "./locales/en/addresses.json";
import faaddresses from "./locales/fa/addresses.json";

import enorderHistory from "./locales/en/orderHistory.json";
import faorderHistory from "./locales/fa/orderHistory.json";

import enshipping from "./locales/en/shipping.json";
import fashipping from "./locales/fa/shipping.json";

import enpayment from "./locales/en/payment.json";
import fapayment from "./locales/fa/payment.json";

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
      cart: encart,
      mainCart: enmainCart,
      sideMenu: ensideMenu,
      filterBox: enfilterBox,
      orderStatus: enorderStatus,
      messageData: enmessageData,
      bookmarks: enbookmarks,
      addresses: enaddresses,
      orderHistory: enorderHistory,
      shipping: enshipping,
      payment: enpayment,
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
      cart: facart,
      mainCart: famainCart,
      sideMenu: fasideMenu,
      filterBox: fafilterBox,
      orderStatus: faorderStatus,
      messageData: famessageData,
      bookmarks: fabookmarks,
      addresses: faaddresses,
      orderHistory: faorderHistory,
      shipping: fashipping,
      payment: fapayment,
    },
  },

  lng: "en",
  fallbackLng: "fa",
  ns: ["footer"],
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  detection: {
    order: ["localStorage", "navigator"],
    caches: ["localStorage"], // IMPORTANT
  },
});

export default i18n;
