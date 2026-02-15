import React, { useEffect, useRef, useState } from "react";
import {
  Loader2,
  PenTool,
  Eraser,
  Camera,
  CheckCircle,
  LucideSparkle,
  LucideRefreshCw,
  X,
} from "lucide-react";
import { useThemeStore } from "@/stores/useThemeStore ";
import styles from "./AiProductCreator.module.css";

/* =====================================================
   TYPES
===================================================== */

export const ProductStep = {
  PROMPT: "What do you need ?",
  WOOD_TYPE: "Select wood type",
  COLOR_PATTERN: "Suggested color and pattern",
  FINISH: "Type of final coating",
  DIMENSIONS: "DIMENSIONS",
  AI_PREVIEW: "AI_PREVIEW",
  ENVIRONMENT: "ENVIRONMENT",
  ENV_PREVIEW: "ENV_PREVIEW",
  FINAL_CONFIRM: "FINAL_CONFIRM",
} as const;

export type ProductStep = (typeof ProductStep)[keyof typeof ProductStep];

export type Language = "fa" | "en";
export type AIProvider = "gemini-flash";

export type PatternOption = {
  name: string;
  colorCode: string;
};

export type DimensionField = {
  key: string;
  label: string;
  unit: string;
};

export type WoodOption = {
  id: string;
  image: string;
  name: Record<Language, string>;
  description: Record<Language, string>;
};

export type ProductConfig = {
  prompt: string;
  sketchUrl: string | null;
  detectedType: string;
  woodType: WoodOption | null;
  colorPattern: PatternOption | null;
  finish: "matte" | "glossy";
  dimensions: Record<string, string>;
  requiredDimensionFields: DimensionField[];
  generatedImageUrl: string | null;
  environmentImageUrl: string | null;
  finalRenderUrl: string | null;
  aiProvider: AIProvider;
};
type AiProductCreatorProps = {
  onClose: () => void;
};
/* =====================================================
   MOCK DATA
===================================================== */

const WOOD_OPTIONS: WoodOption[] = [
  {
    id: "oak",
    image: "/images/geminiImages/balot.jpg",
    name: { fa: "چوب بلوط", en: "Oak Wood" },
    description: { fa: "مقاوم و لوکس", en: "Durable & premium" },
  },
  {
    id: "walnut",
    image: "/images/geminiImages/gerdo.jpg",
    name: { fa: "چوب گردو", en: "Walnut Wood" },
    description: { fa: "تیره و شیک", en: "Dark & elegant" },
  },
  {
    id: "kaj",
    image: "/images/geminiImages/kaj.jpg",
    name: { fa: "چوب کاج", en: "Pine Wood" },
    description: { fa: "مقاوم و لوکس", en: "Durable & premium" },
  },
  {
    id: "mdf",
    image: "/images/geminiImages/mdf.jpg",
    name: { fa: "چوب mdf", en: "Mdf Wood" },
    description: { fa: "تیره و شیک", en: "Dark & elegant" },
  },
  {
    id: "rash",
    image: "/images/geminiImages/rash.jpg",
    name: { fa: "راش mdf", en: "beech Wood" },
    description: { fa: "تیره و شیک", en: "Dark & elegant" },
  },
];

const PATTERNS: PatternOption[] = [
  { name: "Natural", colorCode: "#c19a6b" },
  { name: "Dark", colorCode: "#5b3a29" },
  { name: "White", colorCode: "#eee" },
];

const DIMENSIONS: DimensionField[] = [
  { key: "width", label: "Width", unit: "cm" },
  { key: "height", label: "Height", unit: "cm" },
  { key: "depth", label: "Depth", unit: "cm" },
];

/* =====================================================
   DRAWING CANVAS
===================================================== */

const DrawingCanvas: React.FC<{
  onSave: (url: string | null) => void;
}> = ({ onSave }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [drawing, setDrawing] = useState(false);
  const theme = useThemeStore((state) => state.theme);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.style.width = "100%"; // CSS size
    // canvas.width = canvas.parentElement!.clientWidth;
    canvas.style.height = "100%";
    canvas.style.minHeight = "240px";

    // 1️⃣ Set styles FIRST
    ctx.fillStyle = theme === "dark" ? "#404040" : "white";
    ctx.strokeStyle = theme === "dark" ? "white" : "black";
    ctx.lineWidth = 3;

    // 2️⃣ Then draw
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, [theme]); // important so it updates when theme changes

  const pos = (e: React.MouseEvent) => {
    const r = canvasRef.current!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2 text-sm font-bold text-black dark:text-white pl-1.5">
        <i className="bi bi-pencil"></i>
        Sketch (optional):
      </div>

      <canvas
        ref={canvasRef}
        className="rounded-2xl border border-gray-200  bg-white dark:bg-neutral-700 shadow-sm cursor-crosshair"
        onMouseDown={(e) => {
          const ctx = canvasRef.current!.getContext("2d")!;
          const p = pos(e);
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          setDrawing(true);
        }}
        onMouseMove={(e) => {
          if (!drawing) return;
          const ctx = canvasRef.current!.getContext("2d")!;
          const p = pos(e);
          ctx.lineTo(p.x, p.y);
          ctx.stroke();
        }}
        onMouseUp={() => {
          setDrawing(false);
          onSave(canvasRef.current!.toDataURL());
        }}
        onMouseLeave={() => setDrawing(false)}
      />
    </div>
  );
};

/* =====================================================
   MAIN COMPONENT
===================================================== */

const AiProductCreator: React.FC<AiProductCreatorProps> = ({ onClose }) => {
  const [step, setStep] = useState<ProductStep>(ProductStep.PROMPT);
  const [loading, setLoading] = useState(false);

  const [config, setConfig] = useState<ProductConfig>({
    prompt: "",
    sketchUrl: null,
    detectedType: "Furniture",
    woodType: null,
    colorPattern: null,
    finish: "matte",
    dimensions: {},
    requiredDimensionFields: DIMENSIONS,
    generatedImageUrl: null,
    environmentImageUrl: null,
    finalRenderUrl: null,
    aiProvider: "gemini-flash",
  });

  const next = () => {
    setLoading(true);
    setTimeout(() => {
      const steps = Object.values(ProductStep);
      const idx = steps.indexOf(step);
      if (idx < steps.length - 1) setStep(steps[idx + 1]);
      setLoading(false);
    }, 500);
  };
  const prev = () => {
    setLoading(true);

    const steps = Object.values(ProductStep);
    const idx = steps.indexOf(step);

    if (idx > 0) {
      setStep(steps[idx - 1]);
    }

    setLoading(false);
  };

  const stepIndex = Object.values(ProductStep).indexOf(step) + 1;
  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // scroll to top
    }
  }, [stepIndex]);
  /* ================= RENDER ================= */

  return (
    <div className="w-fit overflow-hidden rounded-3xl ">
      {/* Modal Card */}
      <div
        ref={scrollRef}
        className={`relative  max-w-5xl max-h-[90vh] overflow-hidden overflow-y-auto rounded-3xl bg-white dark:bg-neutral-800  ${styles.custom_scrollbar}`}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 size-10 flex items-center justify-center rounded-full bg-white dark:bg-neutral-600 shadow-md transition-all active:scale-95 cursor-pointer"
        >
          <X className="size-3.5  text-gray-700 dark:text-white" />
        </button>
        <div className="p-6 sm:p-8 md:p-12">
          {/* STEP HEADER */}
          <div className="text-center space-y-4 mb-3.5 relative">
            <div className="inline-flex px-4 py-1.5 rounded-full bg-wood dark:bg-neutral-700 text-white text-xs font-bold tracking-wide">
              STEP {stepIndex}
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-wood capitalize">
              {step.replace("_", " ")}
            </h2>
          </div>

          {/* PROMPT STEP */}
          {step === ProductStep.PROMPT && (
            <div className="flex flex-col items-center gap-3.5">
              {/* left + right +text */}
              <div className="flex flex-col">
                <p className=" text-gray-400 text-center">
                  Write or draw whatever is on your mind in English
                </p>
              </div>
              {/* left + right */}
              <div className="flex flex-col sm:items-baseline sm:flex-row gap-6 items-center w-full">
                {/* Left */}
                <div className="space-y-2 flex flex-col w-full">
                  <p className="text-sm font-bold text-black dark:text-white ">
                    Text description:
                  </p>
                  <textarea
                    className="w-full h-full  min-h-60 rounded-2xl border border-gray-200 bg-white text-stone-800 dark:text-white  dark:bg-neutral-700 p-5 outline-0 focus:border-2 focus:border-wood text-base resize-none shadow-sm"
                    placeholder="For example, an eight-seater dining table with rounded corners..."
                    value={config.prompt}
                    onChange={(e) =>
                      setConfig({ ...config, prompt: e.target.value })
                    }
                  />
                </div>

                {/* Right */}
                <div className="space-y-2 flex flex-col w-full">
                  <DrawingCanvas
                    onSave={(url) =>
                      setConfig((p) => ({ ...p, sketchUrl: url }))
                    }
                  />
                </div>
              </div>
            </div>
          )}

          {/* WOOD TYPE */}
          {step === ProductStep.WOOD_TYPE && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
              {WOOD_OPTIONS.map((w) => {
                const active = config.woodType?.id === w.id;

                return (
                  <button
                    key={w.id}
                    onClick={() => setConfig({ ...config, woodType: w })}
                    className={`group cursor-pointer rounded-3xl overflow-hidden border-2 transition-all duration-300 ${
                      active
                        ? "border-wood shadow-xl scale-[1.02]"
                        : "border-stone-100 hover:border-wood hover:shadow-lg"
                    }`}
                  >
                    <img
                      src={w.image}
                      className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="p-4 text-left space-y-1">
                      <div className="font-bold text-wood">{w.name.en}</div>
                      <div className="text-sm text-stone-500">
                        {w.description.en}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* COLOR PATTERN */}
          {step === ProductStep.COLOR_PATTERN && (
            <div className="flex flex-wrap gap-6 justify-center animate-in fade-in duration-300">
              {PATTERNS.map((p) => {
                const active = config.colorPattern?.name === p.name;

                return (
                  <div className="flex flex-col justify-center items-center gap-1.5">
                    <button
                      key={p.name}
                      onClick={() => setConfig({ ...config, colorPattern: p })}
                      className={`cursor-pointer w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 transition-all duration-300 ${
                        active
                          ? "border-wood scale-110 shadow-lg"
                          : "border-white shadow-md hover:scale-105"
                      }`}
                      style={{ background: p.colorCode }}
                    />
                    <p className="text-dark dark:text-white">{p.name}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* FINISH */}
          {step === ProductStep.FINISH && (
            <div className="flex flex-wrap gap-6 justify-center animate-in fade-in duration-300">
              {(["matte", "glossy"] as const).map((f) => {
                const active = config.finish === f;

                return (
                  <button
                    key={f}
                    onClick={() => setConfig({ ...config, finish: f })}
                    className={`px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold transition-all duration-300 cursor-pointer text-black dark:text-white ${
                      active
                        ? "bg-wood shadow-lg scale-105"
                        : "border-2  border-wood-light hover:border-wood"
                    }`}
                  >
                    {f.toUpperCase()}
                  </button>
                );
              })}
            </div>
          )}

          {/* DIMENSIONS */}
          {step === ProductStep.DIMENSIONS && (
            <div className="grid sm:grid-cols-3 gap-4 animate-in fade-in duration-300">
              {DIMENSIONS.map((d) => (
                <input
                  type="number"
                  min={0}
                  key={d.key}
                  className="rounded-2xl border-2 border-wood-light p-4 focus:border-wood outline-none transition-all placeholder:text-gray-400 text-black dark:text-white"
                  placeholder={`${d.label} (${d.unit})`}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      dimensions: {
                        ...config.dimensions,
                        [d.key]: e.target.value,
                      },
                    })
                  }
                />
              ))}
            </div>
          )}
          {/* AI_PREVIEW */}
          {step === ProductStep.AI_PREVIEW && (
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-sm border border-amber-50 min-h-[60vh] flex flex-col p-6 md:p-10">
              {/* Header */}
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-bold text-wood">
                  Your Design Preview
                </h2>
              </div>

              <div className="flex-1">
                <div className="text-center space-y-6 animate-in zoom-in duration-500 max-w-xl mx-auto">
                  {/* Image Preview */}
                  <div className="relative group">
                    <img
                      src="https://images.squarespace-cdn.com/content/v1/6552403c051e775e39ce9278/62cfddab-b6a1-46e2-841e-13691cdd9d46/AJ_McCoy_CoffeeTable.jpg?format=2500w"
                      alt="Furniture Preview"
                      className="w-full object-contain rounded-2xl shadow-xl border-4 border-white mx-auto"
                    />
                  </div>

                  {/* Adjustment Note */}
                  <div className="space-y-4 pt-4 border-t border-amber-50">
                    <div className="text-left">
                      <label className="text-sm font-bold text-black dark:text-white flex items-center gap-2 mb-2 px-1">
                        <LucideSparkle className="text-wood" size={18} />
                        Needs adjustment?
                      </label>

                      <div className="relative">
                        <textarea
                          className="w-full p-4 pr-12 border-2 border-gray-400 rounded-2xl focus:border-wood outline-none transition-all text-sm resize-none h-24 dark:placeholder:text-gray-400 dark:text-white"
                          placeholder="For example: make it slightly darker..."
                          value={config.adjustmentNote || ""}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              adjustmentNote: e.target.value,
                            }))
                          }
                        />

                        <button
                          disabled={!config.adjustmentNote}
                          onClick={() => {
                            console.log(
                              "Regenerating with:",
                              config.adjustmentNote,
                            );
                          }}
                          className="absolute right-3 bottom-3 p-3 bg-wood text-white rounded-xl shadow-lg  transition-colors disabled:opacity-40 cursor-pointer"
                        >
                          <LucideRefreshCw size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ENVIRONMENT STEP */}
          {step === ProductStep.ENVIRONMENT && (
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-sm border border-amber-50 min-h-[60vh] flex flex-col p-6 md:p-10">
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-bold text-wood">
                  Select the installation environment
                </h2>
                <p className="text-gray-400 text-sm">
                  Send a photo of the environment where the product will be
                  located
                </p>
              </div>

              <div className="flex-1">
                <div className="text-center space-y-6 animate-in fade-in duration-500">
                  <div className="relative border-4 border-dashed border-stone-100 rounded-3xl p-12 hover:border-wood transition-colors group">
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const url = URL.createObjectURL(file);
                          setConfig((prev) => ({
                            ...prev,
                            environmentImageUrl: url,
                          }));
                        }
                      }}
                    />

                    <span className="font-bold text-wood block mb-2">
                      Select or take a photo of the environment
                    </span>

                    <p className="text-xs text-stone-400">
                      For best results, use appropriate ambient light.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* env preview */}
          {step === ProductStep.ENV_PREVIEW && (
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-sm border border-amber-50 min-h-[60vh] flex flex-col p-2 sm:p-6 md:p-10">
              {/* Header */}
              <div className="text-center space-y-2 mb-8">
                <h2 className="text-2xl font-bold text-wood">
                  View in your environment
                </h2>
                <p className="text-gray-500 text-sm">
                  The final design in your place will look like this:
                </p>
              </div>

              <div className="flex-1">
                <div className="max-w-2xl mx-auto space-y-6 animate-in zoom-in duration-500">
                  {/* Preview Image */}
                  <div className="relative group">
                    {config.previewImageUrl ? (
                      <img
                        src={config.previewImageUrl}
                        alt="preview"
                        className="rounded-3xl shadow-2xl border-4 border-white w-full transition-all duration-500 group-hover:scale-[1.02]"
                      />
                    ) : (
                      <div className="rounded-3xl border-4 border-dashed border-stone-200 h-72 flex items-center justify-center text-stone-400">
                        Preview not yet generated
                      </div>
                    )}
                  </div>

                  {/* Adjustment Section */}

                  <div className="bg-white dark:bg-neutral-800 p-6 rounded-3xl border border-wood shadow-sm space-y-4">
                    <label className="text-sm font-bold text-black dark:text-white flex items-center gap-2 mb-2 px-1">
                      <LucideSparkle className="text-wood" size={18} />
                      Needs adjustment?
                    </label>

                    <div className="w-full">
                      <div className="flex flex-col sm:flex-row sm:items-end gap-3">
                        {/* Textarea */}
                        <textarea
                          rows={4}
                          value={config.adjustmentNote || ""}
                          onChange={(e) =>
                            setConfig((prev) => ({
                              ...prev,
                              adjustmentNote: e.target.value,
                            }))
                          }
                          className="flex-1 w-full p-2  sm:p-4 border-2 border-gray-300 rounded-2xl focus:border-wood outline-none text-sm resize-none h-24 transition placeholder:text-gray-400 text-black dark:text-white"
                          placeholder="For example, move the product a little to the right."
                        />

                        {/* Button */}
                        <button
                          disabled={!config.adjustmentNote}
                          onClick={() => {
                            console.log(
                              "Regenerating with:",
                              config.adjustmentNote,
                            );
                          }}
                          className="px-6 py-3 bg-wood text-white rounded-xl shadow-lg hover:opacity-90 disabled:opacity-30 transition-all w-full sm:w-auto"
                        >
                          Modify
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {step === ProductStep.FINAL_CONFIRM && (
            <div className="bg-white dark:bg-neutral-800 rounded-3xl shadow-sm border border-amber-50 min-h-[60vh] flex flex-col p-4 sm:p-6 md:p-10">
              {/* Header */}
              <div className="text-center space-y-2 mb-6 sm:mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-wood">
                  Final Order Confirmation
                </h2>
              </div>

              <div className="flex-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 animate-in fade-in duration-500 max-w-5xl mx-auto">
                  {/* LEFT SIDE */}
                  <div className="space-y-5">
                    {config.finalRenderUrl ? (
                      <img
                        src={config.finalRenderUrl}
                        alt="final design"
                        className="rounded-3xl shadow-2xl border border-wood w-full object-contain max-h-87.5 sm:max-h-112.5 md:max-h-none transition-all duration-500 hover:scale-[1.01]"
                      />
                    ) : (
                      <div className="rounded-3xl border-2 border-dashed border-stone-200 h-60 sm:h-72 md:h-80 flex items-center justify-center text-stone-400 text-center px-4">
                        No image available
                      </div>
                    )}

                    <div className="bg-green-50 p-4 rounded-2xl flex items-center gap-3 text-green-800 font-bold border border-green-100 text-sm sm:text-base">
                      <CheckCircle
                        className="text-green-600 shrink-0"
                        size={24}
                      />
                      Your final design is ready to order
                    </div>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="space-y-6 sm:space-y-8">
                    {/* SUMMARY */}
                    <div className="bg-amber-50/40 dark:bg-neutral-800 p-5 sm:p-6 md:p-8 rounded-3xl border-2 border-wood space-y-5 shadow-sm">
                      <h3 className="text-base sm:text-lg font-bold text-wood border-b border-gray-300 pb-3">
                        Order Summary:
                      </h3>

                      <div className="flex justify-between gap-4 text-gray-400 text-sm sm:text-base">
                        <span>Product Type:</span>
                        <span className="font-bold text-stone-900 dark:text-white text-right wrap-break-word">
                          {config.detectedType ?? "-"}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4 text-gray-400 text-sm sm:text-base">
                        <span>Wood Type:</span>
                        <span className="font-bold text-stone-900 dark:text-white text-right break-words">
                          {config.woodType?.name?.[lang] ?? "-"}
                        </span>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-gray-400 text-sm sm:text-base">
                        <span>Final Dimensions:</span>

                        <div className="flex flex-col font-bold text-stone-900 dark:text-white sm:text-right">
                          {Array.isArray(config.requiredDimensionFields) &&
                          config.requiredDimensionFields.length > 0 ? (
                            config.requiredDimensionFields.map((f) => (
                              <span key={f.key}>
                                {f.label}: {config.dimensions?.[f.key] ?? "-"}{" "}
                                {f.unit}
                              </span>
                            ))
                          ) : (
                            <span>-</span>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-between gap-4 text-gray-400 text-sm sm:text-base">
                        <span>Finish Type:</span>
                        <span className="font-bold text-stone-900 dark:text-white text-right wrap-break-word">
                          {config.finish ?? "Matte"}
                        </span>
                      </div>
                    </div>

                    {/* QUANTITY */}
                    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 md:gap-2 bg-white p-2  rounded-3xl border-2 border-wood dark:bg-neutral-800 shadow-sm">
                      {/* Label */}
                      <span className="font-bold text-xs sm:text-sm md:text-base text-wood text-center md:text-left mb-1 md:mb-0">
                        Quantity:
                      </span>

                      {/* Buttons & Quantity */}
                      <div className="flex flex-wrap justify-center md:flex-nowrap items-center gap-1  w-full md:w-auto">
                        {/* Decrease */}
                        <button
                          onClick={() =>
                            setConfig((prev) => ({
                              ...prev,
                              quantity: Math.max(1, (prev.quantity ?? 1) - 1),
                            }))
                          }
                          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-black dark:border-gray-500 rounded-full font-bold text-sm sm:text-base md:text-lg lg:text-xl hover:bg-stone-50 dark:hover:bg-neutral-700 transition-all active:scale-95 cursor-pointer dark:text-white"
                        >
                          −
                        </button>

                        {/* Quantity */}
                        <span className="font-bold text-sm sm:text-base md:text-lg lg:text-xl text-stone-900 dark:text-white min-w-[24px] sm:min-w-[28px] md:min-w-[32px] lg:min-w-[36px] text-center">
                          {config.quantity ?? 1}
                        </span>

                        {/* Increase */}
                        <button
                          onClick={() =>
                            setConfig((prev) => ({
                              ...prev,
                              quantity: (prev.quantity ?? 1) + 1,
                            }))
                          }
                          className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 border-2 border-black dark:border-gray-500 rounded-full font-bold text-sm sm:text-base md:text-lg lg:text-xl hover:bg-stone-50 dark:hover:bg-neutral-700 transition-all active:scale-95 cursor-pointer dark:text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* FINAL SUBMIT */}
                    <button
                      onClick={() => {
                        console.log("Submitting order...", config);
                      }}
                      className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold text-base sm:text-lg shadow-lg hover:opacity-90 transition-all active:scale-[0.98] cursor-pointer"
                    >
                      Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACTION */}

          <div
            className={`pt-6 flex flex-row justify-between ${step === ProductStep.PROMPT && "justify-end"}`}
          >
            {/* BACK BUTTON */}
            {step !== ProductStep.PROMPT && (
              <button
                onClick={prev} // change to your back function
                disabled={loading}
                className="px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold border-2 border-gray-400 text-gray-500 dark:border-gray-400 dark:text-white bg-transparent hover:bg-gray-400 hover:text-white dark:hover:bg-neutral-700 transition-all duration-300 disabled:opacity-40 active:scale-[0.98] opacity-30 cursor-pointer"
              >
                Back
              </button>
            )}

            {/* NEXT BUTTON */}
            {step !== ProductStep.FINAL_CONFIRM && (
              <button
                onClick={next}
                disabled={loading}
                className="px-8 sm:px-10 py-3 sm:py-4 rounded-2xl font-bold text-white bg-wood dark:bg-neutral-700 shadow-lg hover:shadow-xl active:scale-[0.98] transition-all   duration-300 disabled:opacity-40 cursor-pointer hover:scale-x-115"
              >
                {loading ? (
                  <Loader2 className="animate-spin mx-auto" />
                ) : (
                  "Next"
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiProductCreator;
