"use client";
import React, { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { Film, Sparkles, User, Play, Plus, Video, Mic, Download } from "lucide-react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

export default function FasoFruitsStudio() {
  const [view, setView] = useState<"home" | "auth" | "studio">("home");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [storyIdea, setStoryIdea] = useState("");
  const [style, setStyle] = useState("3D");
  const [scenes, setScenes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAuth = async (isSignUp: boolean) => {
    setLoading(true);
    setMessage("");
    const { error } = isSignUp
      ? await supabase.auth.signUp({ email, password })
      : await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setMessage(error.message);
    } else {
      setView("studio");
    }
    setLoading(false);
  };

  const generateScenes = () => {
    if (!storyIdea.trim()) return;
    setLoading(true);
    setTimeout(() => {
      const generated = Array.from({ length: 12 }, (_, i) => ({
        order: i + 1,
        duration: "6s",
        visual: `Scène ${i + 1} (${style}) : Illustration cinématographique de "${storyIdea}" - Plan ${i % 2 === 0 ? "rapproché" : "large"}.`,
        dialogue: `Dialogue français de la scène ${i + 1} synchronisé avec le personnage.`,
      }));
      setScenes(generated);
      setLoading(false);
    }, 800);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#0a0a0c", color: "#ffffff", fontFamily: "sans-serif" }}>
      {/* Barre de navigation */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 24px", borderBottom: "1px solid #222" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => setView("home")}>
          <Film color="#f97316" size={28} />
          <span style={{ fontSize: "20px", fontWeight: "bold", letterSpacing: "1px" }}>FASO FRUITS</span>
        </div>
        <div style={{ display: "flex", gap: "12px" }}>
          <button onClick={() => setView("studio")} style={{ background: "#222", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", cursor: "pointer" }}>
            Studio IA
          </button>
          <button onClick={() => setView("auth")} style={{ background: "#f97316", color: "#fff", border: "none", padding: "8px 16px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
            Connexion
          </button>
        </div>
      </header>

      {/* Page d'accueil */}
      {view === "home" && (
        <main style={{ maxWidth: "800px", margin: "60px auto", padding: "0 20px", textAlign: "center" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#1f1610", color: "#f97316", padding: "6px 14px", borderRadius: "20px", fontSize: "14px", marginBottom: "20px" }}>
            <Sparkles size={16} /> Studio de Films & Séries Animés par IA
          </div>
          <h1 style={{ fontSize: "40px", lineHeight: "1.2", marginBottom: "20px" }}>
            Transformez vos histoires en <span style={{ color: "#f97316" }}>dessins animés</span> professionnels
          </h1>
          <p style={{ color: "#a1a1aa", fontSize: "18px", lineHeight: "1.6", marginBottom: "36px" }}>
            Créez des personnages 2D et 3D, générez des dialogues en français avec synchronisation des lèvres et exportez vos séries en MP4 sans savoir dessiner.
          </p>
          <button onClick={() => setView("studio")} style={{ background: "#f97316", color: "#fff", border: "none", padding: "16px 32px", borderRadius: "12px", fontSize: "18px", fontWeight: "bold", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <Play size={20} /> Lancer le Studio Gratuitement
          </button>
        </main>
      )}

      {/* Inscription / Connexion */}
      {view === "auth" && (
        <div style={{ maxWidth: "400px", margin: "60px auto", background: "#141417", padding: "30px", borderRadius: "16px", border: "1px solid #27272a" }}>
          <h2 style={{ marginBottom: "20px", textAlign: "center" }}>Accès Studio FASO FRUITS</h2>
          <input type="email" placeholder="Votre e-mail" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: "100%", padding: "12px", marginBottom: "12px", borderRadius: "8px", background: "#0a0a0c", border: "1px solid #333", color: "#fff", boxSizing: "border-box" }} />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: "100%", padding: "12px", marginBottom: "20px", borderRadius: "8px", background: "#0a0a0c", border: "1px solid #333", color: "#fff", boxSizing: "border-box" }} />
          {message && <p style={{ color: "#f97316", fontSize: "14px", marginBottom: "12px" }}>{message}</p>}
          <div style={{ display: "flex", gap: "10px" }}>
            <button onClick={() => handleAuth(false)} disabled={loading} style={{ flex: 1, background: "#f97316", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
              Se connecter
            </button>
            <button onClick={() => handleAuth(true)} disabled={loading} style={{ flex: 1, background: "#27272a", color: "#fff", border: "none", padding: "12px", borderRadius: "8px", cursor: "pointer" }}>
              Créer un compte
            </button>
          </div>
        </div>
      )}

      {/* Studio de création (12 scènes) */}
      {view === "studio" && (
        <div style={{ maxWidth: "900px", margin: "30px auto", padding: "0 20px" }}>
          <div style={{ background: "#141417", padding: "24px", borderRadius: "16px", border: "1px solid #27272a", marginBottom: "30px" }}>
            <h2 style={{ marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" }}>
              <Plus color="#f97316" /> Nouveau Projet Animé
            </h2>
            <textarea
              rows={3}
              placeholder="Décrivez votre histoire ici (ex: Un jeune inventeur à Ouagadougou fabrique un robot qui parle...)"
              value={storyIdea}
              onChange={(e) => setStoryIdea(e.target.value)}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "#0a0a0c", border: "1px solid #333", color: "#fff", marginBottom: "16px", boxSizing: "border-box" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
              <select value={style} onChange={(e) => setStyle(e.target.value)} style={{ padding: "10px 16px", borderRadius: "8px", background: "#0a0a0c", color: "#fff", border: "1px solid #333" }}>
                <option value="3D">Animation 3D Cinéma</option>
                <option value="2D">Dessin Animé 2D</option>
              </select>
              <button onClick={generateScenes} disabled={loading} style={{ background: "#f97316", color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: "bold", cursor: "pointer" }}>
                {loading ? "Découpage en cours..." : "Générer les 12 Scènes"}
              </button>
            </div>
          </div>

          {scenes.length > 0 && (
            <div>
              <h3 style={{ marginBottom: "16px" }}>Découpage de l'épisode (12 scènes × 6s)</h3>
              <div style={{ display: "grid", gap: "16px" }}>
                {scenes.map((scene) => (
                  <div key={scene.order} style={{ background: "#141417", padding: "16px", borderRadius: "12px", border: "1px solid #27272a" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", color: "#f97316", fontWeight: "bold" }}>
                      <span>Scène {scene.order}</span>
                      <span>{scene.duration}</span>
                    </div>
                    <p style={{ fontSize: "14px", color: "#d4d4d8", marginBottom: "8px" }}>{scene.visual}</p>
                    <p style={{ fontSize: "14px", color: "#a1a1aa", fontStyle: "italic" }}>🎙️ « {scene.dialogue} »</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

