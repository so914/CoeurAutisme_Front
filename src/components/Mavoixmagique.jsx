import { useState, useEffect, useRef, useCallback } from "react";

/* ══ ASSETS ═══════════════════════════════════════════════════════════ */
const A = {
  wbg:      "https://d2oir5eh8rty2e.cloudfront.net/assets/images/welcome_background_gradient_41d6101c-f1ed-46d4-b970-d83e2998c45b.webp",
  lion:     "https://d2oir5eh8rty2e.cloudfront.net/assets/images/character_lion_79cdb992-00d6-4487-8797-10c47eea9ab1.webp",
  wolf:     "https://d2oir5eh8rty2e.cloudfront.net/assets/images/character_wolf_6d6a36a6-356b-40c7-913c-d602e3c25b00.webp",
  panda:    "https://d2oir5eh8rty2e.cloudfront.net/assets/images/character_panda_f9ef596e-133c-44f7-960b-1a62a65dd969.webp",
  play:     "https://d2oir5eh8rty2e.cloudfront.net/assets/images/play_button_icon_98f0cc0f-b451-443c-9470-e273c9ff90ec.webp",
  back:     "https://d2oir5eh8rty2e.cloudfront.net/assets/images/back_arrow_icon_51250068-d1ee-4ef6-a14f-77bb761c31b5.webp",
  mic:      "https://d2oir5eh8rty2e.cloudfront.net/assets/images/microphone_icon_1847cec8-6409-4014-a131-0a60b58bb733.webp",
  volIcon:  "https://d2oir5eh8rty2e.cloudfront.net/assets/images/volume_icon_4492592a-8b7a-4382-9628-8e1b9fdca714.webp",
  platform: "https://d2oir5eh8rty2e.cloudfront.net/assets/images/letter_holder_platform_a4782134-a522-4280-8522-1a82ce4839bb.webp",
  wshop:    "https://d2oir5eh8rty2e.cloudfront.net/assets/images/workshop_background_4811b1f5-df4d-4b1b-81ad-b9847830ed3b.webp",
  music:    "https://d2oir5eh8rty2e.cloudfront.net/assets/sounds/effect/ambient_piano_music_81271559-1975-4397-b5a9-397abf240ff5.mp3",
  bell:     "https://d2oir5eh8rty2e.cloudfront.net/assets/sounds/effect/crystal_bell_sound_b578115e-6301-4b8e-a1bb-783a096f84a3.mp3",
};

/* ══ CONFIG ════════════════════════════════════════════════════════════ */
const CFG = {
  particleDensity: 30,
  particleSpeed:   0.5,
  speechRate:      0.82,   // plus lent → meilleure intelligibilité enfants
  speechPitch:     1.10,   // légèrement aigu → timbre féminin naturel
  speechVolume:    1.0,
};

/* ══ KEYBOARD ROWS ═════════════════════════════════════════════════════ */
const ALPHA = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const ROWS  = [ALPHA.slice(0, 9), ALPHA.slice(9, 18), ALPHA.slice(18)];

/* ══ VOICE SELECTION ───────────────────────────────────────────────────
   Scoring : fr-FR (+50) > fr-* (+25) > nom féminin (+40) > local (+12)
   Pénalité : nom masculin (−40), voix défaut (−3)
─────────────────────────────────────────────────────────────────────── */
const FEMALE_KW = ["amélie","amelie","marie","julie","sophie","alice","aurélie",
  "aurelie","léa","lea","céline","celine","elsa","claire","nathalie","fiona",
  "virginie","camille","lucie","manon","emma","chloé","chloe","female","femme","woman","girl"];
const MALE_KW = ["thomas","nicolas","pierre","jean","paul","lucas","hugo",
  "gabriel","male","homme","man","garçon"];

function scoreVoice(v) {
  const lang = v.lang.toLowerCase(), name = v.name.toLowerCase();
  if (!lang.startsWith("fr")) return -9999;
  let s = 0;
  if (lang === "fr-fr") s += 50; else s += 25;
  if (FEMALE_KW.some(k => name.includes(k))) s += 40;
  if (MALE_KW.some(k => name.includes(k)))   s -= 40;
  if (v.localService) s += 12;
  if (v.default)      s -= 3;
  return s;
}

function pickBestVoice() {
  const all = window.speechSynthesis?.getVoices() ?? [];
  const ranked = all
    .map(v => ({ v, s: scoreVoice(v) }))
    .filter(x => x.s > -9999)
    .sort((a, b) => b.s - a.s);
  return ranked[0]?.v ?? null;
}

/* ══════════════════════════════════════════════════════════════════════
   CSS-IN-JS STYLES  (inline + <style> keyframes injected once)
══════════════════════════════════════════════════════════════════════ */
const KEYFRAMES = `
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700&family=Poppins:wght@400;600;700&display=swap');
@keyframes fl  { 0%,100%{transform:translateY(0)}  50%{transform:translateY(-10px)} }
@keyframes pp  { 0%,100%{transform:scale(1);box-shadow:0 8px 32px rgba(0,0,0,.15)} 50%{transform:scale(1.05);box-shadow:0 14px 44px rgba(168,216,234,.5)} }
@keyframes mp  { 0%,100%{box-shadow:0 8px 28px rgba(77,208,225,.6)} 50%{box-shadow:0 12px 40px rgba(77,208,225,.9)} }
@keyframes sp  { 0%,100%{transform:scale(1)} 50%{transform:scale(1.04)} }
@keyframes cp  { 0%,100%{box-shadow:0 6px 22px rgba(244,143,177,.6)} 50%{box-shadow:0 10px 32px rgba(244,143,177,.85)} }
@keyframes bd  { 0%,100%{opacity:1} 50%{opacity:.25} }
`;

/* ══════════════════════════════════════════════════════════════════════
   SUB-COMPONENTS
══════════════════════════════════════════════════════════════════════ */

/* ── Particle Canvas ── */
function ParticleCanvas({ active }) {
  const ref = useRef(null);
  const animRef = useRef(null);

  useEffect(() => {
    if (!active) { cancelAnimationFrame(animRef.current); return; }
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width  = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;

    const pts = Array.from({ length: CFG.particleDensity }, () => ({
      x:  Math.random() * canvas.width,
      y:  Math.random() * canvas.height,
      l:  ALPHA[Math.floor(Math.random() * 26)],
      sz: 18 + Math.random() * 22,
      vx: (Math.random() - .5) * CFG.particleSpeed,
      vy: (Math.random() - .5) * CFG.particleSpeed,
      o:  .2 + Math.random() * .35,
    }));

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -50) p.x = canvas.width  + 50;
        if (p.x > canvas.width  + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50;
        if (p.y > canvas.height + 50) p.y = -50;
        ctx.font      = `${p.sz}px Poppins`;
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.fillText(p.l, p.x, p.y);
      });
      animRef.current = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animRef.current);
  }, [active]);

  return (
    <canvas ref={ref} style={{
      position: "absolute", inset: 0,
      width: "100%", height: "100%",
      pointerEvents: "none", zIndex: 1,
    }} />
  );
}

/* ── Letter Orb (keyboard key) ── */
function KeyOrb({ letter, onClick }) {
  return (
    <div
      role="button" tabIndex={0} aria-label={`Lettre ${letter}`}
      onClick={onClick}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && onClick()}
      style={{
        width: 54, height: 54, borderRadius: "50%",
        background: "linear-gradient(135deg,#A8D8EA,#C5E7F5)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 24, fontWeight: 700, fontFamily: "'Poppins',sans-serif",
        color: "#2A2A3E",
        boxShadow: "0 4px 12px rgba(168,216,234,.55), inset 0 2px 4px rgba(255,255,255,.65)",
        cursor: "pointer", userSelect: "none",
        transition: "transform 100ms ease, box-shadow 100ms ease",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      onMouseDown={e  => e.currentTarget.style.transform = "scale(.92)"}
      onMouseUp={e    => e.currentTarget.style.transform = "scale(1)"}
    >
      {letter}
    </div>
  );
}

/* ── Word Orb (selected letter, clickable to remove) ── */
function WordOrb({ letter, onRemove }) {
  return (
    <div
      role="button" tabIndex={0} title="Retirer"
      aria-label={`Retirer ${letter}`}
      onClick={onRemove}
      onKeyDown={e => (e.key === "Enter" || e.key === " ") && onRemove()}
      style={{
        width: 72, height: 72, borderRadius: "50%",
        background: "linear-gradient(135deg,#E8D5F2,#D5C6E8)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 32, fontWeight: 700, fontFamily: "'Poppins',sans-serif",
        color: "#2A2A3E",
        boxShadow: "0 4px 14px rgba(168,130,240,.3), inset 0 2px 4px rgba(255,255,255,.55)",
        cursor: "pointer", userSelect: "none",
        transition: "transform 100ms ease",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      onMouseDown={e  => e.currentTarget.style.transform = "scale(.92)"}
      onMouseUp={e    => e.currentTarget.style.transform = "scale(1)"}
    >
      {letter}
    </div>
  );
}

/* ── Empty placeholder orb ── */
function EmptyOrb() {
  return (
    <div style={{
      width: 72, height: 72, borderRadius: "50%",
      background: "rgba(213,198,232,.25)",
      boxShadow: "0 2px 8px rgba(168,216,234,.15), inset 0 1px 3px rgba(255,255,255,.3)",
    }} />
  );
}

/* ══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════════ */
export default function MaVoixMagique() {
  const [screen,    setScreen]    = useState("loading"); // loading | welcome | workshop
  const [letters,   setLetters]   = useState([]);
  const [musicVol,  setMusicVol]  = useState(10);
  const [speaking,  setSpeaking]  = useState(false);
  const [voiceName, setVoiceName] = useState("Voix française 🎙️");
  const [voiceInfo, setVoiceInfo] = useState("");

  const voiceRef    = useRef(null);
  const actxRef     = useRef(null);
  const musicSrcRef = useRef(null);
  const musicGainRef= useRef(null);
  const bellBufRef  = useRef(null);
  const musicBufRef = useRef(null);

  /* ── Inject keyframes once ── */
  useEffect(() => {
    const id = "__mvm_kf__";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id; s.textContent = KEYFRAMES;
      document.head.appendChild(s);
    }
    setTimeout(() => setScreen("welcome"), 700);
  }, []);

  /* ── Voice selection ── */
  const loadVoice = useCallback(() => {
    const v = pickBestVoice();
    if (v) {
      voiceRef.current = v;
      setVoiceName(`${v.name.split(" ")[0]} · ${v.lang} 🎙️`);
      setVoiceInfo(`🎙 Voix : ${v.name}`);
    } else {
      setVoiceInfo("⚠ Aucune voix française – voix système utilisée");
    }
  }, []);

  useEffect(() => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.onvoiceschanged = loadVoice;
    loadVoice();
    const t1 = setTimeout(loadVoice, 800);
    return () => clearTimeout(t1);
  }, [loadVoice]);

  /* ── Physical keyboard ── */
  useEffect(() => {
    if (screen !== "workshop") return;
    const handler = e => {
      if (e.key === "Backspace") {
        e.preventDefault();
        setLetters(prev => prev.slice(0, -1));
      } else if (e.key === "Enter") {
        handleSpeak();
      } else if (e.key.length === 1 && /[a-zA-Z]/.test(e.key)) {
        playBell();
        setLetters(prev => [...prev, e.key.toUpperCase()]);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [screen]); // eslint-disable-line

  /* ── Audio helpers ── */
  function initACtx() {
    if (!actxRef.current)
      actxRef.current = new (window.AudioContext || window.webkitAudioContext)();
  }

  async function loadBuf(url) {
    const r  = await fetch(url);
    const ab = await r.arrayBuffer();
    return actxRef.current.decodeAudioData(ab);
  }

  function playBell() {
    if (!bellBufRef.current || !actxRef.current) return;
    const s = actxRef.current.createBufferSource();
    const g = actxRef.current.createGain();
    s.buffer = bellBufRef.current;
    g.gain.value = 0.7;
    s.connect(g); g.connect(actxRef.current.destination);
    s.start(0);
  }

  function startMusic() {
    if (!musicBufRef.current || !actxRef.current) return;
    if (musicSrcRef.current) { try { musicSrcRef.current.stop(); } catch (_) {} }
    musicSrcRef.current        = actxRef.current.createBufferSource();
    musicSrcRef.current.buffer = musicBufRef.current;
    musicSrcRef.current.loop   = true;
    musicGainRef.current       = actxRef.current.createGain();
    musicGainRef.current.gain.value = musicVol / 100;
    musicSrcRef.current.connect(musicGainRef.current);
    musicGainRef.current.connect(actxRef.current.destination);
    musicSrcRef.current.start(0);
  }

  function updateMusicVol(v) {
    setMusicVol(v);
    if (musicGainRef.current) musicGainRef.current.gain.value = v / 100;
  }

  /* ── TTS ── */
  function handleSpeak() {
    if (!letters.length) return;
    const word = letters.join("");
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(word);
    if (voiceRef.current) { u.voice = voiceRef.current; u.lang = voiceRef.current.lang; }
    else u.lang = "fr-FR";
    u.rate   = CFG.speechRate;
    u.pitch  = CFG.speechPitch;
    u.volume = CFG.speechVolume;
    u.onstart = () => setSpeaking(true);
    const done = () => setSpeaking(false);
    u.onend = done; u.onerror = done;
    window.speechSynthesis.speak(u);
  }

  /* ── Screen transitions ── */
  async function goToWorkshop() {
    initACtx();
    // load audio in background
    if (!musicBufRef.current)
      loadBuf(A.music).then(b => { musicBufRef.current = b; }).catch(() => {});
    if (!bellBufRef.current)
      loadBuf(A.bell).then(b  => { bellBufRef.current  = b; }).catch(() => {});
    startMusic();
    setScreen("workshop");
  }

  function goToWelcome() {
    setLetters([]);
    setScreen("welcome");
  }

  /* ── Letter actions ── */
  function addLetter(l) { initACtx(); playBell(); setLetters(prev => [...prev, l]); }
  function rmLetter(i)  { initACtx(); playBell(); setLetters(prev => prev.filter((_, idx) => idx !== i)); }
  function clrLetters() { initACtx(); playBell(); setLetters([]); }

  /* ══════════════════════════════════════════════════════════════════
     RENDER
  ══════════════════════════════════════════════════════════════════ */
  return (
    <div style={{
      position: "relative", width: "100%", height: "100vh",
      background: "linear-gradient(180deg,#E8D5F2 0%,#C5E7F5 100%)",
      fontFamily: "'Quicksand',sans-serif", overflow: "hidden",
    }}>

      {/* ── LOADING ── */}
      {screen === "loading" && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 1000,
          background: "linear-gradient(180deg,#E8D5F2,#C5E7F5)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <p style={{ fontSize: 28, color: "white", fontWeight: 600 }}>✨ Chargement…</p>
        </div>
      )}

      {/* ══════════ WELCOME SCREEN ══════════ */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        opacity: screen === "welcome" ? 1 : 0,
        pointerEvents: screen === "welcome" ? "auto" : "none",
        transition: "opacity 500ms ease",
      }}>
        {/* Background image */}
        <img src={A.wbg} alt="" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", zIndex: 0,
        }} />

        {/* Floating letter particles */}
        <ParticleCanvas active={screen === "welcome"} />

        {/* Content */}
        <div style={{
          position: "relative", zIndex: 10,
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 32,
        }}>
          <h1 style={{
            fontSize: "clamp(38px,7vw,64px)", fontWeight: 700, color: "white",
            textShadow: "0 4px 20px rgba(80,40,140,.35)",
            textAlign: "center", padding: "0 24px",
          }}>
            Ma Voix Magique
          </h1>

          {/* Characters */}
          <div style={{ display: "flex", gap: 24, alignItems: "flex-end" }}>
            {[
              { src: A.lion,  alt: "Lion",  h: 140, delay: "0s"   },
              { src: A.panda, alt: "Panda", h: 168, delay: "0.5s" },
              { src: A.wolf,  alt: "Loup",  h: 140, delay: "1s"   },
            ].map(({ src, alt, h, delay }) => (
              <img key={alt} src={src} alt={alt} style={{
                height: h, width: "auto",
                filter: "drop-shadow(0 8px 20px rgba(0,0,0,.18))",
                animation: `fl 3s ease-in-out ${delay} infinite`,
              }} />
            ))}
          </div>

          {/* Play button */}
          <button
            aria-label="Jouer"
            onClick={goToWorkshop}
            style={{
              width: 120, height: 120, borderRadius: "50%",
              background: "rgba(255,255,255,.92)", border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "pp 2s ease-in-out infinite",
            }}
          >
            <img src={A.play} alt="Jouer" style={{ width: 64, height: 64, objectFit: "contain" }} />
          </button>

          {/* Voice badge */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "8px 18px", background: "rgba(255,255,255,.28)",
            borderRadius: 20, backdropFilter: "blur(8px)",
            fontSize: 13, color: "white", fontWeight: 600,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#7fffb0", boxShadow: "0 0 6px #7fffb0",
              animation: "bd 2s ease-in-out infinite",
            }} />
            <span>{voiceName}</span>
          </div>

          {/* Volume */}
          <div style={{
            display: "flex", alignItems: "center", gap: 16,
            padding: "12px 24px", background: "rgba(255,255,255,.3)",
            borderRadius: 24, backdropFilter: "blur(10px)",
          }}>
            <img src={A.volIcon} alt="Volume" style={{ width: 32, height: 32, objectFit: "contain" }} />
            <input
              type="range" min={0} max={100} value={musicVol}
              onChange={e => updateMusicVol(parseInt(e.target.value))}
              style={{ width: 200, accentColor: "white" }}
            />
          </div>
        </div>
      </div>

      {/* ══════════ WORKSHOP SCREEN ══════════ */}
      <div style={{
        position: "absolute", inset: 0,
        opacity: screen === "workshop" ? 1 : 0,
        pointerEvents: screen === "workshop" ? "auto" : "none",
        transition: "opacity 500ms ease",
      }}>
        {/* Background */}
        <img src={A.wshop} alt="Atelier" style={{
          position: "absolute", inset: 0, width: "100%", height: "100%",
          objectFit: "cover", zIndex: 0,
        }} />

        <div style={{
          position: "relative", zIndex: 1,
          width: "100%", height: "100%",
          display: "flex", flexDirection: "column",
        }}>

          {/* Header */}
          <div style={{
            padding: 24, display: "flex",
            alignItems: "center", justifyContent: "center",
            position: "relative",
          }}>
            <button
              aria-label="Retour" onClick={goToWelcome}
              style={{
                position: "absolute", left: 24, top: 24,
                width: 72, height: 72, borderRadius: "50%",
                background: "rgba(255,255,255,.9)", border: "none", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 4px 16px rgba(0,0,0,.15)",
              }}
            >
              <img src={A.back} alt="Retour" style={{ width: 38, height: 38, objectFit: "contain" }} />
            </button>

            <div style={{ textAlign: "center" }}>
              <h1 style={{
                fontSize: "clamp(28px,5vw,44px)", fontWeight: 700,
                color: "#2A2A3E", textShadow: "0 2px 10px rgba(255,255,255,.9)",
                marginBottom: 4,
              }}>
                L'Atelier des Mots
              </h1>
              <p style={{
                fontSize: "clamp(16px,2.5vw,24px)",
                color: "#5A5A6E", fontWeight: 400,
              }}>
                Choisis tes lettres !
              </p>
            </div>
          </div>

          {/* Text reception zone */}
          <div style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "flex-start",
            padding: "12px 24px", gap: 16,
          }}>

            {/* Mic / listen button */}
            <button
              aria-label="Écouter le mot"
              onClick={handleSpeak}
              style={{
                width: 120, height: 120, borderRadius: "50%",
                background: speaking
                  ? "linear-gradient(135deg,#FFB74D,#FF9800)"
                  : "linear-gradient(135deg,#80DEEA,#4DD0E1)",
                border: "4px solid rgba(255,255,255,.8)",
                cursor: "pointer",
                display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", gap: 6,
                boxShadow: speaking
                  ? "0 8px 28px rgba(255,152,0,.7), inset 0 2px 4px rgba(255,255,255,.6)"
                  : "0 8px 28px rgba(77,208,225,.6), inset 0 2px 4px rgba(255,255,255,.6)",
                animation: speaking ? "sp .5s ease-in-out infinite" : "mp 2s ease-in-out infinite",
                transition: "background 300ms ease, box-shadow 300ms ease",
              }}
            >
              <img src={A.mic} alt="Micro" style={{ width: 52, height: 52, objectFit: "contain" }} />
              <span style={{ fontSize: 15, fontWeight: 700, color: "#2A2A3E", fontFamily: "'Quicksand',sans-serif" }}>
                {speaking ? "En cours…" : "Écouter"}
              </span>
            </button>

            {/* Word display */}
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 10,
              justifyContent: "center", alignItems: "center",
              maxWidth: "92%", minHeight: 90,
              padding: "12px 20px",
              background: "rgba(255,255,255,.55)",
              borderRadius: 24,
              boxShadow: "0 4px 20px rgba(168,216,234,.2), inset 0 2px 4px rgba(255,255,255,.7)",
              backdropFilter: "blur(6px)",
              border: "1.5px solid rgba(200,180,240,.3)",
            }}>
              {letters.length === 0
                ? Array.from({ length: 5 }).map((_, i) => <EmptyOrb key={i} />)
                : letters.map((l, i) => (
                    <WordOrb key={i} letter={l} onRemove={() => rmLetter(i)} />
                  ))
              }
            </div>

            {/* Voice info */}
            <div style={{
              fontSize: 12, color: "rgba(90,90,110,.75)",
              textAlign: "center", minHeight: 18,
              fontWeight: 600, letterSpacing: ".3px",
            }}>
              {voiceInfo}
            </div>
          </div>

          {/* Keyboard + platform */}
          <div style={{
            position: "relative",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "flex-end",
            paddingBottom: 24, gap: 12,
          }}>
            {/* Platform image */}
            <img src={A.platform} alt="" style={{
              position: "absolute", bottom: 0, left: "50%",
              transform: "translateX(-50%)",
              width: "min(700px, 96vw)", height: "auto",
              pointerEvents: "none", zIndex: 0, opacity: .9,
            }} />

            {/* Letter rows */}
            <div style={{
              position: "relative", zIndex: 2,
              display: "flex", flexDirection: "column", gap: 6,
            }}>
              {ROWS.map((row, ri) => (
                <div key={ri} style={{ display: "flex", gap: 6, justifyContent: "center" }}>
                  {row.map(l => (
                    <KeyOrb key={l} letter={l} onClick={() => addLetter(l)} />
                  ))}
                </div>
              ))}
            </div>

            {/* Clear button */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <button
                aria-label="Effacer tout" onClick={clrLetters}
                style={{
                  width: 90, height: 90, borderRadius: "50%",
                  background: "linear-gradient(135deg,#F8A5C0,#F48FB1)",
                  border: "4px solid rgba(255,255,255,.8)", cursor: "pointer",
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 6,
                  boxShadow: "0 6px 22px rgba(244,143,177,.6), inset 0 2px 4px rgba(255,255,255,.5)",
                  animation: "cp 2s ease-in-out infinite",
                }}
              >
                <span style={{
                  fontSize: 13, fontWeight: 700, color: "white",
                  fontFamily: "'Quicksand',sans-serif",
                }}>
                  Effacer
                </span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}