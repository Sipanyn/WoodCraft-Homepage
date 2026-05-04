type StatKey = "wallet" | "tickets" | "orders";

type FilterBoxItem = {
  key: StatKey;
  icon: string;
  titleKey: string;
  contentKey: string;
};

export const filterBoxData: FilterBoxItem[] = [
  {
    key: "wallet",
    icon: "bi bi-wallet",
    titleKey: "wallet",
    contentKey: "cash",
  },
  {
    key: "tickets",
    icon: "bi bi-ticket-perforated",
    titleKey: "tickets",
    contentKey: "ticket",
  },
  {
    key: "orders",
    icon: "bi bi-box-seam",
    titleKey: "orders",
    contentKey: "order",
  },
];
