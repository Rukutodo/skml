import Image from "next/image";

export function StudioLogo(props: any) {
  const { renderDefault, title } = props;

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "4px" }}>
      <Image
        src="/assets/images/skml-logo.png"
        alt="SKML Motion Pictures Logo"
        width={32}
        height={32}
        style={{ objectFit: "contain" }}
        unoptimized
      />
      <span style={{ fontWeight: 600 }}>{title} // Admin</span>
    </div>
  );
}
