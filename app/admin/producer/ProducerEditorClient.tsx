"use client";
import { useState, useRef } from "react";
import imageCompression from "browser-image-compression";

interface Props { initialData: { firstName:string; lastName:string; role:string; bio:string[]; quote:string; hasPortrait:boolean; portraitUrl?:string; }; }

export default function ProducerEditorClient({ initialData }: Props) {
  const [form, setForm] = useState({...initialData, previewUrl: initialData.portraitUrl||""});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState<{t:"success"|"error";x:string}|null>(null);
  const ref = useRef<HTMLInputElement>(null);

  const save = async () => {
    setSaving(true); setMsg(null);
    try { const r = await fetch("/api/admin/producer", { method:"PUT", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ firstName:form.firstName, lastName:form.lastName, role:form.role, bio:form.bio, quote:form.quote }) }); if (!r.ok) throw new Error((await r.json()).error); setMsg({t:"success",x:"Founder profile updated!"}); }
    catch (e:any) { setMsg({t:"error",x:e.message||"Failed"}); }
    setSaving(false);
  };

  const upload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setUploading(true); setMsg(null);
    try {
      const c = await imageCompression(file, {maxSizeMB:1,maxWidthOrHeight:1920,useWebWorker:true});
      const preview = URL.createObjectURL(c);
      const fd = new FormData(); fd.append("file",c,c.name); fd.append("target","producer");
      const r = await fetch("/api/admin/upload",{method:"POST",body:fd}); if (!r.ok) throw new Error((await r.json()).error);
      setForm({...form,hasPortrait:true,previewUrl:preview}); setMsg({t:"success",x:"Portrait uploaded!"});
    } catch (e:any) { setMsg({t:"error",x:e.message||"Upload failed"}); }
    setUploading(false);
  };

  const uBio = (i:number,v:string) => { const b=[...form.bio]; b[i]=v; setForm({...form,bio:b}); };

  return (
    <div style={{maxWidth:880}}>
      <div style={{display:"flex",alignItems:"flex-start",justifyContent:"space-between",marginBottom:"1.75rem",flexWrap:"wrap",gap:"1rem"}}>
        <div>
          <h1 className="pg-t" style={{fontSize:"1.5rem"}}>Founder Profile</h1>
          <p className="pg-sub">Update the producer / founder section on your site.</p>
        </div>
        <button onClick={save} disabled={saving} className="btn btn-p" style={{flexShrink:0}}>
          <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
          {saving?"Saving…":"Save Changes"}
        </button>
      </div>

      {msg && <div className={`alert ${msg.t==="success"?"alert-ok":"alert-err"}`}>{msg.t==="success"?"✓":"✕"} {msg.x}</div>}

      {/* Two-column layout */}
      <div style={{display:"grid",gridTemplateColumns:"280px 1fr",gap:"1.25rem"}} className="editor-grid">
        {/* LEFT — Portrait Card */}
        <div style={{display:"grid",gap:"1.25rem",alignContent:"start"}}>
          <div className="card card-p" style={{textAlign:"center"}}>
            <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:"1rem",justifyContent:"center"}}>
              <div style={{width:28,height:28,borderRadius:"var(--r-sm)",background:"var(--purple-bg)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="var(--purple)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              </div>
              <span style={{fontSize:".75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-2)"}}>Portrait</span>
            </div>

            {/* Image preview — larger, centered */}
            <div style={{width:"100%",maxWidth:200,aspectRatio:"3/4",borderRadius:"var(--r-md)",overflow:"hidden",background:"var(--bg)",border:form.previewUrl?"1px solid var(--border-lt)":"2px dashed var(--border)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 1rem"}}>
              {form.previewUrl ? (
                <img src={form.previewUrl} alt="Portrait" style={{width:"100%",height:"100%",objectFit:"cover"}} />
              ) : form.hasPortrait ? (
                <span style={{fontSize:".8125rem",color:"var(--ok)",fontWeight:600}}>✓ Uploaded</span>
              ) : (
                <div style={{textAlign:"center",padding:"1rem"}}>
                  <svg width={32} height={32} fill="none" viewBox="0 0 24 24" stroke="var(--ink-3)" strokeWidth={1.2} style={{marginBottom:".375rem"}}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                  <p style={{margin:0,fontSize:".6875rem",color:"var(--ink-3)"}}>No portrait set</p>
                </div>
              )}
            </div>

            <input ref={ref} type="file" accept="image/*" onChange={upload} style={{display:"none"}} />
            <button onClick={()=>ref.current?.click()} disabled={uploading} className="btn btn-s" style={{width:"100%",justifyContent:"center",marginBottom:".375rem"}}>
              {uploading?"Compressing…":"Upload Photo"}
            </button>
            <p className="fld-help" style={{textAlign:"center"}}>Auto‑compressed to ≤1 MB</p>
          </div>
        </div>

        {/* RIGHT — Info + Bio */}
        <div style={{display:"grid",gap:"1.25rem",alignContent:"start"}}>
          {/* Personal Info */}
          <div className="card card-p">
            <div style={{display:"flex",alignItems:"center",gap:".5rem",marginBottom:"1rem"}}>
              <div style={{width:28,height:28,borderRadius:"var(--r-sm)",background:"var(--blue-bg)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="var(--blue)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0"/></svg>
              </div>
              <span style={{fontSize:".75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-2)"}}>Personal Info</span>
            </div>
            <div className="g2">
              <div className="fld"><label className="lbl">First Name</label><input className="inp" value={form.firstName} onChange={e=>setForm({...form,firstName:e.target.value})} /></div>
              <div className="fld"><label className="lbl">Last Name</label><input className="inp" value={form.lastName} onChange={e=>setForm({...form,lastName:e.target.value})} /></div>
            </div>
            <div className="fld"><label className="lbl">Role / Title</label><input className="inp" value={form.role} onChange={e=>setForm({...form,role:e.target.value})} placeholder="Founder & Producer" /></div>
            <div className="fld" style={{marginBottom:0}}>
              <label className="lbl">Signature Quote</label>
              <input className="inp" value={form.quote} onChange={e=>setForm({...form,quote:e.target.value})} placeholder="Every story deserves its screen." style={{fontStyle:"italic"}} />
            </div>
          </div>

          {/* Bio */}
          <div className="card card-p">
            <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:"1rem"}}>
              <div style={{display:"flex",alignItems:"center",gap:".5rem"}}>
                <div style={{width:28,height:28,borderRadius:"var(--r-sm)",background:"var(--ok-bg)",display:"flex",alignItems:"center",justifyContent:"center"}}>
                  <svg width={14} height={14} fill="none" viewBox="0 0 24 24" stroke="var(--ok)" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                </div>
                <span style={{fontSize:".75rem",fontWeight:700,textTransform:"uppercase",letterSpacing:".08em",color:"var(--ink-2)"}}>Bio</span>
              </div>
              <button onClick={()=>setForm({...form,bio:[...form.bio,""]})} className="btn btn-s btn-sm">+ Add</button>
            </div>
            {form.bio.map((p,i)=>(
              <div key={i} style={{position:"relative",marginBottom:".75rem"}}>
                <div style={{position:"absolute",top:".5rem",left:".75rem",fontSize:".625rem",fontWeight:700,color:"var(--ink-3)",textTransform:"uppercase",letterSpacing:".06em"}}>Paragraph {i+1}</div>
                <textarea value={p} onChange={e=>uBio(i,e.target.value)} rows={4} className="inp inp-area" style={{paddingTop:"1.625rem"}} />
                {form.bio.length>1 && (
                  <button onClick={()=>setForm({...form,bio:form.bio.filter((_,j)=>j!==i)})} className="btn btn-x" style={{position:"absolute",top:".375rem",right:".375rem",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",borderRadius:"var(--r-sm)",fontSize:".75rem",color:"var(--ink-3)"}}>✕</button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`@media(max-width:768px){.editor-grid{grid-template-columns:1fr!important;}}`}</style>
    </div>
  );
}
