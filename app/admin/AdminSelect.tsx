"use client";
import { useState, useRef, useEffect } from "react";

interface Option { value: string; label: string; }

interface Props {
  options: Option[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
}

export default function AdminSelect({ options, value, onChange, placeholder = "Select…" }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selected = options.find(o => o.value === value);
  const filtered = search
    ? options.filter(o => o.label.toLowerCase().includes(search.toLowerCase()))
    : options;

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const pick = (val: string) => {
    onChange(val);
    setOpen(false);
    setSearch("");
  };

  return (
    <div ref={wrapRef} className="csel" data-open={open || undefined}>
      {/* Trigger */}
      <button
        type="button"
        className="csel-trigger"
        onClick={() => {
          setOpen(!open);
          if (!open) setTimeout(() => inputRef.current?.focus(), 50);
        }}
      >
        <span className={selected ? "csel-value" : "csel-placeholder"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg className="csel-chevron" width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div className="csel-panel">
          {/* Search */}
          {options.length > 5 && (
            <div className="csel-search-wrap">
              <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{flexShrink:0,color:"var(--ink-3)"}}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                ref={inputRef}
                className="csel-search"
                placeholder="Search…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Escape") { setOpen(false); setSearch(""); }
                  if (e.key === "Enter" && filtered.length === 1) pick(filtered[0].value);
                }}
              />
            </div>
          )}

          {/* Options */}
          <div className="csel-options">
            {/* Clear option */}
            {value && (
              <button type="button" className="csel-opt csel-opt-clear" onClick={() => pick("")}>
                <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                Clear selection
              </button>
            )}
            {filtered.length === 0 ? (
              <div className="csel-empty">No results found</div>
            ) : (
              filtered.map(o => (
                <button
                  key={o.value}
                  type="button"
                  className={`csel-opt${o.value === value ? " csel-opt-active" : ""}`}
                  onClick={() => pick(o.value)}
                >
                  {o.label}
                  {o.value === value && (
                    <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} style={{marginLeft:"auto",flexShrink:0}}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                    </svg>
                  )}
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
