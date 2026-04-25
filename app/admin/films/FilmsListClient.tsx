"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Reorder, useDragControls } from "framer-motion";

function MobileReorderItem({ f, router, remove, del }: any) {
  const controls = useDragControls();
  return (
    <Reorder.Item 
      value={f} 
      dragListener={false}
      dragControls={controls}
      style={{ padding: "1rem", background: "var(--surface)", borderRadius: "var(--r-md)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "var(--sh-sm)", position: "relative" }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1 }}>
         <div 
           onPointerDown={(e) => controls.start(e)}
           style={{ cursor: "grab", touchAction: "none", padding: "12px 12px 12px 0", margin: "-12px 0 -12px -8px", display: "flex", alignItems: "center", justifyContent: "center" }}
         >
           <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{ color: "var(--ink-3)", flexShrink: 0 }}><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" /></svg>
         </div>
         <div style={{display: "flex", flexDirection: "column", gap: "2px", flex: 1, cursor: "pointer"}} onClick={() => router.push(`/admin/films/${f._id}`)}>
           <span style={{ fontWeight: 600, color: "var(--ink)", fontSize: "15px" }}>{f.title}</span>
           <span style={{ fontSize: "11px", color: "var(--ink-3)" }}>{f.year || "—"} • {f.category}</span>
         </div>
      </div>
      <div style={{display: "flex", gap: "8px", alignItems: "center"}}>
        <button onClick={(e) => remove(f._id, f.title, e)} disabled={del === f._id} style={{background: "transparent", border: "none", padding: "4px", color: "var(--err)", cursor: "pointer"}}>
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
        </button>
      </div>
    </Reorder.Item>
  );
}

function DesktopReorderItem({ f, remove, del }: any) {
  const controls = useDragControls();
  return (
    <Reorder.Item as="tr" value={f} dragListener={false} dragControls={controls} style={{background: "var(--surface)"}}>
      <td onPointerDown={(e) => controls.start(e)} style={{color: "var(--ink-3)", paddingLeft: "1rem", cursor: "grab", touchAction: "none"}}>
        <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16M4 16h16" /></svg>
      </td>
      <td className="bld">{f.title}</td>
      <td className="mut">{f.year||"—"}</td>
      <td className="mut">{f.genre||"—"}</td>
      <td><span className={`badge ${f.category==="produced"?"badge-ok":"badge-blue"}`}>{f.category}</span></td>
      <td className="mut">{f.ottPlatform||"—"}</td>
      <td style={{textAlign:"right"}}>
        <div style={{display:"flex",gap:".375rem",justifyContent:"flex-end"}}>
          <a href={`/admin/films/${f._id}`} className="btn btn-s btn-sm">Edit</a>
          <button onClick={(e) => remove(f._id, f.title, e)} disabled={del===f._id} className="btn btn-d btn-sm" style={{opacity:del===f._id?.5:1}}>{del===f._id?"…":"Delete"}</button>
        </div>
      </td>
    </Reorder.Item>
  );
}

interface Film { _id: string; title: string; year: string; genre: string; category: "produced" | "distributed"; ottPlatform?: string; order?: number; }

export default function FilmsListClient({ films: init }: { films: Film[] }) {
  const router = useRouter();
  const [initFilms, setInitFilms] = useState([...init].sort((a, b) => (a.order || 0) - (b.order || 0)));
  const [films, setFilms] = useState(initFilms);
  const [filter, setFilter] = useState<"all"|"produced"|"distributed">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [del, setDel] = useState<string|null>(null);
  const [msg, setMsg] = useState<{t:"success"|"error";x:string}|null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isSavingOrder, setIsSavingOrder] = useState(false);
  const [hasOrderChanged, setHasOrderChanged] = useState(false);

  useEffect(() => {
    const checkMob = () => setIsMobile(window.innerWidth <= 768);
    checkMob();
    window.addEventListener("resize", checkMob);
    return () => window.removeEventListener("resize", checkMob);
  }, []);

  const filteredByCategory = filter === "all" ? films : films.filter(f => f.category === filter);
  const list = searchQuery.trim() === "" ? filteredByCategory : filteredByCategory.filter(f => f.title.toLowerCase().includes(searchQuery.toLowerCase()));

  const remove = async (id: string, title: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDel(id); setMsg(null);
    try {
      const r = await fetch(`/api/admin/films/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error((await r.json()).error);
      const newFilms = films.filter(f => f._id !== id);
      setFilms(newFilms);
      setInitFilms(newFilms);
      setMsg({ t: "success", x: `"${title}" deleted.` });
    } catch (err: any) { setMsg({ t: "error", x: err.message || "Delete failed" }); }
    setDel(null);
  };

  const handleReorder = (newOrder: typeof list) => {
    if (filter !== "all" || searchQuery.trim() !== "") return;
    setFilms(newOrder);
    
    const currentIds = newOrder.map(f => f._id).join(',');
    const initIds = initFilms.map(f => f._id).join(',');
    setHasOrderChanged(currentIds !== initIds);
  };

  const saveOrder = async () => {
    setIsSavingOrder(true);
    try {
      const updates = films.map((f, i) => ({ id: f._id, order: i }));
      const r = await fetch("/api/admin/films/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates })
      });
      if (!r.ok) throw new Error("Failed to save order");
      
      setInitFilms([...films]);
      setHasOrderChanged(false);
      setMsg({ t: "success", x: "Display order saved successfully!" });
    } catch (e) {
      console.error(e);
      setMsg({ t: "error", x: "Failed to save order. Refresh and try again." });
    } finally {
      setIsSavingOrder(false);
    }
  };

  return (
    <div style={{ maxWidth: 960, margin: "0 auto" }}>
      <div className="pg-h">
        <div>
          <h1 className="pg-t">Films</h1>
          <p className="pg-sub">{films.length} films in your database</p>
        </div>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {hasOrderChanged && (
            <button onClick={saveOrder} disabled={isSavingOrder} className="btn btn-s" style={{borderColor: "var(--ok)", color: "var(--ok)", background: "var(--ok-bg)"}}>
              {isSavingOrder ? "Saving..." : "Save Order"}
            </button>
          )}
          <button onClick={() => router.push("/admin/films/new")} className="btn btn-p">
            <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            Add Film
          </button>
        </div>
      </div>

      {msg && <div className={`alert ${msg.t === "success" ? "alert-ok" : "alert-err"}`}>{msg.t === "success" ? "✓" : "✕"} {msg.x}</div>}

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center", marginBottom: "1.125rem" }}>
        <div className="tabs" style={{ marginBottom: 0 }}>
          {(["all","produced","distributed"] as const).map(t => (
            <button key={t} onClick={() => setFilter(t)} className={`tab${filter === t ? " on" : ""}`}>
              {t === "all" ? `All (${films.length})` : `${t} (${films.filter(f => f.category === t).length})`}
            </button>
          ))}
        </div>
        <div style={{ flex: 1, minWidth: "200px", position: "relative" }}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="var(--ink-3)" strokeWidth={2} style={{ position: "absolute", left: "10px", top: "50%", transform: "translateY(-50%)" }}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m1.1-5.4a7.5 7.5 0 11-15 0 7.5 7.5 0 0115 0z" /></svg>
          <input 
            type="text" 
            placeholder="Search films by title..." 
            value={searchQuery} 
            onChange={(e) => setSearchQuery(e.target.value)}
            className="inp"
            style={{ paddingLeft: "34px", margin: 0 }}
          />
        </div>
      </div>

      {list.length === 0 ? (
        <div className="empty">No films found. Click &quot;Add Film&quot; to get started.</div>
      ) : isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "1rem" }}>
          <p style={{fontSize: "12px", color: "var(--ink-3)", marginBottom: "4px"}}>
            {filter === "all" && searchQuery.trim() === "" ? "Drag items to reorder. Click to edit." : "Click an item to edit."}
          </p>
          {filter === "all" && searchQuery.trim() === "" ? (
            <Reorder.Group axis="y" values={list} onReorder={handleReorder} style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
              {list.map((f) => (
                <MobileReorderItem key={f._id} f={f} router={router} remove={remove} del={del} />
              ))}
            </Reorder.Group>
          ) : (
            list.map((f) => (
              <div key={f._id} style={{ padding: "1rem", background: "var(--surface)", borderRadius: "var(--r-md)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", boxShadow: "var(--sh-sm)" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "2px", flex: 1, cursor: "pointer" }} onClick={() => router.push(`/admin/films/${f._id}`)}>
                   <span style={{ fontWeight: 600, color: "var(--ink)", fontSize: "15px" }}>{f.title}</span>
                   <span style={{ fontSize: "11px", color: "var(--ink-3)" }}>{f.year || "—"} • {f.category}</span>
                </div>
                <button onClick={(e) => remove(f._id, f.title, e)} disabled={del === f._id} style={{background: "transparent", border: "none", padding: "4px", color: "var(--err)", cursor: "pointer"}}>
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="tbl-wrap">
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr>
                <th style={{width: "40px"}}></th>
                <th>Title</th><th>Year</th><th>Genre</th><th>Category</th><th>Platform</th><th style={{textAlign:"right"}}>Actions</th>
              </tr></thead>
              {filter === "all" && searchQuery.trim() === "" ? (
                <Reorder.Group as="tbody" axis="y" values={list} onReorder={handleReorder}>
                  {list.map(f => (
                    <DesktopReorderItem key={f._id} f={f} remove={remove} del={del} />
                  ))}
                </Reorder.Group>
              ) : (
                <tbody>
                  {list.map(f => (
                    <tr key={f._id}>
                      <td style={{width: "40px"}}></td>
                      <td className="bld">{f.title}</td>
                      <td className="mut">{f.year||"—"}</td>
                      <td className="mut">{f.genre||"—"}</td>
                      <td><span className={`badge ${f.category==="produced"?"badge-ok":"badge-blue"}`}>{f.category}</span></td>
                      <td className="mut">{f.ottPlatform||"—"}</td>
                      <td style={{textAlign:"right"}}>
                        <div style={{display:"flex",gap:".375rem",justifyContent:"flex-end"}}>
                          <a href={`/admin/films/${f._id}`} className="btn btn-s btn-sm">Edit</a>
                          <button onClick={(e) => remove(f._id, f.title, e)} disabled={del===f._id} className="btn btn-d btn-sm" style={{opacity:del===f._id?.5:1}}>{del===f._id?"…":"Delete"}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
