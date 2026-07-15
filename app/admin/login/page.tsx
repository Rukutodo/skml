"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }

      router.push("/admin");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "linear-gradient(145deg, #0A0B0F 0%, #14151F 40%, #0F1015 100%)",
      padding: "1.5rem",
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    }}>
      {/* Subtle grid overlay */}
      <div style={{
        position: "fixed", inset: 0,
        backgroundImage: "radial-gradient(rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
        pointerEvents: "none",
      }} />

      {/* Glow effect */}
      <div style={{
        position: "fixed",
        top: "30%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: "500px", height: "500px",
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(200,169,81,0.06) 0%, transparent 70%)",
        pointerEvents: "none",
        filter: "blur(60px)",
      }} />

      <div style={{
        position: "relative",
        width: "100%",
        maxWidth: "400px",
      }}>
        {/* Login Card */}
        <div style={{
          background: "#FFFFFF",
          borderRadius: "16px",
          boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04)",
          overflow: "hidden",
        }}>
          {/* Gold accent strip */}
          <div style={{ height: "3px", background: "linear-gradient(90deg, #C8A951, #E8D48B, #C8A951)" }} />

          <div style={{ padding: "2.5rem 2rem 2rem" }}>
            {/* Logo & Title */}
            <div style={{ textAlign: "center", marginBottom: "2rem" }}>
              <div style={{
                width: "52px", height: "52px", margin: "0 auto 1rem",
                borderRadius: "12px", background: "#0F1419",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              }}>
                <Image src="/assets/images/skml-logo.png" alt="SKML" width={32} height={32} style={{ objectFit: "contain" }} unoptimized />
              </div>
              <h1 style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.5rem", fontWeight: 700, color: "#0F1419",
                letterSpacing: "-0.02em", margin: 0,
              }}>
                Admin Dashboard
              </h1>
              <p style={{
                marginTop: "0.5rem", fontSize: "0.8125rem",
                color: "#536471", lineHeight: 1.5,
              }}>
                Sign in to manage your content
              </p>
            </div>

            {/* Error */}
            {error && (
              <div style={{
                marginBottom: "1.25rem", padding: "0.75rem 1rem",
                borderRadius: "10px", fontSize: "0.8125rem",
                background: "#FFF1F2", color: "#F4212E",
                border: "1px solid rgba(244,33,46,0.15)",
                display: "flex", alignItems: "center", gap: "0.5rem",
                animation: "slideDown 0.3s ease",
              }}>
                ✕ {error}
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: "1.25rem" }}>
                <label style={{
                  display: "block", marginBottom: "0.375rem",
                  fontSize: "0.8125rem", fontWeight: 600, color: "#0F1419",
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="admin@skml.com"
                  style={{
                    width: "100%", padding: "0.625rem 0.875rem",
                    fontSize: "0.875rem", borderRadius: "6px",
                    border: "1.5px solid #E8ECF0",
                    outline: "none", transition: "all 0.2s ease",
                    background: "#F7F8FA", color: "#0F1419",
                    boxSizing: "border-box",
                    fontFamily: "inherit",
                  }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "#0F1419"; e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(15,20,25,0.06)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "#E8ECF0"; e.currentTarget.style.background = "#F7F8FA"; e.currentTarget.style.boxShadow = "none"; }}
                />
              </div>

              <div style={{ marginBottom: "1.75rem" }}>
                <label style={{
                  display: "block", marginBottom: "0.375rem",
                  fontSize: "0.8125rem", fontWeight: 600, color: "#0F1419",
                }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    style={{
                      width: "100%", padding: "0.625rem 2.5rem 0.625rem 0.875rem",
                      fontSize: "0.875rem", borderRadius: "6px",
                      border: "1.5px solid #E8ECF0",
                      outline: "none", transition: "all 0.2s ease",
                      background: "#F7F8FA", color: "#0F1419",
                      boxSizing: "border-box",
                      fontFamily: "inherit",
                    }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#0F1419"; e.currentTarget.style.background = "#FFFFFF"; e.currentTarget.style.boxShadow = "0 0 0 3px rgba(15,20,25,0.06)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "#E8ECF0"; e.currentTarget.style.background = "#F7F8FA"; e.currentTarget.style.boxShadow = "none"; }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: "absolute",
                      right: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "none",
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      color: "#8899A6",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    title={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: "100%", padding: "0.75rem",
                  fontSize: "0.875rem", fontWeight: 600,
                  borderRadius: "6px", border: "none",
                  cursor: loading ? "not-allowed" : "pointer",
                  background: loading ? "#8899A6" : "#0F1419",
                  color: "#FFFFFF",
                  transition: "all 0.2s ease",
                  boxShadow: loading ? "none" : "0 1px 3px rgba(0,0,0,0.15)",
                  fontFamily: "inherit",
                }}
                onMouseEnter={(e) => { if (!loading) { e.currentTarget.style.background = "#2D2D3F"; e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)"; } }}
                onMouseLeave={(e) => { if (!loading) { e.currentTarget.style.background = "#0F1419"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.15)"; } }}
              >
                {loading ? "Signing in…" : "Sign In"}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div style={{
            padding: "0.875rem 2rem", background: "#F7F8FA",
            borderTop: "1px solid #F0F2F5",
            textAlign: "center", fontSize: "0.6875rem",
            color: "#8899A6", letterSpacing: "0.02em",
          }}>
            SKML Motion Pictures © {new Date().getFullYear()}
          </div>
        </div>
      </div>
    </div>
  );
}
