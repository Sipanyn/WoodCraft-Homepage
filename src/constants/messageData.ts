interface MessageInfo {
  id?: string;
  type?: "inProgress" | "delivered" | "returned" | "canceled";
  headerIconClass?: string;
  headerTitle?: string;
  headerSubtitle?: string;
  productImageSrc?: string;
  productName?: string;
  productQuantity?: number;
  deliveryCode?: string;
  codeTitle?: string;
  date?: string;
  footerText?: string;
  footerIconClass?: string;
}

export const messages: MessageInfo[] = [
  {
    id: "msg-inprogress-1",
    type: "inProgress",
    headerIconClass: "bi bi-truck",
    headerTitle: "Your order is on the way!",
    headerSubtitle:
      "Your order will arrive soon. Please have your delivery code ready for the agent.",
    productImageSrc: "images/chair1.png",
    productName: "Modern Chair",
    productQuantity: 2,
    codeTitle: "Delivery Code",
    deliveryCode: "122345",
    date: "2026-02-05",
    footerText: "Estimated Delivery:",
  },
  {
    id: "msg-delivered-1",
    type: "delivered",
    headerIconClass: "bi bi-check-circle-fill",
    headerTitle: "Your order has been delivered!",
    headerSubtitle:
      "Thank you for your purchase. We hope you enjoy your new Modern Chair!",
    productImageSrc: "images/chair1.png",
    productName: "Modern Chair",
    productQuantity: 1,
    footerText: "Delivered on:",
    date: "2026-02-05",
    footerIconClass: "bi bi-check-circle-fill",
  },
  {
    id: "msg-returned-1",
    type: "returned",
    headerIconClass: "bi bi-arrow-left-right",
    headerTitle: "Your return is being processed.",
    headerSubtitle:
      "We have received your return request for the Modern Chair. It should be processed within 3-5 business days.",
    productImageSrc: "images/chair1.png",
    productName: "Modern Chair",
    productQuantity: 1,
    date: "2026-02-05",
  },
  {
    id: "msg-canceled-1",
    type: "canceled",
    headerIconClass: "bi bi-x-circle-fill",
    headerTitle: "Your order has been canceled.",
    headerSubtitle:
      "Your order for the Modern Chair has been canceled. If this was a mistake, please contact support.",
    productImageSrc: "images/chair1.png",
    productName: "Modern Chair",
    productQuantity: 1,
    footerText: "Canceled on",
    date: "2026-02-05",
  },
];
