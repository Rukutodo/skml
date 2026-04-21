import { writeClient } from "@/lib/sanity/writeClient";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const [aboutId, producerId, films, assetSizes] = await Promise.all([
    writeClient.fetch(`*[_type == "about" && _id == "aboutSettings"][0]._id`).catch(() => null),
    writeClient.fetch(`*[_type == "producer" && _id == "founderSettings"][0]._id`).catch(() => null),
    writeClient.fetch(`*[_type == "film"] | order(order asc) { _id, title, year, category, ottPlatform }`).catch(() => []),
    writeClient.fetch(`*[_type in ["sanity.imageAsset", "sanity.fileAsset"]].size`).catch(() => []),
  ]);

  const about = !!aboutId;
  const produced = films.filter((f: any) => f.category === "produced").length;
  const distributed = films.filter((f: any) => f.category === "distributed").length;
  const bytes = assetSizes.reduce((a: number, b: number) => a + (b || 0), 0);
  const mb = (bytes / (1024 * 1024)).toFixed(1);

  const stats = [
    { lbl: "Total Films", val: films.length, c: "#1A1D21", ico: "🎬" },
    { lbl: "Produced", val: produced, c: "#22C55E", ico: "🎥" },
    { lbl: "Distributed", val: distributed, c: "#3B82F6", ico: "📡" },
    { lbl: "Storage", val: `${mb} MB`, c: "#8B5CF6", ico: "💾", sub: `${assetSizes.length} assets` },
    { lbl: "About", val: about ? "Live" : "Draft", c: about ? "#22C55E" : "#EF4444", ico: about ? "✅" : "⚠️" },
  ];

  const actions = [
    { label: "About Banner", href: "/admin/about", desc: "Headline, stats & CTA", bg: "#EFF6FF", c: "#3B82F6" },
    { label: "Founder", href: "/admin/producer", desc: "Bio, portrait & quote", bg: "#F5F3FF", c: "#8B5CF6" },
    { label: "Films", href: "/admin/films", desc: "Add, edit or remove", bg: "#ECFDF5", c: "#22C55E" },
  ];

  return (
    <div style={{ maxWidth: 960 }}>
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 className="pg-t">Welcome back 👋</h1>
        <p className="pg-sub">Here&apos;s your SKML content overview.</p>
      </div>

      <div className="g-stat" style={{ marginBottom: "1.75rem" }}>
        {stats.map(s => (
          <div key={s.lbl} className="stat" style={{ "--c": s.c } as React.CSSProperties}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p className="stat-lbl">{s.lbl}</p>
              <span className="stat-ico">{s.ico}</span>
            </div>
            <p className="stat-val">{s.val}</p>
            {(s as any).sub && <p className="stat-sub">{(s as any).sub}</p>}
          </div>
        ))}
      </div>

      <p className="sec-t">Quick Actions</p>
      <div className="g-act" style={{ marginBottom: "2rem" }}>
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

      {films.length > 0 && (<>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: ".75rem" }}>
          <p className="sec-t" style={{ margin: 0, border: "none", paddingBottom: 0 }}>Recent Films</p>
          <a href="/admin/films" className="btn btn-s btn-sm" style={{ textDecoration: "none" }}>View All →</a>
        </div>
        <div className="tbl-wrap" style={{ overflowX: "auto" }}>
          <table className="tbl">
            <thead><tr><th>Title</th><th>Year</th><th>Category</th><th>Platform</th></tr></thead>
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
