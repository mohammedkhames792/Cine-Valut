import { useState, useRef, useEffect, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, X, Search, Loader2, Tag as TagIcon, Check } from 'lucide-react';

/* ══════════════════════════════════════════════════════
   1. Collapsible Filter Section (مع إصلاح overflow لمنع قطع المنسدلات)
   ══════════════════════════════════════════════════════ */
export function FilterSection({
  title,
  badge,
  children,
  defaultOpen = false,
}: {
  title: string;
  badge?: number;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-white/10 last:border-0 relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-4 text-left transition hover:text-amber-400 group"
      >
        <span className="flex items-center gap-2 text-xs font-bold tracking-wider text-gray-300 uppercase group-hover:text-amber-400 transition">
          {title}
          {badge ? (
            <span className="rounded-full bg-amber-500 px-2 py-0.5 text-[10px] font-extrabold text-black">
              {badge}
            </span>
          ) : null}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-gray-400 group-hover:text-amber-400">
          <ChevronDown size={16} />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-visible" // تم التعديل لكي لا يُقطع الـ Dropdown
          >
            <div className="pb-5 pt-1 relative">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   2. Async Tag Input (احترافي بالكامل مع القائمة المنسدلة الطائرة)
   ══════════════════════════════════════════════════════ */
export interface Tag {
  id: number;
  name: string;
}

export function TagInput({
  placeholder,
  selected,
  onAdd,
  onRemove,
  suggestions,
  isLoading,
  query,
  onQueryChange,
  matchMode = 'any',
  onModeChange,
}: {
  placeholder: string;
  selected: Tag[];
  onAdd: (t: Tag) => void;
  onRemove: (id: number) => void;
  suggestions: Tag[];
  isLoading: boolean;
  query: string;
  onQueryChange: (q: string) => void;
  matchMode?: 'any' | 'all';
  onModeChange?: (m: 'any' | 'all') => void;
}) {
  const [focused, setFocused] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setFocused(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const available = suggestions.filter((s) => !selected.some((sel) => sel.id === s.id));

  return (
    <div ref={ref} className="relative z-30 space-y-3">
      {/* Search Input Box */}
      <div className="relative flex items-center rounded-xl border border-white/15 bg-slate-900/90 px-3.5 py-3 shadow-inner focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
        <Search size={17} className="text-gray-400 shrink-0 mr-2.5" />
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm text-white placeholder-gray-500 outline-none"
        />
        {isLoading && <Loader2 size={16} className="animate-spin text-amber-400 shrink-0 ml-2" />}
        {query && !isLoading && (
          <button
            onClick={() => onQueryChange('')}
            className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition shrink-0 ml-1"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Dropdown Suggestions Menu (طائرة بوضوح فوق باقي العناصر) */}
      <AnimatePresence>
        {focused && query.trim().length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 top-[52px] z-[999] max-h-60 overflow-y-auto rounded-xl border border-amber-500/30 bg-[#121824] p-1.5 shadow-2xl backdrop-blur-xl space-y-1 divide-y divide-white/5"
          >
            {available.length === 0 ? (
              <div className="px-4 py-6 text-center text-xs text-gray-400">
                {isLoading ? 'Searching...' : 'No matching tags found'}
              </div>
            ) : (
              available.slice(0, 10).map((s) => (
                <button
                  key={s.id}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onAdd(s);
                    onQueryChange('');
                    setFocused(false);
                  }}
                  className="flex w-full items-center justify-between px-3 py-2.5 text-left text-sm text-gray-200 rounded-lg transition hover:bg-amber-500/10 hover:text-amber-400 group"
                >
                  <div className="flex items-center gap-2.5">
                    <TagIcon size={14} className="text-gray-400 group-hover:text-amber-400 transition" />
                    <span className="font-medium text-sm">{s.name}</span>
                  </div>
                  <span className="text-[10px] text-amber-400/0 group-hover:text-amber-400 transition font-bold uppercase tracking-wider">
                    + Add
                  </span>
                </button>
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Tags Display */}
      {selected.length > 0 && (
        <div className="pt-2 space-y-2">
          <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
            <span>Selected ({selected.length}):</span>
            {onModeChange && selected.length > 1 && (
              <div className="flex items-center gap-1 bg-slate-900/80 p-0.5 rounded-lg border border-white/10">
                {(['any', 'all'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => onModeChange(m)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition ${
                      matchMode === m
                        ? 'bg-amber-500 text-black shadow'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {selected.map((t) => (
              <motion.span
                key={t.id}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                className="flex items-center gap-1.5 rounded-lg border border-amber-500/40 bg-amber-500/10 px-3 py-1.5 text-xs font-semibold text-amber-300 shadow-sm"
              >
                <span>{t.name}</span>
                <button
                  onClick={() => onRemove(t.id)}
                  className="rounded-md p-0.5 hover:bg-amber-500/20 hover:text-white transition"
                >
                  <X size={13} />
                </button>
              </motion.span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   3. Chip Group (single or multi select)
   ══════════════════════════════════════════════════════ */
export function ChipGroup<T extends string | number>({
  options,
  selected,
  onToggle,
  multi = false,
}: {
  options: Array<{ label: string; value: T }>;
  selected: T | T[];
  onToggle: (v: T) => void;
  multi?: boolean;
}) {
  const isSel = (v: T) => (multi ? (selected as T[]).includes(v) : selected === v);

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={String(o.value)}
          onClick={() => onToggle(o.value)}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
            isSel(o.value)
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'bg-slate-800/80 text-gray-300 border border-white/5 hover:bg-slate-700 hover:text-white'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   4. Dual Range Slider (Rating)
   ══════════════════════════════════════════════════════ */
export function RangeSlider({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  unit = '',
}: {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: [number, number];
  onChange: (v: [number, number]) => void;
  unit?: string;
}) {
  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-gray-400">{label}</span>
        <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md">
          {value[0]}
          {unit} — {value[1]}
          {unit === '⭐' ? '' : unit}
        </span>
      </div>
      <div className="relative h-6 flex items-center">
        <div className="absolute h-1.5 w-full rounded-full bg-slate-800" />
        <div
          className="absolute h-1.5 rounded-full bg-amber-500 shadow-sm"
          style={{ left: `${pct(value[0])}%`, right: `${100 - pct(value[1])}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[0]}
          onChange={(e) => onChange([Math.min(Number(e.target.value), value[1]), value[1]])}
          className="pointer-events-none absolute h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400 [&::-webkit-slider-thumb]:shadow-lg cursor-pointer"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value[1]}
          onChange={(e) => onChange([value[0], Math.max(Number(e.target.value), value[0])])}
          className="pointer-events-none absolute h-full w-full appearance-none bg-transparent [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-amber-400 [&::-webkit-slider-thumb]:shadow-lg cursor-pointer"
        />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   5. Number Field
   ══════════════════════════════════════════════════════ */
export function NumberField({
  label,
  placeholder,
  value,
  onChange,
  min,
  max,
}: {
  label: string;
  placeholder?: string;
  value: string | number;
  onChange: (v: string) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-400">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        min={min}
        max={max}
        className="w-full rounded-xl border border-white/10 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white outline-none focus:border-amber-500 transition"
      />
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   6. Select Field
   ══════════════════════════════════════════════════════ */
export function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: Array<{ label: string; value: string }>;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-gray-400">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border border-white/10 bg-slate-900/90 px-3.5 py-2.5 text-sm text-white outline-none focus:border-amber-500 transition cursor-pointer"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-slate-900 text-white">
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}