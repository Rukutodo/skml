"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Film { _id: string; title: string; year: string; genre: string; category: "produced" | "distributed"; ottPlatform?: string; }

export default function FilmsListClient({ films: init }: { films: Film[] }) {
  const router = useRouter();
  const [films, setFilms] = useState(init);
  const [filter, setFilter] = useState<"all"|"produced"|"distributed">("all");
  const [del, setDel] = useState<string|null>(null);
  const [msg, setMsg] = useState<{t:"success"|"error";x:string}|null>(null);

  const list = filter === "all" ? films : films.filter(f => f.category === filter);

  const remove = async (id: string, title: string) => {
    if (!confirm(`Delete "${title}"? This cannot be undone.`)) return;
    setDel(id); setMsg(null);
    try {
      const r = await fetch(`/api/admin/films/${id}`, { method: "DELETE" });
      if (!r.ok) throw new Error((await r.json()).error);
      setFilms(films.filter(f => f._id !== id));
      setMsg({ t: "success", x: `"${title}" deleted.` });
    } catch (e: any) { setMsg({ t: "error", x: e.message || "Delete failed" }); }
    setDel(null);
  };

  return (
    <div style={{ maxWidth: 960 }}>
      <div className="pg-h">
        <div>
          <h1 className="pg-t">Films</h1>
          <p className="pg-sub">{films.length} films in your database</p>
        </div>
        <button onClick={() => router.push("/admin/films/new")} className="btn btn-p">
          <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
          Add Film
        </button>
      </div>

      {msg && <div className={`alert ${msg.t === "success" ? "alert-ok" : "alert-err"}`}>{msg.t === "success" ? "✓" : "✕"} {msg.x}</div>}

      <div className="tabs">
        {(["all","produced","distributed"] as const).map(t => (
          <button key={t} onClick={() => setFilter(t)} className={`tab${filter === t ? " on" : ""}`}>
            {t === "all" ? `All (${films.length})` : `${t} (${films.filter(f => f.category === t).length})`}
          </button>
        ))}
      </div>

      <div className="tbl-wrap">
        {list.length === 0 ? (
          <div className="empty">No films found. Click &quot;Add Film&quot; to get started.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table className="tbl">
              <thead><tr><th>Title</th><th>Year</th><th>Genre</th><th>Category</th><th>Platform</th><th style={{textAlign:"right"}}>Actions</th></tr></thead>
              <tbody>
                {list.map(f => (
                  <tr key={f._id}>
                    <td className="bld">{f.title}</td>
                    <td className="mut">{f.year||"—"}</td>
                    <td className="mut">{f.genre||"—"}</td>
                    <td><span className={`badge ${f.category==="produced"?"badge-ok":"badge-blue"}`}>{f.category}</span></td>
                    <td className="mut">{f.ottPlatform||"—"}</td>
                    <td style={{textAlign:"right"}}>
                      <div style={{display:"flex",gap:".375rem",justifyContent:"flex-end"}}>
                        <a href={`/admin/films/${f._id}`} className="btn btn-s btn-sm">Edit</a>
                        <button onClick={() => remove(f._id,f.title)} disabled={del===f._id} className="btn btn-d btn-sm" style={{opacity:del===f._id?.5:1}}>{del===f._id?"…":"Delete"}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
