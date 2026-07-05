import React, { useState, useMemo, useEffect } from "react";
import {
  Zap, Headphones, Watch, Camera, Speaker, Keyboard, Gamepad2,
  Monitor, ShoppingCart, Plus, Minus, X, Search, Check, Cpu, Timer, Smartphone, ArrowLeft,
  Phone, MessageCircle, LogOut
} from "lucide-react";

// ---- Brand tokens --------------------------------------------------------
// page: #F7F7F9  surface: #FFFFFF  border: #E7E7EE  (dark accent panels stay #0B0B14/#1E1E2C)
// flash (primary/signature): #F5D400   volt (secondary): #8B5CF6
// ink text: #14141F   mute: #6B6B7A

const FONT_IMPORT =
  "@import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;800;900&family=JetBrains+Mono:wght@400;600&display=swap');";

const WHATSAPP_NUMBER = "780030066";
// رقم المالك — يدخل مباشرة بدون رمز تفعيل، بينما باقي المستخدمين يمرّون بخطوة التفعيل
const OWNER_NUMBER = "780030066";

// ---- Data --------------------------------------------------------------

const CATEGORIES = [
  { id: "all", label: "الكل" },
  { id: "audio", label: "صوتيات" },
  { id: "wearable", label: "أجهزة قابلة للارتداء" },
  { id: "computing", label: "حوسبة" },
  { id: "imaging", label: "تصوير" },
];

const DEFAULT_PRODUCTS = [
  { id: "FT-0288", name: "ساعة ذكية بمقياس نبض متقدم", cat: "wearable", price: 599, spec: "شاشة AMOLED / مقاومة للماء IP68", icon: Watch, flash: false },
  { id: "FT-0355", name: "كاميرا أكشن 4K مقاومة للصدمات", cat: "imaging", price: 899, spec: "تثبيت إلكتروني / تصوير بطيء", icon: Camera, flash: true },
  { id: "FT-0410", name: "مكبر صوت محمول 360 درجة", cat: "audio", price: 249, spec: "20 واط / مقاوم للغبار والماء", icon: Speaker, flash: false },
  { id: "FT-0521", name: "لوحة مفاتيح ميكانيكية بإضاءة RGB", cat: "computing", price: 429, spec: "مفاتيح بنية / اتصال لاسلكي ثلاثي", icon: Keyboard, flash: false },
  { id: "FT-0607", name: "يد تحكم ألعاب لاسلكية احترافية", cat: "computing", price: 279, spec: "استجابة 1 مللي ثانية / بطارية 30 ساعة", icon: Gamepad2, flash: true },
  { id: "FT-0678", name: "شاشة عرض منحنية 27 بوصة QHD", cat: "computing", price: 1299, spec: "165 هرتز / زمن استجابة 1ms", icon: Monitor, flash: false },
  { id: "FT-0733", name: "سماعات أذن رياضية مقاومة للعرق", cat: "wearable", price: 199, spec: "عزل ضجيج نشط / شحن سريع", icon: Headphones, flash: false },
  { id: "FT-0819", name: "معالج تطوير للمشاريع الذكية", cat: "computing", price: 459, spec: "8 أنوية / دعم الذكاء الاصطناعي", icon: Cpu, flash: false },
];

const ICON_OPTIONS = [
  { id: "Headphones", label: "سماعة رأس", Icon: Headphones },
  { id: "Watch", label: "ساعة", Icon: Watch },
  { id: "Camera", label: "كاميرا", Icon: Camera },
  { id: "Speaker", label: "مكبر صوت", Icon: Speaker },
  { id: "Keyboard", label: "لوحة مفاتيح", Icon: Keyboard },
  { id: "Gamepad2", label: "يد تحكم", Icon: Gamepad2 },
  { id: "Monitor", label: "شاشة", Icon: Monitor },
  { id: "Cpu", label: "معالج", Icon: Cpu },
  { id: "Smartphone", label: "جوال", Icon: Smartphone },
];

const fmt = (n) => n.toLocaleString("ar-EG");

// ---- Sell-your-phone data ------------------------------------------------

const BRANDS = [
  { id: "apple", label: "أبل" },
  { id: "samsung", label: "سامسونج" },
];

const MODELS_BY_BRAND = {
  apple: [
    { id: "11", label: "آيفون 11", base: 750 },
    { id: "11pro", label: "آيفون 11 برو", base: 900 },
    { id: "11promax", label: "آيفون 11 برو ماكس", base: 1050 },
    { id: "12", label: "آيفون 12", base: 1150 },
    { id: "12mini", label: "آيفون 12 ميني", base: 1000 },
    { id: "12pro", label: "آيفون 12 برو", base: 1400 },
    { id: "12promax", label: "آيفون 12 برو ماكس", base: 1600 },
    { id: "13", label: "آيفون 13", base: 1700 },
    { id: "13mini", label: "آيفون 13 ميني", base: 1500 },
    { id: "13pro", label: "آيفون 13 برو", base: 2000 },
    { id: "13promax", label: "آيفون 13 برو ماكس", base: 2250 },
    { id: "14", label: "آيفون 14", base: 2200 },
    { id: "14plus", label: "آيفون 14 بلس", base: 2400 },
    { id: "14pro", label: "آيفون 14 برو", base: 2750 },
    { id: "14promax", label: "آيفون 14 برو ماكس", base: 3000 },
    { id: "15", label: "آيفون 15", base: 2900 },
    { id: "15plus", label: "آيفون 15 بلس", base: 3150 },
    { id: "15pro", label: "آيفون 15 برو", base: 3800 },
    { id: "15promax", label: "آيفون 15 برو ماكس", base: 4300 },
    { id: "16", label: "آيفون 16", base: 3600 },
    { id: "16plus", label: "آيفون 16 بلس", base: 3900 },
    { id: "16pro", label: "آيفون 16 برو", base: 4600 },
    { id: "16promax", label: "آيفون 16 برو ماكس", base: 5200 },
    { id: "17", label: "آيفون 17", base: 4400 },
    { id: "17pro", label: "آيفون 17 برو", base: 5500 },
    { id: "17promax", label: "آيفون 17 برو ماكس", base: 6200 },
  ],
  samsung: [
    { id: "note20", label: "جالاكسي نوت 20", base: 700 },
    { id: "note20ultra", label: "جالاكسي نوت 20 ألترا", base: 950 },
    { id: "s21", label: "جالاكسي S21", base: 800 },
    { id: "s21plus", label: "جالاكسي S21 بلس", base: 950 },
    { id: "s21ultra", label: "جالاكسي S21 ألترا", base: 1300 },
    { id: "s22", label: "جالاكسي S22", base: 1100 },
    { id: "s22plus", label: "جالاكسي S22 بلس", base: 1300 },
    { id: "s22ultra", label: "جالاكسي S22 ألترا", base: 1750 },
    { id: "s23", label: "جالاكسي S23", base: 1500 },
    { id: "s23plus", label: "جالاكسي S23 بلس", base: 1750 },
    { id: "s23ultra", label: "جالاكسي S23 ألترا", base: 2300 },
    { id: "s24", label: "جالاكسي S24", base: 2000 },
    { id: "s24plus", label: "جالاكسي S24 بلس", base: 2350 },
    { id: "s24ultra", label: "جالاكسي S24 ألترا", base: 3000 },
    { id: "s25", label: "جالاكسي S25", base: 2600 },
    { id: "s25plus", label: "جالاكسي S25 بلس", base: 3000 },
    { id: "s25ultra", label: "جالاكسي S25 ألترا", base: 3800 },
    { id: "s26", label: "جالاكسي S26", base: 3400 },
    { id: "s26plus", label: "جالاكسي S26 بلس", base: 3900 },
    { id: "s26ultra", label: "جالاكسي S26 ألترا", base: 4800 },
  ],
};

const DEFAULT_COLORS = [
  { id: "black", label: "أسود", hex: "#1c1c1e" },
  { id: "white", label: "أبيض", hex: "#f5f5f0" },
  { id: "titanium", label: "تيتانيوم طبيعي", hex: "#8a8378" },
  { id: "blue", label: "أزرق", hex: "#3a5a78" },
  { id: "gold", label: "ذهبي", hex: "#cfb280" },
  { id: "pink", label: "وردي", hex: "#e8c4c8" },
];

// iPhone 17 family gets its own palette, as requested
const IPHONE17_COLORS = [
  { id: "white17", label: "أبيض", hex: "#f5f5f0" },
  { id: "orange17", label: "برتقالي", hex: "#d9702e" },
  { id: "green17", label: "أخضر", hex: "#4f6b52" },
  { id: "yellow17", label: "أصفر", hex: "#e8cf5e" },
  { id: "maroon17", label: "عنابي", hex: "#5c2430" },
  { id: "pink17", label: "وردي", hex: "#e8b8c0" },
];

function getColorsForModel(brand, modelId) {
  if (brand === "apple" && ["17", "17pro", "17promax"].includes(modelId)) {
    return IPHONE17_COLORS;
  }
  return DEFAULT_COLORS;
}

const STORAGE_OPTIONS = [
  { id: "64", label: "64 جيجا", mult: 0.8 },
  { id: "128", label: "128 جيجا", mult: 0.9 },
  { id: "256", label: "256 جيجا", mult: 1 },
  { id: "512", label: "512 جيجا", mult: 1.15 },
  { id: "1tb", label: "1 تيرا", mult: 1.35 },
  { id: "2tb", label: "2 تيرا", mult: 1.6 },
];

const CONDITIONS = [
  { id: "sealed", label: "مختوم (لم يُفتح)", mult: 1.1 },
  { id: "new", label: "جديد (مستخدم قليلًا)", mult: 1 },
  { id: "excellent", label: "ممتازة (بدون خدوش)", mult: 0.9 },
  { id: "good", label: "جيدة (خدوش بسيطة)", mult: 0.78 },
  { id: "fair", label: "متوسطة (خدوش واضحة)", mult: 0.6 },
  { id: "poor", label: "ضعيفة (كسور أو أعطال)", mult: 0.35 },
];

function estimatePrice({ brand, model, storage, condition, cleanliness, battery }) {
  if (!brand || !model || !storage || !condition) return null;
  const m = (MODELS_BY_BRAND[brand] || []).find((x) => x.id === model);
  const s = STORAGE_OPTIONS.find((x) => x.id === storage);
  const c = CONDITIONS.find((x) => x.id === condition);
  if (!m || !s || !c) return null;
  const cleanFactor = 0.7 + (cleanliness / 100) * 0.3; // 70%–100%
  const batteryFactor = battery >= 90 ? 1 : 0.75 + (battery / 100) * 0.25;
  const raw = m.base * s.mult * c.mult * cleanFactor * batteryFactor;
  return Math.round(raw / 10) * 10;
}

// ---- Small pieces ---------------------------------------------------------

function BoltMark({ size = 20, color = "#0B0B14" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path d="M13 2 L4 14 H11 L10 22 L20 9 H13 L13 2Z" fill={color} />
    </svg>
  );
}

function SpecTag({ children }) {
  return (
    <span
      className="inline-block px-2 py-0.5 rounded text-[11px] tracking-wide"
      style={{
        fontFamily: "'JetBrains Mono', monospace",
        color: "#0B0B14",
        background: "#F5D400",
        direction: "ltr",
        fontWeight: 600,
      }}
    >
      {children}
    </span>
  );
}

function ProductCard({ product, onAdd, justAdded }) {
  const Icon = product.icon;
  return (
    <div
      className="group relative rounded-lg border overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1"
      style={{ background: "#FFFFFF", borderColor: "#E7E7EE" }}
    >
      {/* jagged bolt corner tag — the card's signature cut */}
      <div className="absolute top-0 right-0 z-10 flex items-start">
        <svg width="34" height="34" viewBox="0 0 34 34" className="absolute top-0 right-0">
          <path d="M34 0 L34 34 L0 0 Z" fill="#F5D400" />
        </svg>
        <BoltMark size={13} color="#0B0B14" />
        <span className="sr-only">{product.id}</span>
      </div>
      <div className="absolute top-3 left-3 z-10">
        <SpecTag>{product.id}</SpecTag>
      </div>
      {product.flash && (
        <div
          className="absolute bottom-3 left-3 z-10 px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1"
          style={{ background: "rgba(139,92,246,0.15)", color: "#B69CFF", border: "1px solid #8B5CF6" }}
        >
          <Zap size={10} /> عرض خاطف
        </div>
      )}

      <div className="h-36 flex items-center justify-center relative overflow-hidden" style={{ background: "#0B0B14" }}>
        <svg className="absolute -right-4 -top-4 opacity-[0.07] group-hover:opacity-20 transition-opacity duration-300" width="120" height="120" viewBox="0 0 24 24">
          <path d="M13 2 L4 14 H11 L10 22 L20 9 H13 L13 2Z" fill="#F5D400" />
        </svg>
        <Icon size={46} strokeWidth={1.25} style={{ color: "#F5D400" }} />
      </div>

      <div className="p-4 flex flex-col gap-2 flex-1 text-right">
        <h3 className="text-[15px] font-semibold leading-snug" style={{ color: "#14141F" }}>
          {product.name}
        </h3>
        <p
          className="text-xs"
          style={{ color: "#6B6B7A", direction: "ltr", textAlign: "right", fontFamily: "'JetBrains Mono', monospace" }}
        >
          {product.spec}
        </p>

        <div className="mt-auto pt-3 flex items-center justify-between gap-2">
          <span
            className="text-lg font-black"
            style={{ color: "#F5D400", fontFamily: "'JetBrains Mono', monospace", direction: "ltr" }}
          >
            {fmt(product.price)} ﷼
          </span>
          <button
            onClick={() => onAdd(product)}
            className="flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-bold transition-all duration-200 active:scale-95"
            style={{
              background: justAdded ? "#8B5CF6" : "#F5D400",
              color: "#0B0B14",
            }}
          >
            {justAdded ? <Check size={16} /> : <Plus size={16} />}
            {justAdded ? "أُضيف" : "أضف للسلة"}
          </button>
        </div>
      </div>
    </div>
  );
}

function OptionPills({ options, value, onChange, labelKey = "label", idKey = "id" }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = value === opt[idKey];
        return (
          <button
            key={opt[idKey]}
            type="button"
            onClick={() => onChange(opt[idKey])}
            className="px-3 py-1.5 rounded-md text-sm font-bold border-2 transition-all active:scale-95"
            style={{
              borderColor: isSelected ? "#F5D400" : "#E7E7EE",
              background: isSelected ? "#F5D400" : "#FFFFFF",
              color: isSelected ? "#0B0B14" : "#6B6B7A",
              boxShadow: isSelected ? "0 2px 8px rgba(245,212,0,0.35)" : "none",
            }}
          >
            {isSelected && "✓ "}{opt[labelKey]}
          </button>
        );
      })}
    </div>
  );
}

function BrandTile({ brand, selected, onSelect }) {
  const isApple = brand.id === "apple";
  return (
    <button
      type="button"
      onClick={() => onSelect(brand.id)}
      className="flex-1 relative flex flex-col items-center gap-2 rounded-lg border-2 py-4 transition-all active:scale-95"
      style={{
        borderColor: selected ? "#F5D400" : "#E7E7EE",
        background: selected ? "rgba(245,212,0,0.12)" : "#FFFFFF",
        boxShadow: selected ? "0 2px 8px rgba(245,212,0,0.3)" : "none",
      }}
    >
      {selected && (
        <div
          className="absolute top-2 left-2 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: "#F5D400" }}
        >
          <Check size={13} style={{ color: "#0B0B14" }} strokeWidth={3} />
        </div>
      )}
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center"
        style={{ background: isApple ? "#2A2A3A" : "rgba(139,92,246,0.15)" }}
      >
        <Smartphone size={20} style={{ color: isApple ? "#EDEBF5" : "#B69CFF" }} />
      </div>
      <span className="text-sm font-black" style={{ color: "#14141F" }}>
        {brand.label}
      </span>
    </button>
  );
}

function SellPhoneModal({ open, onClose }) {
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [color, setColor] = useState("");
  const [storage, setStorage] = useState("");
  const [condition, setCondition] = useState("");
  const [cleanliness, setCleanliness] = useState(85);
  const [battery, setBattery] = useState(90);
  const [submitted, setSubmitted] = useState(false);

  const models = MODELS_BY_BRAND[brand] || [];
  const colors = getColorsForModel(brand, model);

  const estimate = useMemo(
    () => estimatePrice({ brand, model, storage, condition, cleanliness, battery }),
    [brand, model, storage, condition, cleanliness, battery]
  );

  const canEstimate = brand && model && storage && condition;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, [open]);

  const reset = () => {
    setBrand(""); setModel(""); setColor(""); setStorage(""); setCondition("");
    setCleanliness(85); setBattery(90); setSubmitted(false);
  };

  const handleClose = () => { onClose(); setTimeout(reset, 300); };

  const handleBrandSelect = (id) => {
    setBrand(id);
    setModel("");
    setColor("");
  };

  const handleModelSelect = (id) => {
    setModel(id);
    setColor("");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" dir="rtl">
      <div onClick={handleClose} className="absolute inset-0 bg-black/70" />
      <div
        className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto overscroll-contain rounded-t-2xl sm:rounded-2xl border"
        style={{ background: "#FFFFFF", borderColor: "#E7E7EE", WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 border-b z-10" style={{ borderColor: "#E7E7EE", background: "#FFFFFF" }}>
          <h2 className="text-lg font-black flex items-center gap-2" style={{ color: "#14141F" }}>
            <Smartphone size={18} style={{ color: "#F5D400" }} />
            بيع جهازك
          </h2>
          <button onClick={handleClose} style={{ color: "#6B6B7A" }} className="hover:text-white">
            <X size={22} />
          </button>
        </div>

        {submitted ? (
          <div className="p-6 flex flex-col items-center text-center gap-3">
            <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: "rgba(245,212,0,0.12)" }}>
              <Check size={26} style={{ color: "#F5D400" }} />
            </div>
            <p className="text-base font-bold" style={{ color: "#14141F" }}>استلمنا طلبك بنجاح</p>
            <p className="text-sm" style={{ color: "#6B6B7A" }}>
              سيتواصل معك فريق Box خلال 24 ساعة لتأكيد السعر وترتيب الاستلام.
            </p>
            <button
              onClick={handleClose}
              className="mt-2 px-5 py-2.5 rounded-md font-bold"
              style={{ background: "#F5D400", color: "#0B0B14" }}
            >
              تم
            </button>
          </div>
        ) : (
          <div className="p-4 flex flex-col gap-5 text-right">
            <div>
              <p className="text-sm font-bold mb-2" style={{ color: "#14141F" }}>نوع الجهاز</p>
              <div className="flex gap-3">
                {BRANDS.map((b) => (
                  <BrandTile key={b.id} brand={b} selected={brand === b.id} onSelect={handleBrandSelect} />
                ))}
              </div>
            </div>

            {brand && (
              <div>
                <p className="text-sm font-bold mb-2" style={{ color: "#14141F" }}>الموديل</p>
                <div className="relative">
                  <select
                    value={model}
                    onChange={(e) => handleModelSelect(e.target.value)}
                    className="w-full appearance-none px-3 py-3 rounded-md border-2 text-sm font-bold outline-none"
                    style={{
                      borderColor: model ? "#F5D400" : "#E7E7EE",
                      background: model ? "#F5D400" : "#FFFFFF",
                      color: "#0B0B14",
                    }}
                  >
                    <option value="" disabled>اختر الموديل...</option>
                    {models.map((m) => (
                      <option key={m.id} value={m.id}>{m.label}</option>
                    ))}
                  </select>
                  <ArrowLeft
                    size={16}
                    className="absolute top-1/2 -translate-y-1/2 left-3 -rotate-90 pointer-events-none"
                    style={{ color: "#0B0B14" }}
                  />
                </div>
                {model && (
                  <p className="text-xs mt-1.5 font-bold" style={{ color: "#14141F" }}>
                    ✓ الموديل المختار: {models.find((m) => m.id === model)?.label}
                  </p>
                )}
              </div>
            )}

            {model && (
              <div>
                <p className="text-sm font-bold mb-2" style={{ color: "#14141F" }}>اللون</p>
                <div className="flex flex-wrap gap-3">
                  {colors.map((c) => {
                    const isSelected = color === c.id;
                    const isLight = ["white", "white17", "gold", "yellow17"].includes(c.id);
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setColor(c.id)}
                        title={c.label}
                        className="relative w-11 h-11 rounded-full flex items-center justify-center transition-all active:scale-90"
                        style={{
                          background: c.hex,
                          border: isSelected ? "3px solid #F5D400" : "2px solid #E7E7EE",
                          boxShadow: isSelected
                            ? "0 0 0 3px #FFFFFF, 0 0 0 5px #F5D400, 0 4px 10px rgba(245,212,0,0.35)"
                            : "none",
                          transform: isSelected ? "scale(1.08)" : "scale(1)",
                        }}
                      >
                        {isSelected && (
                          <Check
                            size={16}
                            strokeWidth={3.5}
                            style={{ color: isLight ? "#0B0B14" : "#FFFFFF" }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
                {color && (
                  <p className="text-xs mt-2 font-bold" style={{ color: "#14141F" }}>
                    ✓ اللون المختار: {colors.find((c) => c.id === color)?.label}
                  </p>
                )}
              </div>
            )}

            <div>
              <p className="text-sm font-bold mb-2" style={{ color: "#14141F" }}>سعة التخزين</p>
              <OptionPills options={STORAGE_OPTIONS} value={storage} onChange={setStorage} />
            </div>

            <div>
              <p className="text-sm font-bold mb-2" style={{ color: "#14141F" }}>حالة الجهاز</p>
              <OptionPills options={CONDITIONS} value={condition} onChange={setCondition} />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-bold" style={{ color: "#14141F" }}>نسبة النظافة</p>
                <span className="text-sm font-bold" style={{ color: "#14141F", fontFamily: "'JetBrains Mono', monospace" }}>{cleanliness}%</span>
              </div>
              <input
                type="range" min="0" max="100" value={cleanliness}
                onChange={(e) => setCleanliness(Number(e.target.value))}
                className="w-full accent-yellow-400"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <p className="text-sm font-bold" style={{ color: "#14141F" }}>عمر البطارية (سعة الصحة)</p>
                <span className="text-sm font-bold" style={{ color: "#14141F", fontFamily: "'JetBrains Mono', monospace" }}>{battery}%</span>
              </div>
              <input
                type="range" min="50" max="100" value={battery}
                onChange={(e) => setBattery(Number(e.target.value))}
                className="w-full accent-yellow-400"
              />
              <p className="text-xs mt-1" style={{ color: "#6B6B7A" }}>تجدها في الإعدادات ← البطارية ← صحة البطارية</p>
            </div>

            <div className="rounded-lg border p-4 flex items-center justify-between" style={{ borderColor: "#2A2A3A", background: "#0B0B14" }}>
              <div>
                <p className="text-xs" style={{ color: "#85839A" }}>السعر التقديري</p>
                <p className="text-2xl font-black" style={{ color: "#F5D400", fontFamily: "'JetBrains Mono', monospace" }}>
                  {estimate ? `${fmt(estimate)} ﷼` : "— أكمل البيانات —"}
                </p>
              </div>
              <Zap size={26} style={{ color: canEstimate ? "#F5D400" : "#2A2A3A" }} />
            </div>

            <button
              disabled={!canEstimate}
              onClick={() => setSubmitted(true)}
              className="w-full py-3 rounded-md font-black flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-40"
              style={{ background: "#F5D400", color: "#0B0B14" }}
            >
              أرسل طلب البيع
              <ArrowLeft size={16} />
            </button>
            <p className="text-[11px] text-center -mt-2" style={{ color: "#6B6B7A" }}>
              السعر تقديري ويُحدَّد نهائيًا بعد فحص الجهاز.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

function CartDrawer({ open, onClose, items, onInc, onDec, total, onCheckout }) {
  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] z-50 flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ background: "#FFFFFF", borderLeft: "1px solid #E7E7EE" }}
        dir="rtl"
      >
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: "#E7E7EE" }}>
          <h2 className="text-lg font-bold flex items-center gap-2" style={{ color: "#14141F" }}>
            <Zap size={18} style={{ color: "#F5D400" }} />
            سلة المشتريات
          </h2>
          <button onClick={onClose} style={{ color: "#6B6B7A" }} className="hover:text-white">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
          {items.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full gap-2 text-center" style={{ color: "#6B6B7A" }}>
              <ShoppingCart size={36} strokeWidth={1} />
              <p>السلة فارغة الآن. أضف منتجًا لتبدأ.</p>
            </div>
          )}
          {items.map((it) => (
            <div key={it.id} className="flex items-center gap-3 p-3 rounded-lg border" style={{ borderColor: "#2A2A3A", background: "#0B0B14" }}>
              <div className="w-11 h-11 rounded-md flex items-center justify-center shrink-0" style={{ background: "#1E1E2C" }}>
                <it.icon size={20} style={{ color: "#F5D400" }} />
              </div>
              <div className="flex-1 min-w-0 text-right">
                <p className="text-sm font-medium truncate" style={{ color: "#EDEBF5" }}>{it.name}</p>
                <p style={{ color: "#F5D400", fontFamily: "'JetBrains Mono', monospace", direction: "ltr", textAlign: "right" }} className="text-sm font-bold">
                  {fmt(it.price)} ﷼
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button onClick={() => onDec(it.id)} className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "#1E1E2C", color: "#EDEBF5" }}>
                  <Minus size={13} />
                </button>
                <span className="w-5 text-center text-sm" style={{ color: "#EDEBF5", fontFamily: "'JetBrains Mono', monospace" }}>{it.qty}</span>
                <button onClick={() => onInc(it.id)} className="w-6 h-6 rounded flex items-center justify-center" style={{ background: "#1E1E2C", color: "#EDEBF5" }}>
                  <Plus size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div className="p-4 border-t flex flex-col gap-3" style={{ borderColor: "#E7E7EE" }}>
            <div className="flex items-center justify-between text-base font-bold" style={{ color: "#14141F" }}>
              <span>الإجمالي</span>
              <span style={{ color: "#F5D400", fontFamily: "'JetBrains Mono', monospace", direction: "ltr" }}>{fmt(total)} ﷼</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-3 rounded-md font-black flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              style={{ background: "#F5D400", color: "#0B0B14" }}
            >
              <Zap size={16} />
              إتمام الطلب
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

function AddProductModal({ open, onClose, onAdd }) {
  const [name, setName] = useState("");
  const [cat, setCat] = useState("audio");
  const [price, setPrice] = useState("");
  const [spec, setSpec] = useState("");
  const [iconId, setIconId] = useState("Headphones");
  const [flash, setFlash] = useState(false);

  const isValid = name.trim() && price && Number(price) > 0;

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, [open]);

  const reset = () => {
    setName(""); setCat("audio"); setPrice(""); setSpec(""); setIconId("Headphones"); setFlash(false);
  };

  const handleClose = () => { onClose(); setTimeout(reset, 300); };

  const handleSubmit = () => {
    if (!isValid) return;
    const IconComp = ICON_OPTIONS.find((i) => i.id === iconId)?.Icon || Headphones;
    const newProduct = {
      id: `FT-${Math.floor(1000 + Math.random() * 9000)}`,
      name: name.trim(),
      cat,
      price: Number(price),
      spec: spec.trim() || "—",
      icon: IconComp,
      flash,
    };
    onAdd(newProduct);
    handleClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" dir="rtl">
      <div onClick={handleClose} className="absolute inset-0 bg-black/70" />
      <div
        className="relative w-full sm:max-w-lg max-h-[92vh] overflow-y-auto overscroll-contain rounded-t-2xl sm:rounded-2xl border"
        style={{ background: "#FFFFFF", borderColor: "#E7E7EE", WebkitOverflowScrolling: "touch", touchAction: "pan-y" }}
      >
        <div className="sticky top-0 flex items-center justify-between p-4 border-b z-10" style={{ borderColor: "#E7E7EE", background: "#FFFFFF" }}>
          <h2 className="text-lg font-black flex items-center gap-2" style={{ color: "#14141F" }}>
            <Plus size={18} style={{ color: "#F5D400" }} />
            إضافة منتج جديد
          </h2>
          <button onClick={handleClose} style={{ color: "#6B6B7A" }} className="hover:text-black">
            <X size={22} />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-4 text-right">
          <div>
            <label className="text-sm font-bold block mb-1.5" style={{ color: "#14141F" }}>اسم المنتج</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="مثال: سماعة بلوتوث رياضية"
              className="w-full px-3 py-2.5 rounded-md border outline-none text-sm"
              style={{ borderColor: "#E7E7EE", background: "#F7F7F9", color: "#14141F" }}
            />
          </div>

          <div>
            <label className="text-sm font-bold block mb-1.5" style={{ color: "#14141F" }}>الفئة</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCat(c.id)}
                  className="px-3 py-1.5 rounded-md text-sm font-medium border"
                  style={{
                    borderColor: cat === c.id ? "#F5D400" : "#E7E7EE",
                    background: cat === c.id ? "rgba(245,212,0,0.15)" : "#FFFFFF",
                    color: cat === c.id ? "#14141F" : "#6B6B7A",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-bold block mb-1.5" style={{ color: "#14141F" }}>السعر (ريال)</label>
            <input
              type="number"
              inputMode="numeric"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="299"
              className="w-full px-3 py-2.5 rounded-md border outline-none text-sm"
              style={{ borderColor: "#E7E7EE", background: "#F7F7F9", color: "#14141F", fontFamily: "'JetBrains Mono', monospace", direction: "ltr", textAlign: "right" }}
            />
          </div>

          <div>
            <label className="text-sm font-bold block mb-1.5" style={{ color: "#14141F" }}>المواصفات</label>
            <input
              value={spec}
              onChange={(e) => setSpec(e.target.value)}
              placeholder="مثال: 20 ساعة تشغيل / مقاوم للماء"
              className="w-full px-3 py-2.5 rounded-md border outline-none text-sm"
              style={{ borderColor: "#E7E7EE", background: "#F7F7F9", color: "#14141F" }}
            />
          </div>

          <div>
            <label className="text-sm font-bold block mb-1.5" style={{ color: "#14141F" }}>الأيقونة</label>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setIconId(opt.id)}
                  title={opt.label}
                  className="w-11 h-11 rounded-md border flex items-center justify-center"
                  style={{
                    borderColor: iconId === opt.id ? "#F5D400" : "#E7E7EE",
                    background: iconId === opt.id ? "rgba(245,212,0,0.15)" : "#F7F7F9",
                  }}
                >
                  <opt.Icon size={18} style={{ color: "#14141F" }} />
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setFlash((f) => !f)}
            className="flex items-center justify-between px-3 py-2.5 rounded-md border"
            style={{ borderColor: "#E7E7EE", background: "#F7F7F9" }}
          >
            <span className="text-sm font-bold flex items-center gap-1.5" style={{ color: "#14141F" }}>
              <Zap size={14} style={{ color: "#8B5CF6" }} />
              عرض خاطف
            </span>
            <span
              className="w-10 h-5 rounded-full relative transition-colors"
              style={{ background: flash ? "#8B5CF6" : "#E7E7EE" }}
            >
              <span
                className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all"
                style={{ [flash ? "right" : "left"]: "2px" }}
              />
            </span>
          </button>

          <button
            disabled={!isValid}
            onClick={handleSubmit}
            className="w-full py-3 rounded-md font-black flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-40"
            style={{ background: "#F5D400", color: "#0B0B14" }}
          >
            <Plus size={16} />
            إضافة المنتج للمتجر
          </button>
        </div>
      </div>
    </div>
  );
}

function SplashScreen({ onFinish }) {
  const [phase, setPhase] = useState("scatter"); // scatter -> logo -> exit

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("logo"), 900);
    const t2 = setTimeout(() => setPhase("exit"), 2400);
    const t3 = setTimeout(() => onFinish(), 2900);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onFinish]);

  const floaters = [
    { Icon: Headphones, top: "14%", left: "18%", delay: 0, rotate: -12 },
    { Icon: Watch, top: "20%", left: "72%", delay: 80, rotate: 10 },
    { Icon: Camera, top: "38%", left: "8%", delay: 160, rotate: 8 },
    { Icon: Monitor, top: "34%", left: "78%", delay: 240, rotate: -8 },
    { Icon: Keyboard, top: "62%", left: "12%", delay: 320, rotate: 14 },
    { Icon: Gamepad2, top: "66%", left: "70%", delay: 400, rotate: -14 },
    { Icon: Speaker, top: "80%", left: "30%", delay: 480, rotate: 6 },
    { Icon: Cpu, top: "78%", left: "58%", delay: 560, rotate: -6 },
  ];

  return (
    <div
      dir="rtl"
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden transition-opacity duration-500"
      style={{
        background: "#F7F7F9",
        fontFamily: "'Cairo', sans-serif",
        opacity: phase === "exit" ? 0 : 1,
      }}
    >
      <style>{`
        ${FONT_IMPORT}
        @keyframes floatIn {
          0% { transform: translateY(-46px) scale(1.4); filter: blur(10px); opacity: 0; }
          100% { transform: translateY(0) scale(1); filter: blur(0px); opacity: 0.9; }
        }
        @keyframes logoPop {
          0% { transform: scale(0.7); opacity: 0; }
          60% { transform: scale(1.08); opacity: 1; }
          100% { transform: scale(1); opacity: 1; }
        }
        .floater { animation: floatIn 0.7s cubic-bezier(.2,.8,.2,1) both; }
        .logo-pop { animation: logoPop 0.5s cubic-bezier(.2,.8,.2,1) both; }
      `}</style>

      {phase !== "exit" && floaters.map((f, i) => (
        <div
          key={i}
          className="floater absolute w-16 h-16 rounded-2xl border flex items-center justify-center"
          style={{
            top: f.top,
            left: f.left,
            background: "#FFFFFF",
            borderColor: "#E7E7EE",
            transform: `rotate(${f.rotate}deg)`,
            animationDelay: `${f.delay}ms`,
            boxShadow: "0 8px 20px rgba(20,20,31,0.06)",
          }}
        >
          <f.Icon size={26} style={{ color: "#14141F" }} strokeWidth={1.5} />
        </div>
      ))}

      {(phase === "logo" || phase === "exit") && (
        <div className="logo-pop flex flex-col items-center gap-3 relative z-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: "#F5D400" }}>
            <Zap size={32} style={{ color: "#0B0B14" }} fill="#0B0B14" />
          </div>
          <span className="text-3xl font-black tracking-tight" style={{ color: "#14141F" }}>Box</span>
        </div>
      )}
    </div>
  );
}

function LoginScreen({ onLogin }) {
  const [step, setStep] = useState("phone"); // phone -> verify
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [genCode, setGenCode] = useState("");
  const [error, setError] = useState("");

  const isPhoneValid = phone.trim().length >= 8;

  const handleCreateAccount = () => {
    if (!isPhoneValid) return;
    const cleanPhone = phone.trim().replace(/[^\d]/g, "");
    if (cleanPhone === OWNER_NUMBER) {
      // رقم المالك يدخل مباشرة بدون تفعيل
      onLogin(phone.trim());
      return;
    }
    const otp = String(Math.floor(1000 + Math.random() * 9000));
    setGenCode(otp);
    setCode("");
    setError("");
    setStep("verify");
  };

  const handleResend = () => {
    const otp = String(Math.floor(1000 + Math.random() * 9000));
    setGenCode(otp);
    setCode("");
    setError("");
  };

  const handleActivate = () => {
    if (code.trim() !== genCode) {
      setError("رمز التفعيل غير صحيح، حاول مرة أخرى");
      return;
    }
    onLogin(phone.trim());
  };

  return (
    <div
      dir="rtl"
      className="min-h-screen flex items-center justify-center px-5"
      style={{ background: "#F7F7F9", fontFamily: "'Cairo', sans-serif" }}
    >
      <style>{`${FONT_IMPORT}`}</style>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-3" style={{ background: "#F5D400" }}>
            <Zap size={26} style={{ color: "#0B0B14" }} fill="#0B0B14" />
          </div>
          <h1 className="text-2xl font-black" style={{ color: "#14141F" }}>Box</h1>
          <p className="text-sm mt-1" style={{ color: "#6B6B7A" }}>
            {step === "phone" ? "أنشئ حسابك برقم جوالك عشان تدخل المتجر" : "فعّل حسابك برمز التحقق"}
          </p>
        </div>

        {step === "phone" ? (
          <div className="rounded-xl border p-5 flex flex-col gap-4" style={{ background: "#FFFFFF", borderColor: "#E7E7EE" }}>
            <div>
              <label className="text-sm font-bold block mb-2" style={{ color: "#14141F" }}>رقم الجوال</label>
              <div
                className="flex items-center gap-2 px-3 py-2.5 rounded-md border"
                style={{ borderColor: "#E7E7EE", background: "#F7F7F9" }}
              >
                <Phone size={17} style={{ color: "#6B6B7A" }} />
                <input
                  type="tel"
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^\d+ ]/g, ""))}
                  placeholder="05xxxxxxxx"
                  className="bg-transparent outline-none text-sm w-full"
                  style={{ color: "#14141F", direction: "ltr", textAlign: "right" }}
                />
              </div>
            </div>

            <button
              onClick={handleCreateAccount}
              disabled={!isPhoneValid}
              className="w-full py-3 rounded-md font-black flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-40"
              style={{ background: "#F5D400", color: "#0B0B14" }}
            >
              إنشاء الحساب
              <ArrowLeft size={16} />
            </button>
          </div>
        ) : (
          <div className="rounded-xl border p-5 flex flex-col gap-4" style={{ background: "#FFFFFF", borderColor: "#E7E7EE" }}>
            <div
              className="rounded-md px-3 py-2.5 text-xs"
              style={{ background: "rgba(139,92,246,0.08)", border: "1px solid rgba(139,92,246,0.3)", color: "#6b4fc9" }}
            >
              تم إرسال رمز التفعيل إلى الرقم <span style={{ direction: "ltr", display: "inline-block", fontFamily: "'JetBrains Mono', monospace" }}>{phone}</span>.
              <br />
              (وضع تجريبي — رمزك هو: <b style={{ fontFamily: "'JetBrains Mono', monospace" }}>{genCode}</b>)
            </div>

            <div>
              <label className="text-sm font-bold block mb-2" style={{ color: "#14141F" }}>رمز التفعيل</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={4}
                value={code}
                onChange={(e) => { setCode(e.target.value.replace(/\D/g, "")); setError(""); }}
                placeholder="----"
                className="w-full text-center tracking-[0.5em] text-lg font-black px-3 py-2.5 rounded-md border outline-none"
                style={{
                  borderColor: error ? "#e05555" : "#E7E7EE",
                  background: "#F7F7F9",
                  color: "#14141F",
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              />
              {error && <p className="text-xs mt-1.5" style={{ color: "#e05555" }}>{error}</p>}
            </div>

            <button
              onClick={handleActivate}
              disabled={code.length !== 4}
              className="w-full py-3 rounded-md font-black flex items-center justify-center gap-2 transition-transform active:scale-[0.98] disabled:opacity-40"
              style={{ background: "#F5D400", color: "#0B0B14" }}
            >
              تفعيل الحساب والدخول
              <ArrowLeft size={16} />
            </button>

            <div className="flex items-center justify-between text-xs">
              <button onClick={() => setStep("phone")} style={{ color: "#6B6B7A" }} className="font-bold">
                تغيير الرقم
              </button>
              <button onClick={handleResend} style={{ color: "#8B5CF6" }} className="font-bold">
                إعادة إرسال الرمز
              </button>
            </div>
          </div>
        )}

        <p className="text-xs text-center mt-5" style={{ color: "#6B6B7A" }}>
          بالمتابعة أنت توافق على شروط استخدام Box
        </p>
      </div>
    </div>
  );
}

// ---- Main app -----------------------------------------------------------

export default function BoxStore() {
  const [showSplash, setShowSplash] = useState(true);
  const [userPhone, setUserPhone] = useState(null);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [sellOpen, setSellOpen] = useState(false);
  const [addProductOpen, setAddProductOpen] = useState(false);
  const [justAddedId, setJustAddedId] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);

  const isOwner = userPhone && userPhone.replace(/[^\d]/g, "") === OWNER_NUMBER;

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCat = category === "all" || p.cat === category;
      const matchesQuery = p.name.includes(query) || p.id.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [products, category, query]);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev[product.id];
      return { ...prev, [product.id]: { product, qty: existing ? existing.qty + 1 : 1 } };
    });
    setJustAddedId(product.id);
    setTimeout(() => setJustAddedId(null), 1000);
  };

  const inc = (id) => setCart((prev) => ({ ...prev, [id]: { ...prev[id], qty: prev[id].qty + 1 } }));

  const dec = (id) =>
    setCart((prev) => {
      const item = prev[id];
      if (!item) return prev;
      if (item.qty <= 1) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: { ...item, qty: item.qty - 1 } };
    });

  const items = Object.values(cart).map((c) => ({ ...c.product, qty: c.qty }));
  const totalCount = items.reduce((s, i) => s + i.qty, 0);
  const total = items.reduce((s, i) => s + i.qty * i.price, 0);

  const handleCheckout = () => {
    setOrderPlaced(true);
    setCart({});
    setTimeout(() => {
      setOrderPlaced(false);
      setCartOpen(false);
    }, 2200);
  };

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  if (!userPhone) {
    return <LoginScreen onLogin={setUserPhone} />;
  }

  return (
    <div dir="rtl" className="min-h-screen" style={{ background: "#F7F7F9", fontFamily: "'Cairo', sans-serif" }}>
      <style>{`
        ${FONT_IMPORT}
        @keyframes flicker {
          0%, 100% { opacity: 0.9; }
          45% { opacity: 0.9; }
          47% { opacity: 0.3; }
          49% { opacity: 0.9; }
          51% { opacity: 0.5; }
          53% { opacity: 0.9; }
        }
        .flash-bolt { animation: flicker 4.5s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .flash-bolt { animation: none; }
        }
      `}</style>

      {/* header */}
      <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ borderColor: "#E7E7EE", background: "rgba(255,255,255,0.88)" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-md flex items-center justify-center" style={{ background: "#F5D400" }}>
              <Zap size={19} style={{ color: "#0B0B14" }} fill="#0B0B14" />
            </div>
            <span className="text-lg font-black tracking-tight" style={{ color: "#14141F" }}>Box</span>
          </div>

          <button
            onClick={() => setUserPhone(null)}
            className="hidden md:flex items-center gap-1.5 rounded-md px-2.5 py-1.5 border text-xs font-bold"
            style={{ borderColor: "#E7E7EE", background: "#FFFFFF", color: "#6B6B7A", direction: "ltr" }}
            title="تسجيل الخروج"
          >
            <LogOut size={13} />
            {userPhone}
          </button>

          <div className="hidden sm:flex items-center gap-2 flex-1 max-w-sm px-3 py-2 rounded-md border" style={{ borderColor: "#E7E7EE", background: "#FFFFFF" }}>
            <Search size={16} style={{ color: "#6B6B7A" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث عن منتج أو رمز..."
              className="bg-transparent outline-none text-sm w-full"
              style={{ color: "#14141F" }}
            />
          </div>

          <div className="flex items-center gap-2">
            {isOwner && (
              <button
                onClick={() => setAddProductOpen(true)}
                className="flex items-center gap-1.5 rounded-md px-3 py-2 border text-sm font-bold"
                style={{ borderColor: "#F5D400", background: "rgba(245,212,0,0.15)", color: "#14141F" }}
              >
                <Plus size={16} />
                <span className="hidden sm:inline">إضافة منتج</span>
              </button>
            )}
            <button
              onClick={() => setSellOpen(true)}
              className="hidden sm:flex items-center gap-1.5 rounded-md px-3 py-2 border text-sm font-bold"
              style={{ borderColor: "#8B5CF6", background: "rgba(139,92,246,0.1)", color: "#B69CFF" }}
            >
              <Smartphone size={16} />
              بيع جهازك
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative flex items-center gap-2 rounded-md px-3 py-2 border"
              style={{ borderColor: "#E7E7EE", background: "#FFFFFF", color: "#14141F" }}
            >
              <ShoppingCart size={19} />
              {totalCount > 0 && (
                <span
                  className="absolute -top-2 -left-2 w-5 h-5 rounded-full text-[11px] flex items-center justify-center font-black"
                  style={{ background: "#8B5CF6", color: "#fff", fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {totalCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pt-12 pb-8 text-right relative overflow-hidden">
        <svg
          className="flash-bolt absolute -top-6 left-0 sm:left-10 opacity-[0.08] pointer-events-none"
          width="220" height="220" viewBox="0 0 24 24"
        >
          <path d="M13 2 L4 14 H11 L10 22 L20 9 H13 L13 2Z" fill="#F5D400" />
        </svg>

        <div
          className="inline-flex items-center gap-1.5 mb-4 px-2.5 py-1 rounded-full text-xs font-bold"
          style={{ background: "rgba(245,212,0,0.1)", color: "#F5D400", border: "1px solid rgba(245,212,0,0.35)" }}
        >
          <Timer size={12} />
          توصيل خاطف — أقل من 24 ساعة
        </div>

        <h1 className="text-3xl sm:text-5xl font-black leading-tight max-w-2xl mr-0 ml-auto" style={{ color: "#14141F" }}>
          إلكترونيات توصلك<br />بسرعة البرق.
        </h1>
        <p className="mt-4 max-w-xl mr-0 ml-auto text-sm sm:text-base" style={{ color: "#6B6B7A" }}>
          كل منتج برقم تعريف واضح ومواصفات دقيقة، وسعر ثابت بلا مفاجآت.
        </p>
        <button
          onClick={() => setSellOpen(true)}
          className="sm:hidden mt-5 flex items-center gap-1.5 mr-0 ml-auto rounded-md px-3.5 py-2 border text-sm font-bold"
          style={{ borderColor: "#8B5CF6", background: "rgba(139,92,246,0.1)", color: "#B69CFF" }}
        >
          <Smartphone size={16} />
          عندك جهاز تبيعه؟
        </button>
      </section>

      {/* filters */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-wrap gap-2 mb-6">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setCategory(c.id)}
            className="px-4 py-2 rounded-md text-sm font-medium border transition-colors"
            style={{
              borderColor: category === c.id ? "#F5D400" : "#E7E7EE",
              background: category === c.id ? "rgba(245,212,0,0.15)" : "#FFFFFF",
              color: category === c.id ? "#14141F" : "#6B6B7A",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
        {filtered.length === 0 ? (
          <div className="text-center py-20" style={{ color: "#6B6B7A" }}>
            لا توجد نتائج مطابقة لبحثك.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} justAdded={justAddedId === p.id} />
            ))}
          </div>
        )}
      </main>

      <footer className="border-t" style={{ borderColor: "#E7E7EE", background: "#FFFFFF" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md flex items-center justify-center" style={{ background: "#F5D400" }}>
              <Zap size={16} style={{ color: "#0B0B14" }} fill="#0B0B14" />
            </div>
            <span className="text-sm font-black" style={{ color: "#14141F" }}>Box</span>
          </div>

          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-md px-3 py-2 border"
            style={{ borderColor: "#E7E7EE", background: "#F7F7F9" }}
          >
            <MessageCircle size={16} style={{ color: "#25D366" }} />
            <span className="text-sm font-bold" style={{ color: "#14141F", direction: "ltr" }}>
              {WHATSAPP_NUMBER}
            </span>
          </a>
        </div>
      </footer>

      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onInc={inc}
        onDec={dec}
        total={total}
        onCheckout={handleCheckout}
      />

      <SellPhoneModal open={sellOpen} onClose={() => setSellOpen(false)} />

      {isOwner && (
        <AddProductModal
          open={addProductOpen}
          onClose={() => setAddProductOpen(false)}
          onAdd={(p) => setProducts((prev) => [p, ...prev])}
        />
      )}

      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95"
        style={{ background: "#25D366" }}
        title="تواصل معنا عبر واتساب"
      >
        <MessageCircle size={26} color="#FFFFFF" fill="#FFFFFF" />
      </a>


      {orderPlaced && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-md flex items-center gap-2 font-bold shadow-lg"
          style={{ background: "#F5D400", color: "#0B0B14" }}
        >
          <Check size={18} />
          تم استلام طلبك بنجاح!
        </div>
      )}
    </div>
  );
}
