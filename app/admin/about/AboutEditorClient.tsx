"use client";
import { useState } from "react";

interface Props { initialData: { headline: string; headlineAccent: string; description: string[]; ctaText: string; stats: { value: string; label: string }[]; }; }

export default function AboutEditorClient({ initialData }: Props) {
  const [form, setForm] = useState(initialData);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{t:"success"|"error";x:string}|null>(null);

  const save = async () => {
    setSaving(true); setMsg(null);
    try { const r = await fetch("/api/admin/about", { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify(form) }); if (!r.ok) throw new Error((await r.json()).error); setMsg({t:"success",x:"About section updated!"}); }
    catch (e:any) { setMsg({t:"error",x:e.message||"Failed"}); }
    setSaving(false);
  };

  const uStat = (i:number,f:"value"|"label",v:string) => { const s=[...form.stats]; s[i]={...s[i],[f]:v}; setForm({...form,stats:s}); };
  const uDesc = (i:number,v:string) => { const d=[...form.description]; d[i]=v; setForm({...form,description:d}); };

  return (
    <div style={{maxWidth:880}}>
      {/* Sticky-feel header bar */}
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"1.75rem",flexWrap:"wrap",gap:"1rem"}}>
        <div>
          <h1 className="pg-t" style={{fontSize:"1.5rem"}}>About Banner</h1>
          <p className="pg-sub">Update the About section shown on your homepage.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn btn-p" style={{flexShrink:0}}>
          <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          {saving?"Saving…":"Save Changes"}
        </button>
      </div>

      {msg && <div className={`alert ${msg.t==="success"?"alert-ok":"alert-err"}`}>{msg.t==="success"?"✓":"✕"} {msg.x}</div>}

      {/* Two-column desktop layout */}
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:"1.25rem"}} className="editor-grid">
        {/* LEFT COLUMN — Headline & CTA */}
        <div style={{display:"grid",gap:"1.25rem",alignContent:"start"}}>
          <div className="card card-p">
            <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:"1rem"}}>
              <div style={{width:28,height:28,borderRadius:"var(--r-sm)",background:"var(--blue-bg)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="var(--blue)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7"/></svg>
              </div>
              <span style={{fontSize:".75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-2)"}}>Headline</span>
            </div>
            <div className="fld"><label className="lbl">Main Text</label><input className="inp" value={form.headline} onChange={e=>setForm({...form,headline:e.target.value})} placeholder="Crafting Stories" /></div>
            <div className="fld"><label className="lbl">Accent Text <span className="hint">(italic)</span></label><input className="inp" value={form.headlineAccent} onChange={e=>setForm({...form,headlineAccent:e.target.value})} placeholder="That Resonate" /></div>
            <div className="fld" style={{marginBottom:0}}><label className="lbl">CTA Button Label</label><input className="inp" value={form.ctaText} onChange={e=>setForm({...form,ctaText:e.target.value})} placeholder="View Our Films" /></div>
          </div>

          {/* Stats */}
          <div className="card card-p">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:".5rem"}}>
                <div style={{width:28,height:28,borderRadius:"var(--r-sm)",background:"var(--purple-bg)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="var(--purple)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                </div>
                <span style={{fontSize:".75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-2)"}}>Statistics</span>
              </div>
              <button onClick={()=>setForm({...form,stats:[...form.stats,{value:"",label:""}]})} className="btn btn-s btn-sm">+ Add</button>
            </div>
            {form.stats.map((s,i)=>(
              <div key={i} style={{display:"grid",gridTemplateColumns:"80px 1fr 32px",gap:".375rem",marginBottom:".5rem",alignItems:"center"}}>
                <input placeholder="6+" value={s.value} onChange={e=>uStat(i,"value",e.target.value)} className="inp" style={{textAlign:"center",fontWeight:700}} />
                <input placeholder="Films Produced" value={s.label} onChange={e=>uStat(i,"label",e.target.value)} className="inp" />
                <button onClick={()=>setForm({...form,stats:form.stats.filter((_,j)=>j!==i)})} className="btn btn-x" style={{width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"var(--r-sm)",color:"var(--ink-3)",fontSize:".875rem"}}>✕</button>
              </div>
            ))}
            {form.stats.length === 0 && <p style={{fontSize:".8125rem",color:"var(--ink-3)",textAlign:"center",padding:".75rem 0"}}>No stats yet. Click + Add to create one.</p>}
          </div>
        </div>

        {/* RIGHT COLUMN — Description */}
        <div className="card card-p" style={{alignSelf:"start"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem"}}>
            <div style={{display:"flex",alignItems:"center",gap:".5rem"}}>
              <div style={{width:28,height:28,borderRadius:"var(--r-sm)",background:"var(--ok-bg)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="var(--ok)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
              </div>
              <span style={{fontSize:".75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-2)"}}>Description</span>
            </div>
            <button onClick={()=>setForm({...form,description:[...form.description,""]})} className="btn btn-s btn-sm">+ Add</button>
          </div>
          {form.description.map((p,i)=>(
            <div key={i} style={{position:"relative",marginBottom:".75rem"}}>
              <div style={{position:"absolute",top:".5rem",left:".75rem",fontSize:".625rem",fontWeight:700,color:"var(--ink-3)",textTransform:"uppercase",letterSpacing:".06em"}}>Paragraph {i+1}</div>
              <textarea value={p} onChange={e=>uDesc(i,e.target.value)} rows={4} className="inp inp-area" style={{paddingTop:"1.625rem"}} />
              {form.description.length>1 && (
                <button onClick={()=>setForm({...form,description:form.description.filter((_,j)=>j!==i)})} className="btn btn-x" style={{position:"absolute",top:".375rem",right:".375rem",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"var(--r-sm)",fontSize:".75rem",color:"var(--ink-3)"}}>✕</button>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`@media(max-width:768px){.editor-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
