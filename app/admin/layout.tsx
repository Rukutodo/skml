"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import "./admin.css";

const NAV = [
  { label: "Home", href: "/admin", ico: "grid", sec: "Overview" },
  { label: "About", href: "/admin/about", ico: "info", sec: "Content" },
  { label: "Founder", href: "/admin/producer", ico: "user", sec: "Content" },
  { label: "Films", href: "/admin/films", ico: "film", sec: "Content" },
];

const THEMES = [
  { id: "light", lbl: "Light", c: "#FFFFFF" },
  { id: "dark", lbl: "Dark", c: "#12141C" },
  { id: "midnight", lbl: "Midnight", c: "#0F172A" },
  { id: "gold", lbl: "Gold", c: "#C8A951" },
  { id: "beige", lbl: "Beige", c: "#F7F3F0" },
];

function Ico({ t, s = 18 }: { t: string; s?: number }) {
  const p = { width: s, height: s, fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: 1.8 } as const;
  if (t === "grid") return <svg {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/></svg>;
  if (t === "info") return <svg {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>;
  if (t === "user") return <svg {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>;
  if (t === "film") return <svg {...p}><path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/></svg>;
  return null;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const [out, setOut] = useState(false);
  const [theme, setTheme] = useState("light");

  // Load theme from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("skml-admin-theme") || "light";
    setTheme(saved);
  }, []);

  // Update localStorage and data attribute
  const updateTheme = (t: string) => {
    setTheme(t);
    localStorage.setItem("skml-admin-theme", t);
  };

  if (path === "/admin/login") return <div className="adm">{children}</div>;

  const active = (h: string) => h === "/admin" ? path === "/admin" : path.startsWith(h);
  const logout = async () => { setOut(true); await fetch("/api/auth/logout", { method: "POST" }); router.push("/admin/login"); };
  const cur = NAV.find(n => active(n.href))?.label || "Dashboard";
  const secs = [...new Set(NAV.map(n => n.sec))];

  return (
    <div className="adm" data-theme={theme} style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {open && <div className="adm-overlay" onClick={() => setOpen(false)} />}

      {/* Sidebar */}
      <aside className={`adm-side${open ? " open" : ""}`}>
        <div className="side-brand">
          <div className="side-brand-ico">
            <Image src="/assets/images/skml-logo.png" alt="SKML" width={22} height={22} style={{ objectFit: "contain" }} unoptimized />
          </div>
          <div>
            <h3>SKML Motion</h3>
            <span>Admin Control</span>
          </div>
        </div>
        <nav className="side-nav">
          {secs.map(s => (
            <div key={s}>
              <p className="side-label">{s}</p>
              {NAV.filter(n => n.sec === s).map(n => {
                const a = active(n.href);
                return (
                  <a key={n.href} href={n.href} className={`side-link${a ? " on" : ""}`}
                    onClick={e => { e.preventDefault(); router.push(n.href); setOpen(false); }}>
                    <Ico t={n.ico} /> {n.label} {a && <div className="dot" />}
                  </a>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="side-foot">
          <button onClick={logout} disabled={out} className="side-out">
            <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
            {out ? "Signing out…" : "Sign Out"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="adm-body">
        <header className="adm-top">
          <button onClick={() => setOpen(!open)} className="adm-ham">
            <svg width={18} height={18} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <h2>{cur}</h2>
          
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Theme Switcher */}
            <div style={{ 
              display: "flex", gap: "6px", background: "var(--bg)", 
              padding: "4px", borderRadius: "var(--r-sm)", border: "1px solid var(--border-lt)" 
            }}>
              {THEMES.map(t => (
                <button
                  key={t.id}
                  title={t.lbl}
                  onClick={() => updateTheme(t.id)}
                  style={{
                    width: "18px", height: "18px", borderRadius: "4px", border: theme === t.id ? "1.5px solid var(--accent)" : "1px solid var(--border)",
                    background: t.c, cursor: "pointer", transition: "all 0.2s ease",
                    boxShadow: theme === t.id ? "0 0 8px var(--accent)" : "none",
                    opacity: theme === t.id ? 1 : 0.6
                  }}
                />
              ))}
            </div>
            <div className="divider-v" style={{ width: "1px", height: "16px", background: "var(--border-lt)" }} />
            <a href="/" target="_blank" className="adm-live" style={{ textDecoration: "none" }}>
              <i /> View Site
            </a>
          </div>
        </header>
        <main className="adm-main">{children}</main>
      </div>

      {/* Mobile Nav */}
      <nav className="mob-nav">
        <div className="mob-nav-inner">
          {NAV.map(n => {
            const a = active(n.href);
            return (
              <a key={n.href} href={n.href} className={`mob-link${a ? " on" : ""}`}
                onClick={e => { e.preventDefault(); router.push(n.href); }}>
                <div className="mob-ico"><Ico t={n.ico} s={16} /></div>
                {n.label}
              </a>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
