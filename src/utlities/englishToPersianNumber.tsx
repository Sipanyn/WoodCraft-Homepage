const englishToPersianNumber = (str: string | number) => {
  if (typeof str === "number") str = str.toString();
  return str.replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[parseInt(d)]);
};

export default englishToPersianNumber;
