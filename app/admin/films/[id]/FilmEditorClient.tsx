"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import imageCompression from "browser-image-compression";
import AdminSelect from "../../AdminSelect";

const GENRES = [
  "Action", "Comedy", "Drama", "Horror", "Romance", "Thriller",
  "Sci-Fi", "Fantasy", "Mystery", "Crime", "Adventure", "Animation",
  "Documentary", "Family", "Musical", "War", "Western", "Historical",
  "Devotional", "Social", "Biographical", "Sports", "Suspense", "Other",
];

const GENRE_OPTS = GENRES.map(g => ({ value: g, label: g }));
const CATEGORY_OPTS = [{ value: "produced", label: "Produced" }, { value: "distributed", label: "Distributed" }];
const RELEASE_OPTS = [{ value: "theatrical", label: "Theatrical" }, { value: "ott", label: "OTT" }, { value: "both", label: "Both" }];

interface Props { id: string; initialData?: { title: string; genre: string; year: string; category: "produced"|"distributed"; ottPlatform: string; releaseType: string; order: number; hasPoster: boolean; posterUrl?: string; }; }

export default function FilmEditorClient({ id, initialData }: Props) {
  const router = useRouter();
  const isNew = id === "new";
  const [form, setForm] = useState({
    title: initialData?.title||"", genre: initialData?.genre||"", year: initialData?.year||"",
    category: initialData?.category||"produced", ottPlatform: initialData?.ottPlatform||"",
    releaseType: initialData?.releaseType||"theatrical", order: initialData?.order||0,
    hasPoster: initialData?.hasPoster||false, posterAssetId: "", previewUrl: initialData?.posterUrl||"",
  });
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [removing, setRemoving] = useState(false);
  const [msg, setMsg] = useState<{t:"success"|"error";x:string}|null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const save = async () => {
    setSaving(true); setMsg(null);
    try {
      if (!form.title) throw new Error("Title is required.");
      const r = await fetch(isNew ? "/api/admin/films" : `/api/admin/films/${id}`, {
        method: isNew ? "POST" : "PUT", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title:form.title, genre:form.genre, year:form.year, category:form.category, ottPlatform:form.ottPlatform, releaseType:form.releaseType, order:Number(form.order), posterAssetId:form.posterAssetId }),
      });
      const d = await r.json(); if (!r.ok) throw new Error(d.error);
      setMsg({ t:"success", x: isNew ? "Film created!" : "Film updated!" });
      if (isNew && d.result?._id) setTimeout(() => router.push(`/admin/films/${d.result._id}`), 800);
      else setForm({...form, posterAssetId:""});
    } catch (e: any) { setMsg({ t:"error", x: e.message||"Failed" }); }
    setSaving(false);
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true); setMsg(null);
    try {
      const compressed = await imageCompression(file, { maxSizeMB:1, maxWidthOrHeight:1920, useWebWorker:true });
      const preview = URL.createObjectURL(compressed);
      const fd = new FormData(); fd.append("file", compressed, compressed.name); fd.append("target", isNew?"unlinked":`film:${id}`);
      const r = await fetch("/api/admin/upload", { method:"POST", body:fd });
      const d = await r.json(); if (!r.ok) throw new Error(d.error);
      setForm({...form, hasPoster:true, posterAssetId:d.assetId, previewUrl:preview});
      setMsg({ t:"success", x:"Poster compressed & uploaded!" });
    } catch (e: any) { setMsg({ t:"error", x: e.message||"Upload failed" }); }
    setUploading(false);
  };

  const removePoster = async () => {
    if (!confirm("Remove the poster image?")) return;
    setRemoving(true); setMsg(null);
    try {
      const r = await fetch(`/api/admin/films/${id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "remove-poster" }),
      });
      if (!r.ok) throw new Error((await r.json()).error);
      setForm({...form, hasPoster:false, previewUrl:"", posterAssetId:""});
      setMsg({ t:"success", x:"Poster removed." });
    } catch (e: any) { setMsg({ t:"error", x: e.message||"Failed to remove" }); }
    setRemoving(false);
  };

  return (
    <div style={{maxWidth:880}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"1.75rem",flexWrap:"wrap",gap:"1rem"}}>
        <div>
          <a href="/admin/films" style={{fontSize:".8125rem",color:"var(--ink-3)",textDecoration:"none",display:"inline-flex",alignItems:"center",gap:".25rem",marginBottom:".375rem"}}>← Back to Films</a>
          <h1 className="pg-t" style={{fontSize:"1.5rem"}}>{isNew ? "Add New Film" : "Edit Film"}</h1>
        </div>
        <button onClick={save} disabled={saving} className="btn btn-p" style={{flexShrink:0}}>
          <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          {saving ? "Saving…" : "Save Film"}
        </button>
      </div>

      {msg && <div className={`alert ${msg.t==="success"?"alert-ok":"alert-err"}`}>{msg.t==="success"?"✓":"✕"} {msg.x}</div>}

      <div style={{display:"grid",gridTemplateColumns:"220px 1fr",gap:"1.25rem"}} className="editor-grid">
        {/* Poster */}
        <div className="card card-p" style={{alignSelf:"start",textAlign:"center"}}>
          <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:"1rem",justifyContent:"center"}}>
            <div style={{width:28,height:28,borderRadius:"var(--r-sm)",background:"var(--purple-bg)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="var(--purple)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
            </div>
            <span style={{fontSize:".75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-2)"}}>Poster</span>
          </div>
          <div style={{width:"100%",aspectRatio:"2/3",borderRadius:"var(--r-md)",overflow:"hidden",background:"var(--bg)",border:form.previewUrl?"1px solid var(--border-lt)":"2px dashed var(--border)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto .875rem"}}>
            {form.previewUrl ? <img src={form.previewUrl} alt="Poster" style={{width:"100%",height:"100%",objectFit:"cover"}} /> : form.hasPoster ? <span style={{fontSize:".8125rem",color:"var(--ok)",fontWeight:600}}>✓ Uploaded</span> : (
              <div style={{textAlign:"center",padding:"1rem"}}><svg width={32} height={32} fill="none" viewBox="0 0 24 24" stroke="var(--ink-3)" strokeWidth={1.2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg><p style={{margin:".25rem 0 0",fontSize:".6875rem",color:"var(--ink-3)"}}>No poster</p></div>
            )}
          </div>
          <input ref={ref} type="file" accept="image/*" onChange={upload} style={{display:"none"}} />
          <button onClick={e=>{e.preventDefault();ref.current?.click()}} disabled={uploading} className="btn btn-s" style={{width:"100%",justifyContent:"center",marginBottom:".375rem"}}>{uploading?"Compressing…":"Upload Poster"}</button>
          {(form.hasPoster || form.previewUrl) && !isNew && (
            <button onClick={removePoster} disabled={removing} className="btn btn-d btn-sm" style={{width:"100%",justifyContent:"center",marginTop:".375rem"}}>
              <svg width={12} height={12} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
              {removing?"Removing…":"Remove Poster"}
            </button>
          )}
          <p className="fld-help" style={{textAlign:"center",marginTop:".375rem"}}>Auto‑compressed ≤1 MB · 2:3</p>
        </div>

        {/* Form fields */}
        <div style={{display:"grid",gap:"1.25rem",alignContent:"start"}}>
          <div className="card card-p">
            <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:"1rem"}}>
              <div style={{width:28,height:28,borderRadius:"var(--r-sm)",background:"var(--blue-bg)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="var(--blue)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/></svg>
              </div>
              <span style={{fontSize:".75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-2)"}}>Details</span>
            </div>
            <div className="fld"><label className="lbl">Film Title <span className="req">*</span></label><input className="inp" value={form.title} onChange={e=>setForm({...form,title:e.target.value})} /></div>
            <div className="g2">
              <div className="fld"><label className="lbl">Genre</label><AdminSelect options={GENRE_OPTS} value={form.genre} onChange={v=>setForm({...form,genre:v})} placeholder="Select genre…" /></div>
              <div className="fld"><label className="lbl">Year</label><input className="inp" placeholder="e.g. 2024" value={form.year} onChange={e=>setForm({...form,year:e.target.value})} /></div>
            </div>
            <div className="fld" style={{marginBottom:0}}><label className="lbl">Category</label><AdminSelect options={CATEGORY_OPTS} value={form.category} onChange={v=>setForm({...form,category:v as any})} placeholder="Select category…" /></div>
          </div>

          <div className="card card-p">
            <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:"1rem"}}>
              <div style={{width:28,height:28,borderRadius:"var(--r-sm)",background:"var(--ok-bg)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="var(--ok)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
              </div>
              <span style={{fontSize:".75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-2)"}}>Release & Sorting</span>
            </div>
            <div className="g2">
              <div className="fld"><label className="lbl">Release Type</label><AdminSelect options={RELEASE_OPTS} value={form.releaseType} onChange={v=>setForm({...form,releaseType:v})} placeholder="Select type…" /></div>
              <div className="fld"><label className="lbl">OTT Platform</label><input className="inp" placeholder="e.g. Amazon Prime" value={form.ottPlatform} onChange={e=>setForm({...form,ottPlatform:e.target.value})} /></div>
            </div>
            <div className="fld" style={{marginBottom:0}}><label className="lbl">Display Order</label><input className="inp" type="number" value={form.order} onChange={e=>setForm({...form,order:Number(e.target.value)})} /><p className="fld-help">Lower numbers appear first.</p></div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:768px){.editor-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
