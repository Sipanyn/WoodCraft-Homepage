export interface OrderItem {
  id: string;
  date: string;
  orderCode: string;
  productNameEn: string;
  productNameFa: string;
  price: number;
  status: "inProgress" | "canceled" | "delivered" | "returned";
  images: string[];
  progressStep?: number;
  factoryName?: string;
}

// Define the steps for the order progress
export const orderProgressSteps = [
  "orderConfirmed", // 0: سفارش تایید شده
  "inProduction", // 1: در حال تولید
  "qualityCheck", // 2: کنترل کیفیت
  "shipped", // 3: ارسال شده
  "delivered", // 4: تحویل داده شده
];

// Translation keys for each step (for i18next)
export const orderProgressStepKeys = {
  orderConfirmed: "orders.progress.confirmed",
  inProduction: "orders.progress.inProduction",
  qualityCheck: "orders.progress.qualityCheck",
  shipped: "orders.progress.shipped",
  delivered: "orders.progress.delivered",
};

export const orders: OrderItem[] = [
  {
    id: "1",
    date: "2026-02-05",
    orderCode: "1233456",
    productNameEn: "Wooden Chair",
    productNameFa: "صندلی چوبی",
    price: 2000000,
    status: "inProgress",
    images: ["/images/chair1.png", "/images/chair1.png"],
    progressStep: 0,
    factoryName: "tehranWoodFactory",
  },
  {
    id: "2",
    date: "2026-02-04",
    orderCode: "1233456",
    productNameEn: "Dining Table",
    productNameFa: "میز ناهارخوری",
    price: 2000000,
    status: "inProgress",
    images: ["/images/chair1.png", "/images/chair1.png"],
    progressStep: 1,
    factoryName: "tabrizWoodFactory",
  },
  {
    id: "3",
    date: "2026-02-05",
    orderCode: "1233456",
    productNameEn: "Office Chair",
    productNameFa: "صندلی اداری",
    price: 2000000,
    status: "canceled",
    images: ["/images/chair1.png", "/images/chair1.png"],
    progressStep: 2,
    factoryName: "tehranWoodFactory",
  },
  {
    id: "4",
    date: "2026-02-05",
    orderCode: "1233456",
    productNameEn: "Classic Sofa",
    productNameFa: "مبل کلاسیک",
    price: 2000000,
    status: "inProgress",
    images: ["/images/chair1.png", "/images/chair1.png"],
    progressStep: 3,
    factoryName: "shirazWoodFactory",
  },
  {
    id: "5",
    date: "2026-02-05",
    orderCode: "1233456",
    productNameEn: "Classic Sofa",
    productNameFa: "مبل کلاسیک",
    price: 2000000,
    status: "returned",
    images: ["/images/chair1.png", "/images/chair1.png"],
    progressStep: 3,
    factoryName: "shirazWoodFactory",
  },
  {
    id: "6",
    date: "2026-02-05",
    orderCode: "1233456",
    productNameEn: "Bed",
    productNameFa: "تخت خواب",
    price: 2000000,
    status: "delivered",
    images: ["/images/chair1.png", "/images/chair1.png"],
    progressStep: 3,
    factoryName: "shirazWoodFactory",
  },
  {
    id: "7",
    date: "2026-02-05",
    orderCode: "1233456",
    productNameEn: "Door",
    productNameFa: "در چوبی",
    price: 2000000,
    status: "delivered",
    images: ["/images/chair1.png", "/images/chair1.png"],
    progressStep: 3,
    factoryName: "shirazWoodFactory",
  },
];
