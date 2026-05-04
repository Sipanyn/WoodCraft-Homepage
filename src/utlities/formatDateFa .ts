export const formatDateFa = (date: string) => {
  return new Date(date).toLocaleDateString("fa-IR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};
