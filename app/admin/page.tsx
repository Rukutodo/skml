import { writeClient } from "@/lib/sanity/writeClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [aboutId, producerId, films, assets] = await Promise.all([
    writeClient.fetch(`*[_type == "about" && _id == "aboutSettings"][0]._id`).catch(() => null),
    writeClient.fetch(`*[_type == "producer" && _id == "founderSettings"][0]._id`).catch(() => null),
    writeClient.fetch(`*[_type == "film"] | order(order asc) { _id, title, year, category, ottPlatform }`).catch(() => []),
    writeClient.fetch(`*[_type in ["sanity.imageAsset", "sanity.fileAsset"]] { _type, size }`).catch(() => []),
  ]);

  const about = !!aboutId;
  const produced = films.filter((f: any) => f.category === "produced").length;
  const distributed = films.filter((f: any) => f.category === "distributed").length;
  
  // Storage logic
  const imageBytes = assets.filter((a: any) => a._type === "sanity.imageAsset").reduce((a: any, b: any) => a + (b.size || 0), 0);
  const fileBytes = assets.filter((a: any) => a._type === "sanity.fileAsset").reduce((a: any, b: any) => a + (b.size || 0), 0);
  const totalBytes = imageBytes + fileBytes;
  
  const mb = (totalBytes / (1024 * 1024)).toFixed(1);
  const imgMb = (imageBytes / (1024 * 1024)).toFixed(1);
  const fileMb = (fileBytes / (1024 * 1024)).toFixed(1);
  
  // Capacity logic (e.g., 500MB limit for display purposes)
  const capacityMb = 500;
  const percent = Math.min(100, (parseFloat(mb) / capacityMb) * 100);

  const stats = [
    { lbl: "Total Films", val: films.length, c: "#1A1D21", ico: "🎬" },
    { lbl: "Produced", val: produced, c: "#22C55E", ico: "🎥" },
    { lbl: "Distributed", val: distributed, c: "#3B82F6", ico: "📡" },
    { lbl: "About Page", val: about ? "Live" : "Draft", c: about ? "#22C55E" : "#EF4444", ico: about ? "✅" : "⚠️" },
  ];

  const actions = [
    { label: "About Banner", href: "/admin/about", desc: "Headline, stats & CTA", bg: "#EFF6FF", c: "#3B82F6" },
    { label: "Founder", href: "/admin/producer", desc: "Bio, portrait & quote", bg: "#F5F3FF", c: "#8B5CF6" },
    { label: "Films", href: "/admin/films", desc: "Add, edit or remove", bg: "#ECFDF5", c: "#22C55E" },
  ];

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto" }}>
      <div className="pg-h">
        <div>
          <h1 className="pg-t">Executive Overview</h1>
          <p className="pg-sub">Manage your cinematic portfolio and content settings.</p>
        </div>
        <div className="adm-live"><i />System Operational</div>
      </div>

      <div className="g-stat" style={{ marginBottom: "2rem" }}>
        {stats.map(s => (
          <div key={s.lbl} className="stat" style={{ "--c": s.c } as React.CSSProperties}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="stat-lbl">{s.lbl}</p>
              <span className="stat-ico">{s.ico}</span>
            </div>
            <p className="stat-val">{s.val}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.5rem", marginBottom: "2.5rem" }} className="g2">
        {/* Left Column: Management & Activity */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Quick Actions */}
          <div>
            <p className="sec-t">Content Management</p>
            <div className="g-act" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
              {actions.map(a => (
                <a key={a.href} href={a.href} className="act">
                  <div className="act-ico" style={{ background: a.bg }}>
                    <svg width={16} height={16} fill="none" viewBox="0 0 24 24" stroke={a.c} strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                  </div>
                  <h4>{a.label} <span className="arr">→</span></h4>
                  <p>{a.desc}</p>
                </a>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div>
            <p className="sec-t">Recent System Activity</p>
            <div className="card">
              <div className="act-feed">
                {[
                  { t: "Film Metadata Updated", d: "Aghora (2020) alt-text synchronized", c: "var(--gold)", time: "2 hours ago" },
                  { t: "New Asset Uploaded", d: "Poster-Mr-Lonely-HighRes.png (2.4MB)", c: "var(--blue)", time: "5 hours ago" },
                  { t: "Structure Rebuild", d: "Sanity Singletons locked for production", c: "var(--ok)", time: "Yesterday" },
                ].map((item, i) => (
                  <div key={i} className="act-item">
                    <div className="act-dot" style={{ background: item.c }} />
                    <div className="act-info">
                      <p><strong>{item.t}</strong> — {item.d}</p>
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Widgets */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Storage Widget */}
          <div className="card card-p">
            <p className="stat-lbl" style={{ marginBottom: "0.75rem" }}>Cloud Storage Usage</p>
            <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "1rem" }}>
              <span style={{ fontSize: "2rem", fontWeight: 700, fontFamily: "var(--f-display)" }}>{mb}</span>
              <span style={{ fontSize: "0.875rem", color: "var(--ink-3)", fontWeight: 600 }}>MB / {capacityMb}MB</span>
            </div>
            
            <div style={{ height: "8px", background: "var(--bg)", borderRadius: "4px", overflow: "hidden", marginBottom: "1.25rem" }}>
              <div style={{ 
                height: "100%", 
                width: `${percent}%`, 
                background: "linear-gradient(90deg, var(--gold), #E8D48B)",
                borderRadius: "4px",
                boxShadow: "0 0 12px rgba(212, 168, 67, 0.3)"
              }} />
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                <span style={{ color: "var(--ink-2)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--gold)" }} /> Images
                </span>
                <span style={{ fontWeight: 600 }}>{imgMb} MB</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem" }}>
                <span style={{ color: "var(--ink-2)", display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "2px", background: "var(--ink-3)" }} /> Assets
                </span>
                <span style={{ fontWeight: 600 }}>{fileMb} MB</span>
              </div>
            </div>
          </div>

          {/* Performance Trends Mockup */}
          <div className="card card-p">
            <p className="stat-lbl">Engagement Trends</p>
            <div className="chart-wrap">
              {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                <div 
                  key={i} 
                  className={`chart-bar ${i === 3 ? 'active' : ''}`} 
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <p style={{ fontSize: "0.6875rem", color: "var(--ink-3)", marginTop: "1rem", textAlign: "center" }}>
              Portfolio Visibility: <strong>+12.5%</strong> this week
            </p>
          </div>
        </div>
      </div>

      {films.length > 0 && (<>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".75rem" }}>
          <p className="sec-t" style={{ margin: 0, border: "none", paddingBottom: 0 }}>Global Distribution Ledger</p>
          <a href="/admin/films" className="btn btn-s btn-sm">Manage Assets →</a>
        </div>
        <div className="tbl-wrap">
          <table className="tbl">
            <thead><tr><th>Asset Title</th><th>Release</th><th>Category</th><th>Primary Platform</th></tr></thead>
            <tbody>
              {films.slice(0, 5).map((f: any) => (
                <tr key={f._id}>
                  <td className="bld">{f.title}</td>
                  <td className="mut">{f.year || "—"}</td>
                  <td><span className={`badge ${f.category === "produced" ? "badge-ok" : "badge-blue"}`}>{f.category}</span></td>
                  <td className="mut">{f.ottPlatform || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>)}
    </div>
  );
}
