export const ProductStep = {
  PROMPT: "PROMPT",
  WOOD_TYPE: "WOOD_TYPE",
  COLOR_PATTERN: "COLOR_PATTERN",
  FINISH: "FINISH",
  DIMENSIONS: "DIMENSIONS",
  AI_PREVIEW: "AI_PREVIEW",
  ENVIRONMENT: "ENVIRONMENT",
  ENV_PREVIEW: "ENV_PREVIEW",
  FINAL_CONFIRM: "FINAL_CONFIRM",
} as const;

export type ProductStep = (typeof ProductStep)[keyof typeof ProductStep];

export type Language = "fa" | "en";
export type AIProvider =
  | "gemini-flash"
  | "gemini-pro"
  | "chatgpt"
  | "grok"
  | "deepseek";

export interface DimensionField {
  key: string;
  label: string;
  unit: string;
}

export interface PatternOption {
  name: string;
  colorCode: string; // Hex or CSS color
}

export interface ProductConfig {
  prompt: string;
  sketchUrl: string | null;
  stepNotes: Record<string, string>;
  detectedType: string;
  woodType: WoodOption | null;
  colorPattern: PatternOption | null;
  finish: "glossy" | "matte" | "براق" | "مات";
  dimensions: Record<string, string>;
  requiredDimensionFields: DimensionField[];
  generatedImageUrl: string | null;
  environmentImageUrl: string | null;
  finalRenderUrl: string | null;
  quantity: number;
  aiProvider: AIProvider;
}

export interface WoodOption {
  id: string;
  name: { fa: string; en: string };
  image: string;
  description: { fa: string; en: string };
}

export const WOOD_OPTIONS: WoodOption[] = [
  {
    id: "oak",
    name: { fa: "چوب بلوط", en: "Oak Wood" },
    image: "images/geminiImages/balot.jpg",
    description: {
      fa: "بافت طبیعی و مستحکم تنه بلوط",
      en: "Strong natural oak log texture",
    },
  },
  {
    id: "walnut",
    name: { fa: "چوب گردو", en: "Walnut Wood" },
    image: "images/geminiImages/gerdo.jpg",
    description: {
      fa: "بافت لوکس و تیره گردو با رگه‌های ظریف",
      en: "Dark luxurious walnut planks",
    },
  },
  {
    id: "beech",
    name: { fa: "چوب راش", en: "Beech Wood" },
    image: "images/geminiImages/rash.jpg",
    description: {
      fa: "بافت روشن و منسجم راش",
      en: "Light and dense beech grain",
    },
  },
  {
    id: "pine",
    name: { fa: "چوب کاج", en: "Pine Wood" },
    image: "images/geminiImages/kaj.jpg",
    description: {
      fa: "بافت طبیعی همراه با پوسته و گره‌های کاج",
      en: "Natural pine bark and knots",
    },
  },
  {
    id: "mdf",
    name: { fa: "ام‌دی‌اف (MDF)", en: "MDF Board" },
    image: "images/geminiImages/mdf.jpg",
    description: {
      fa: "ورق صنعتی با سطح کاملاً صاف و یکنواخت",
      en: "Industrial board with uniform surface",
    },
  },
];
