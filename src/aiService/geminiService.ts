import type {
  Language,
  ProductConfig,
  // AIProvider,
  DimensionField,
  PatternOption,
} from "@/aiService/geminiTypes";

/* ======================================================
   Mocked AI Service for Demo / Styling
   No API calls. Returns fake data instantly.
====================================================== */

export const detectProductType = async (
  prompt: string,
  // sketchBase64: string | null,
  // lang: Language,
  // provider: AIProvider,
): Promise<string> => {
  console.log("[MOCK] detectProductType called with:", prompt);
  return "Wardrobe"; // fake category
};

export const getRequiredDimensions = async (
  productType: string,
  lang: Language,
  // provider: AIProvider,
): Promise<DimensionField[]> => {
  console.log("[MOCK] getRequiredDimensions called with:", productType);
  return [
    { key: "height", label: lang === "fa" ? "ارتفاع" : "Height", unit: "cm" },
    { key: "width", label: lang === "fa" ? "عرض" : "Width", unit: "cm" },
    { key: "depth", label: lang === "fa" ? "عمق" : "Depth", unit: "cm" },
  ];
};

export const suggestPatterns = async (
  productType: string,
  woodType: string,
  notes: string,
  lang: Language,
  // provider: AIProvider,
): Promise<PatternOption[]> => {
  console.log("[MOCK] suggestPatterns called with:", productType, woodType);
  return [
    {
      name: lang === "fa" ? "چوب طبیعی" : "Natural Wood",
      colorCode: "#d2b48c",
    },
    { name: lang === "fa" ? "اوک تیره" : "Dark Oak", colorCode: "#654321" },
    { name: lang === "fa" ? "آلبالو" : "Cherry", colorCode: "#b22222" },
    { name: lang === "fa" ? "افرا" : "Maple", colorCode: "#f5deb3" },
  ];
};

export const generateProductImage = async (
  config: ProductConfig,
  // refinement?: string,
): Promise<string> => {
  console.log("[MOCK] generateProductImage called for:", config.detectedType);
  // Return placeholder image
  return "https://via.placeholder.com/300x300.png?text=Product+Image";
};

export const placeProductInEnvironment = async () // environmentBase64: string,
// confirmedProductBase64: string,
// provider: AIProvider,
// refinement?: string,
: Promise<string> => {
  console.log("[MOCK] placeProductInEnvironment called");
  // Return placeholder image
  return "https://via.placeholder.com/300x300.png?text=Placed+Image";
};
