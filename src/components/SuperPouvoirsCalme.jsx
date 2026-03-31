import { useState, useEffect, useRef, useCallback } from "react";

/* ─── GOOGLE FONTS ─── */
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800;900&family=Baloo+2:wght@700;800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
    body { background: #c9b8f0; font-family: 'Nunito', sans-serif; }
  `}</style>
);

/* ─── PALETTE ─── */
const C = {
  purple:     "#7c5cbf",
  purpleLight:"#a882e0",
  purplePale: "#e8dff8",
  purpleBg:   "#d4c2f0",
  blue:       "#6ab0e8",
  blueLight:  "#d6edfb",
  green:      "#7ecfa8",
  greenLight: "#d4f2e5",
  coral:      "#f4967a",
  coralLight: "#fde0d5",
  amber:      "#f6c84e",
  amberLight: "#fef3ce",
  teal:       "#5bc4c4",
  tealLight:  "#d0f2f0",
  white:      "#ffffff",
  textDark:   "#3d2b6b",
  textMid:    "#6b5590",
  textLight:  "#a090c0",
  bgCard:     "rgba(255,255,255,0.82)",
};

/* ─── GLOBAL STYLES ─── */
const gs = {
  app: {
    width: "100%", maxWidth: 420, minHeight: "100vh",
    margin: "0 auto", position: "relative",
    fontFamily: "'Nunito', sans-serif",
    background: `linear-gradient(160deg, #cbb8f2 0%, #b8c8f5 50%, #c8e0f8 100%)`,
    overflowX: "hidden",
  },
  screen: { width: "100%", minHeight: "100vh", display: "flex", flexDirection: "column" },
  titleFont: { fontFamily: "'Baloo 2', cursive" },
};

/* ══════════════════════════════════════════
   CHARACTERS SVG  (boy + girl, 3D-ish style)
══════════════════════════════════════════ */
function Characters({ small }) {
  const s = small ? 0.75 : 1;
  return (
    <svg width={220 * s} height={160 * s} viewBox="0 0 220 160" fill="none">
      {/* clouds behind */}
      <ellipse cx="110" cy="140" rx="90" ry="22" fill="white" opacity="0.35"/>
      <ellipse cx="50" cy="90" rx="30" ry="10" fill="white" opacity="0.4"/>
      <ellipse cx="175" cy="85" rx="25" ry="9" fill="white" opacity="0.4"/>

      {/* ── BOY ── */}
      {/* shadow */}
      <ellipse cx="78" cy="148" rx="30" ry="8" fill="#7c5cbf" opacity="0.18"/>
      {/* body shirt blue */}
      <rect x="54" y="90" width="48" height="52" rx="14" fill="#8ec6f0"/>
      {/* collar */}
      <rect x="70" y="88" width="16" height="10" rx="5" fill="#a0d0f5"/>
      {/* pants */}
      <rect x="54" y="126" width="20" height="28" rx="8" fill="#6a8fd8"/>
      <rect x="78" y="126" width="20" height="28" rx="8" fill="#6a8fd8"/>
      {/* shoes */}
      <ellipse cx="64" cy="154" rx="13" ry="7" fill="#4a5fa8"/>
      <ellipse cx="88" cy="154" rx="13" ry="7" fill="#4a5fa8"/>
      {/* neck */}
      <rect x="68" y="80" width="20" height="16" rx="6" fill="#c8956a"/>
      {/* head */}
      <ellipse cx="78" cy="66" rx="26" ry="28" fill="#c8956a"/>
      {/* hair */}
      <ellipse cx="78" cy="44" rx="26" ry="13" fill="#2a1a0a"/>
      <ellipse cx="55" cy="58" rx="9" ry="13" fill="#2a1a0a"/>
      <ellipse cx="101" cy="58" rx="9" ry="13" fill="#2a1a0a"/>
      {/* ears */}
      <ellipse cx="52" cy="66" rx="5" ry="6" fill="#c8956a"/>
      <ellipse cx="104" cy="66" rx="5" ry="6" fill="#c8956a"/>
      {/* eyes whites */}
      <ellipse cx="70" cy="64" rx="5" ry="5.5" fill="white"/>
      <ellipse cx="86" cy="64" rx="5" ry="5.5" fill="white"/>
      {/* pupils */}
      <circle cx="71" cy="65" r="3" fill="#2a1a0a"/>
      <circle cx="87" cy="65" r="3" fill="#2a1a0a"/>
      {/* eye shine */}
      <circle cx="72" cy="63.5" r="1" fill="white"/>
      <circle cx="88" cy="63.5" r="1" fill="white"/>
      {/* smile */}
      <path d="M70 74 Q78 81 86 74" stroke="#7a4a20" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      {/* cheeks */}
      <ellipse cx="62" cy="72" rx="6" ry="4" fill="#e8a090" opacity="0.5"/>
      <ellipse cx="94" cy="72" rx="6" ry="4" fill="#e8a090" opacity="0.5"/>
      {/* arms */}
      <rect x="30" y="92" width="26" height="14" rx="7" fill="#8ec6f0" transform="rotate(-15 30 92)"/>
      <rect x="96" y="92" width="26" height="14" rx="7" fill="#8ec6f0" transform="rotate(15 122 92)"/>
      <ellipse cx="30" cy="108" rx="10" ry="9" fill="#c8956a"/>
      <ellipse cx="126" cy="108" rx="10" ry="9" fill="#c8956a"/>

      {/* ── GIRL ── */}
      {/* shadow */}
      <ellipse cx="152" cy="148" rx="30" ry="8" fill="#7c5cbf" opacity="0.18"/>
      {/* dress/overalls teal */}
      <rect x="128" y="92" width="48" height="54" rx="14" fill="#7ecfa8"/>
      <rect x="136" y="88" width="32" height="16" rx="6" fill="#6abf98"/>
      {/* straps */}
      <rect x="137" y="88" width="8" height="24" rx="4" fill="#5aaf88"/>
      <rect x="163" y="88" width="8" height="24" rx="4" fill="#5aaf88"/>
      {/* pants */}
      <rect x="128" y="128" width="20" height="26" rx="8" fill="#5aaf88"/>
      <rect x="152" y="128" width="20" height="26" rx="8" fill="#5aaf88"/>
      {/* shoes */}
      <ellipse cx="138" cy="154" rx="13" ry="7" fill="#3a8f68"/>
      <ellipse cx="162" cy="154" rx="13" ry="7" fill="#3a8f68"/>
      {/* neck */}
      <rect x="142" y="80" width="20" height="16" rx="6" fill="#d4a070"/>
      {/* head */}
      <ellipse cx="152" cy="65" rx="26" ry="28" fill="#d4a070"/>
      {/* hair brown braids */}
      <ellipse cx="152" cy="42" rx="26" ry="14" fill="#5a3010"/>
      <ellipse cx="130" cy="56" rx="9" ry="14" fill="#5a3010"/>
      <ellipse cx="174" cy="56" rx="9" ry="14" fill="#5a3010"/>
      {/* braids */}
      <rect x="126" y="68" width="10" height="60" rx="5" fill="#5a3010"/>
      <rect x="176" y="68" width="10" height="60" rx="5" fill="#5a3010"/>
      {/* braid ends */}
      <ellipse cx="131" cy="130" rx="6" ry="4" fill="#4a2000"/>
      <ellipse cx="181" cy="130" rx="6" ry="4" fill="#4a2000"/>
      {/* ears */}
      <ellipse cx="126" cy="65" rx="5" ry="6" fill="#d4a070"/>
      <ellipse cx="178" cy="65" rx="5" ry="6" fill="#d4a070"/>
      {/* eyes */}
      <ellipse cx="144" cy="63" rx="5" ry="5.5" fill="white"/>
      <ellipse cx="160" cy="63" rx="5" ry="5.5" fill="white"/>
      <circle cx="145" cy="64" r="3" fill="#2a1a0a"/>
      <circle cx="161" cy="64" r="3" fill="#2a1a0a"/>
      <circle cx="146" cy="62.5" r="1" fill="white"/>
      <circle cx="162" cy="62.5" r="1" fill="white"/>
      {/* smile */}
      <path d="M144 73 Q152 80 160 73" stroke="#8a5020" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      {/* cheeks */}
      <ellipse cx="136" cy="71" rx="6" ry="4" fill="#f0a0a0" opacity="0.5"/>
      <ellipse cx="168" cy="71" rx="6" ry="4" fill="#f0a0a0" opacity="0.5"/>
      {/* arms */}
      <rect x="104" y="94" width="26" height="14" rx="7" fill="#7ecfa8" transform="rotate(-15 104 94)"/>
      <rect x="170" y="94" width="26" height="14" rx="7" fill="#7ecfa8" transform="rotate(15 196 94)"/>
      <ellipse cx="104" cy="110" rx="10" ry="9" fill="#d4a070"/>
      <ellipse cx="200" cy="110" rx="10" ry="9" fill="#d4a070"/>

      {/* sparkles */}
      <text x="12" y="50" fontSize="16">✨</text>
      <text x="195" y="48" fontSize="14">⭐</text>
      <text x="100" y="28" fontSize="12">💜</text>
    </svg>
  );
}

/* ══════════════════════════════════════════
   HEADER  (shared top bar with characters)
══════════════════════════════════════════ */
function AppHeader({ title, subtitle, small }) {
  return (
    <div style={{
      background: `linear-gradient(180deg, #c8b4f0 0%, #d4c8f8 60%, transparent 100%)`,
      paddingTop: 20, paddingBottom: 0,
      display: "flex", flexDirection: "column", alignItems: "center",
      position: "relative",
    }}>
      {/* clouds */}
      <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
        {[
          {w:120,h:40,t:10,l:-20,op:0.5},
          {w:90,h:32,t:30,r:-10,op:0.4},
          {w:70,h:26,t:8,l:"40%",op:0.35},
        ].map((c,i)=>(
          <div key={i} style={{
            position:"absolute", borderRadius:"50%",
            width:c.w, height:c.h,
            background:"white", opacity:c.op,
            top:c.t, left:c.l, right:c.r,
          }}/>
        ))}
      </div>
      <Characters small={small}/>
      <div style={{
        background: `linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.92) 40%)`,
        width:"100%", paddingTop:8, paddingBottom:20,
        display:"flex", flexDirection:"column", alignItems:"center",
      }}>
        <h1 style={{
          ...gs.titleFont,
          fontSize: small ? 26 : 30,
          fontWeight: 900,
          color: C.textDark,
          lineHeight: 1.1,
          textAlign: "center",
        }}>{title}</h1>
        {subtitle && (
          <p style={{
            fontSize: 15, color: C.textMid, fontWeight: 600,
            marginTop: 4, textAlign: "center", paddingInline: 20,
          }}>{subtitle}</p>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SCREEN: ACCUEIL
══════════════════════════════════════════ */
const homeCards = [
  { id:"souffle", icon:"🫁", label:"Respirer",     sub:"Se calmer doucement",       bg:`linear-gradient(135deg,#d8eefb,#b8d8f5)`, border:"#90c0ee", textColor:"#2060a0" },
  { id:"emotions",icon:"😊",label:"Mes émotions",  sub:"Comprendre mes sentiments",  bg:`linear-gradient(135deg,#d8f5e8,#b8e8d0)`, border:"#80c8a8", textColor:"#206040" },
  { id:"calme",   icon:"🎧", label:"Sons calmes",   sub:"Écouter des sons relaxants", bg:`linear-gradient(135deg,#ead8f8,#d0b8f0)`, border:"#b090d8", textColor:"#5030a0" },
  { id:"missions",icon:"🏠", label:"Espace sûr",    sub:"Créer un endroit rassurant", bg:`linear-gradient(135deg,#fef0d0,#fde0b0)`, border:"#f0b860", textColor:"#805010" },
];

function HomeScreen({ onNav }) {
  const [pressed, setPressed] = useState(null);
  return (
    <div style={gs.screen}>
      <AppHeader title={"Bonjour 👋"} subtitle={"Comment te sens-tu aujourd'hui ?"}/>
      <div style={{
        flex:1, padding:"0 18px 100px",
        background:"linear-gradient(180deg,rgba(255,255,255,0.92) 0%,rgba(245,240,255,0.95) 100%)",
      }}>
        <div style={{
          display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, paddingTop:4,
        }}>
          {homeCards.map(card=>(
            <button key={card.id}
              onPointerDown={()=>setPressed(card.id)}
              onPointerUp={()=>{ setPressed(null); onNav(card.id); }}
              onPointerLeave={()=>setPressed(null)}
              style={{
                background: card.bg,
                border: `2.5px solid ${card.border}`,
                borderRadius: 22,
                padding: "22px 14px 18px",
                display:"flex", flexDirection:"column", alignItems:"center", gap:8,
                cursor:"pointer", transition:"transform 0.15s",
                transform: pressed===card.id ? "scale(0.93)" : "scale(1)",
                boxShadow: "0 6px 20px rgba(100,80,180,0.13)",
              }}>
              <span style={{fontSize:42}}>{card.icon}</span>
              <span style={{
                ...gs.titleFont, fontSize:17, fontWeight:800,
                color:card.textColor, lineHeight:1.1,
              }}>{card.label}</span>
              <span style={{fontSize:12,color:C.textLight,fontWeight:600,textAlign:"center"}}>
                {card.sub}
              </span>
            </button>
          ))}
        </div>
        {/* CTA */}
        <button
          onClick={()=>onNav("pause")}
          style={{
            width:"100%", marginTop:18,
            background:"linear-gradient(135deg,#f6c84e,#f0a830)",
            border:"none", borderRadius:22,
            padding:"18px 24px",
            display:"flex", alignItems:"center", justifyContent:"center", gap:12,
            cursor:"pointer", boxShadow:"0 8px 24px rgba(240,160,40,0.35)",
          }}>
          <span style={{fontSize:28}}>🛑</span>
          <div style={{textAlign:"left"}}>
            <div style={{...gs.titleFont,fontSize:18,fontWeight:800,color:"white"}}>Mode Pause</div>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.85)",fontWeight:600}}>Quand c'est trop fort</div>
          </div>
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   SCREEN: RESPIRER
══════════════════════════════════════════ */
function SouffleScreen({ onBack }) {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState("idle");
  const [cycles, setCycles] = useState(0);
  const [stars, setStars] = useState([false,false,false,false,false]);
  const timerRef = useRef(null);
  const phaseRef = useRef(0);

  const phases = [
    {label:"Inspire...", duration:4000, scale:1.45, color:"#90d0f8"},
    {label:"Retiens...", duration:1200, scale:1.45, color:"#a0d8f8"},
    {label:"Souffle...", duration:4000, scale:1,    color:"#c8b8f8"},
    {label:"...",        duration:800,  scale:1,    color:"#c8b8f8"},
  ];

  const runPhase = useCallback((idx, cycleCount) => {
    const p = phases[idx];
    setPhase(p);
    timerRef.current = setTimeout(()=>{
      const next = (idx+1) % phases.length;
      let newCycles = cycleCount;
      if(next===0){
        newCycles = cycleCount+1;
        setCycles(newCycles);
        setStars(prev=>{
          const s=[...prev]; if(newCycles<=5) s[newCycles-1]=true; return s;
        });
        if(newCycles>=5){ setRunning(false); setPhase("done"); return; }
      }
      runPhase(next, newCycles);
    }, p.duration);
  },[]);

  const start = ()=>{
    setRunning(true); setCycles(0); setStars([false,false,false,false,false]);
    phaseRef.current=0; runPhase(0,0);
  };
  const stop = ()=>{
    setRunning(false); clearTimeout(timerRef.current); setPhase("idle");
  };

  useEffect(()=>()=>clearTimeout(timerRef.current),[]);

  const circleScale = typeof phase==="object" ? phase.scale : 1;
  const circleColor = typeof phase==="object" ? phase.color : "#c8b8f8";
  const phaseLabel  = typeof phase==="object" ? phase.label
                    : phase==="done" ? "Bravo ! 💜" : "Prêt ?";

  /* dot indicators */
  const dots = Array(5).fill(0);

  return (
    <div style={{...gs.screen, background:`linear-gradient(160deg,#e8f4ff 0%,#f0e8ff 60%,#e0f0ff 100%)`}}>
      {/* TOP AREA */}
      <div style={{
        background:`linear-gradient(180deg,#d0e8fb 0%,#e8e0fb 60%,transparent 100%)`,
        paddingTop:20, paddingBottom:10,
        display:"flex",flexDirection:"column",alignItems:"center",
        position:"relative",
      }}>
        <button onClick={onBack} style={{
          position:"absolute",top:20,left:16,
          background:"rgba(255,255,255,0.7)",border:"none",borderRadius:"50%",
          width:42,height:42,fontSize:20,cursor:"pointer",
          display:"flex",alignItems:"center",justifyContent:"center",
          boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
        }}>←</button>
        <h1 style={{...gs.titleFont,fontSize:30,fontWeight:900,color:C.textDark}}>Respirer</h1>
        <p style={{fontSize:14,color:C.textMid,fontWeight:600,marginTop:4,textAlign:"center"}}>
          Inspire à fond...<br/>et souffle doucement.
        </p>
      </div>

      {/* BUBBLE CONTAINER */}
      <div style={{
        flex:1,display:"flex",flexDirection:"column",
        alignItems:"center",justifyContent:"center",gap:30,
        padding:"20px 24px",
      }}>
        {/* THE BUBBLE */}
        <div style={{
          position:"relative",
          width:260,height:260,
          background:`linear-gradient(145deg,#d8f0ff,#c0d8ff)`,
          borderRadius:32,
          boxShadow:"inset 0 4px 20px rgba(255,255,255,0.8), 0 8px 32px rgba(100,160,240,0.25)",
          display:"flex",alignItems:"center",justifyContent:"center",
          overflow:"hidden",
        }}>
          {/* water fill */}
          <div style={{
            position:"absolute",bottom:0,left:0,right:0,
            height:`${50 + (circleScale-1)*60}%`,
            background:`linear-gradient(180deg,rgba(100,180,240,0.5),rgba(80,140,220,0.7))`,
            transition:"height 4s cubic-bezier(0.4,0,0.2,1)",
            borderRadius:"0 0 28px 28px",
          }}/>
          {/* bubbles */}
          {running && [0,1,2].map(i=>(
            <div key={i} style={{
              position:"absolute",
              width:8+i*4,height:8+i*4,
              borderRadius:"50%",
              background:"rgba(255,255,255,0.6)",
              bottom: 20+i*30,
              left: 40+i*60,
              animation:`float${i} ${2+i}s ease-in-out infinite`,
            }}/>
          ))}
          {/* sparkles */}
          {["✦","✦","⋆"].map((s,i)=>(
            <span key={i} style={{
              position:"absolute",
              top:[20,40,10][i], left:[200,20,130][i],
              color:"#f0d060",fontSize:[18,14,12][i],
              opacity:0.8,
            }}>{s}</span>
          ))}
          {/* labels */}
          <div style={{
            position:"relative",zIndex:2,
            display:"flex",flexDirection:"column",alignItems:"center",gap:6,
          }}>
            <span style={{...gs.titleFont,fontSize:28,fontWeight:800,color:"#2060a0",textShadow:"0 2px 8px rgba(255,255,255,0.8)"}}>
              {phaseLabel}
            </span>
            {typeof phase==="object" && phase.label!=="..." && (
              <span style={{...gs.titleFont,fontSize:22,fontWeight:700,color:"rgba(80,130,200,0.7)"}}>
                {phase.label==="Inspire..." ? "Souffle..." : "Inspire..."}
              </span>
            )}
          </div>
        </div>

        {/* dot indicators */}
        <div style={{display:"flex",gap:8}}>
          {dots.map((_,i)=>(
            <div key={i} style={{
              width:i===0?22:10,height:10,
              borderRadius:6,
              background: stars[i] ? C.purple : "rgba(124,92,191,0.2)",
              transition:"background 0.3s, width 0.3s",
            }}/>
          ))}
        </div>

        {/* stars */}
        <div style={{display:"flex",gap:8}}>
          {stars.map((lit,i)=>(
            <span key={i} style={{
              fontSize:24,
              opacity: lit ? 1 : 0.25,
              transform: lit ? "scale(1)" : "scale(0.7)",
              transition:"all 0.4s",
            }}>⭐</span>
          ))}
        </div>

        {/* CTA BUTTON */}
        <button
          onClick={running ? stop : start}
          style={{
            background:"linear-gradient(135deg,#f6c84e,#f0a830)",
            border:"none",borderRadius:50,
            padding:"18px 60px",
            color:"white",fontFamily:"'Baloo 2',cursive",
            fontSize:20,fontWeight:800,
            cursor:"pointer",
            boxShadow:"0 8px 24px rgba(240,160,40,0.4)",
            transform:"translateY(0)",
            transition:"transform 0.15s",
          }}
          onPointerDown={e=>e.currentTarget.style.transform="scale(0.95)"}
          onPointerUp={e=>e.currentTarget.style.transform="scale(1)"}
        >
          {running ? "Arrêter" : "Commencer !"}
        </button>
      </div>

      <style>{`
        @keyframes float0 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes float1 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-30px)} }
        @keyframes float2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-25px)} }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════
   SCREEN: MES ÉMOTIONS
══════════════════════════════════════════ */
const emotionCards = [
  { id:"joie",      face:"😄", label:"Heureux",     sub:"Être content",                  bg:"#fff5cc", border:"#f6c84e", tc:"#806000" },
  { id:"calme",     face:"😌", label:"Calme",        sub:"Écouter apporte du calme",       bg:"#d4f5e8", border:"#6ec898", tc:"#205040" },
  { id:"tristesse", face:"😢", label:"Triste",       sub:"Écouter des sons relaxants",     bg:"#d8e8f8", border:"#80b0e0", tc:"#203060" },
  { id:"colere",    face:"😠", label:"En colère",    sub:"Créer un espace calme",          bg:"#fde8e0", border:"#f09070", tc:"#802010" },
  { id:"peur",      face:"😨", label:"J'ai peur",    sub:"Aller dans mon refuge",          bg:"#ead8f8", border:"#c098e8", tc:"#500080" },
  { id:"deborde",   face:"🤯", label:"Débordé",      sub:"Mode pause maintenant",          bg:"#ffeedd", border:"#f0b070", tc:"#804010" },
];

const emotionActions = {
  joie:      { msg:"Super ! Tu te sens bien 🌟 Tu veux faire une mission ?",       btn:"Mes missions ⭐", nav:"missions" },
  calme:     { msg:"Tu es calme. C'est parfait 💚 Écoute quelque chose de doux ?", btn:"Sons calmes 🎧",  nav:"calme" },
  tristesse: { msg:"C'est normal d'être triste. Tu n'es pas seul 💙",             btn:"Me calmer 🎧",   nav:"calme" },
  colere:    { msg:"Respirons ensemble d'abord. Tu peux le faire 💪",              btn:"Respirer 🌬️",    nav:"souffle" },
  peur:      { msg:"Tu es en sécurité ici. Rien ne peut te faire de mal 💜",       btn:"Mode Pause 🛑",  nav:"pause" },
  deborde:   { msg:"C'est trop en ce moment. On va dans ton espace calme.",        btn:"Mode Pause 🛑",  nav:"pause" },
};

function EmotionsScreen({ onBack, onNav }) {
  const [selected, setSelected] = useState(null);

  return (
    <div style={{...gs.screen,background:`linear-gradient(160deg,#fef8ee 0%,#f8f0ff 100%)`}}>
      <AppHeader title="Mes émotions" subtitle="Comment te sens-tu aujourd'hui ?" small/>

      <div style={{
        flex:1,padding:"0 16px 100px",
        background:"linear-gradient(180deg,rgba(255,255,255,0.9) 0%,rgba(250,245,255,0.95) 100%)",
      }}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,paddingTop:8}}>
          {emotionCards.map(e=>(
            <button key={e.id}
              onClick={()=>setSelected(selected===e.id ? null : e.id)}
              style={{
                background: e.bg,
                border:`2.5px solid ${selected===e.id ? C.purple : e.border}`,
                borderRadius:20,
                padding:"18px 10px 14px",
                display:"flex",flexDirection:"column",alignItems:"center",gap:8,
                cursor:"pointer",
                boxShadow: selected===e.id
                  ? `0 6px 20px rgba(124,92,191,0.3)`
                  : "0 4px 14px rgba(0,0,0,0.07)",
                transform: selected===e.id ? "scale(0.97)" : "scale(1)",
                transition:"all 0.2s",
              }}>
              <span style={{fontSize:46}}>{e.face}</span>
              <span style={{...gs.titleFont,fontSize:17,fontWeight:800,color:e.tc}}>{e.label}</span>
              <span style={{fontSize:11,color:C.textLight,fontWeight:600,textAlign:"center"}}>{e.sub}</span>
            </button>
          ))}
        </div>

        {/* Response card */}
        {selected && (
          <div style={{
            marginTop:16,
            background:"white",
            borderRadius:20,
            padding:"18px 20px",
            boxShadow:"0 6px 24px rgba(124,92,191,0.15)",
            borderLeft:`5px solid ${C.purple}`,
            animation:"slideUp 0.3s ease",
          }}>
            <p style={{fontSize:15,fontWeight:700,color:C.textDark,lineHeight:1.5,marginBottom:14}}>
              {emotionActions[selected]?.msg}
            </p>
            <button
              onClick={()=>onNav(emotionActions[selected].nav)}
              style={{
                background:`linear-gradient(135deg,${C.purple},${C.purpleLight})`,
                border:"none",borderRadius:16,
                padding:"14px 24px",
                color:"white",fontFamily:"'Baloo 2',cursive",
                fontSize:16,fontWeight:800,cursor:"pointer",
              }}>
              {emotionActions[selected].btn}
            </button>
          </div>
        )}

        {/* bottom CTA */}
        <button
          onClick={()=>onBack()}
          style={{
            width:"100%",marginTop:16,
            background:"linear-gradient(135deg,#f6c84e,#f0a830)",
            border:"none",borderRadius:22,padding:"17px",
            color:"white",fontFamily:"'Baloo 2',cursive",
            fontSize:18,fontWeight:800,cursor:"pointer",
            boxShadow:"0 8px 24px rgba(240,160,40,0.35)",
          }}>
          C'est parti !
        </button>
      </div>

      <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}

/* ══════════════════════════════════════════
   SCREEN: SONS CALMES
══════════════════════════════════════════ */
const soundScenes = [
  {
    id:"ocean",
    label:"Sous l'océan",
    bg:`linear-gradient(160deg,#a0d8f8 0%,#60b0e8 40%,#4090d0 70%,#3060a0 100%)`,
    deco:["🐠","🐡","🐟","🌊","🐚","🦋"],
    colors:["#f0c060","#e08040","#60c0e0","#3080c0","#f0e0b0","#a0d0f0"],
  },
  {
    id:"foret",
    label:"Douce pluie",
    bg:`linear-gradient(160deg,#a0e0c0 0%,#70c898 40%,#50a870 70%,#308050 100%)`,
    deco:["🌿","🍃","🌺","🌸","🦋","⭐"],
    colors:["#80d080","#50b060","#f0c0e0","#f0a0c0","#a0d060","#f0f0a0"],
  },
  {
    id:"piano",
    label:"Piano doux",
    bg:`linear-gradient(160deg,#e8d8f8 0%,#c8b0e8 40%,#a890d0 70%,#8870b8 100%)`,
    deco:["🎵","🎶","🎼","🌙","⭐","✨"],
    colors:["#f0c0e8","#d0a0d8","#e8e0f8","#c8b8f0","#f0f0d8","#e8d0f8"],
  },
  {
    id:"vagues",
    label:"Vagues calmes",
    bg:`linear-gradient(160deg,#b8e8f8 0%,#80c8e8 40%,#60a8d0 70%,#4080b0 100%)`,
    deco:["🌊","🏖️","🐚","☀️","🦅","⛵"],
    colors:["#f0f0a0","#f0d080","#f0e8d0","#e0f0f8","#a0d8f8","#d0e8f8"],
  },
];

function CalmeScreen({ onBack }) {
  const [playing, setPlaying] = useState(null);
  const audioRef = useRef(null);
  const oscRef   = useRef([]);

  const stopAll = () => {
    oscRef.current.forEach(n=>{ try{n.stop()}catch(e){} });
    oscRef.current = [];
    if(audioRef.current){ try{audioRef.current.close()}catch(e){} audioRef.current=null; }
    setPlaying(null);
  };

  const playScene = (id) => {
    if(playing===id){ stopAll(); return; }
    stopAll();
    setPlaying(id);
    try {
      const ctx = new (window.AudioContext||window.webkitAudioContext)();
      audioRef.current = ctx;
      const master = ctx.createGain(); master.gain.value=0.12; master.connect(ctx.destination);
      if(id==="ocean"||id==="vagues"){
        const buf=ctx.createBuffer(1,ctx.sampleRate*4,ctx.sampleRate);
        const d=buf.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*0.5;
        const s=ctx.createBufferSource(); s.buffer=buf; s.loop=true;
        const f=ctx.createBiquadFilter(); f.type="lowpass"; f.frequency.value=350;
        const lfo=ctx.createOscillator(); lfo.frequency.value=0.1;
        const lg=ctx.createGain(); lg.gain.value=0.1;
        lfo.connect(lg); lg.connect(master.gain);
        s.connect(f); f.connect(master); s.start(); lfo.start();
        oscRef.current=[s,lfo];
      } else if(id==="foret"){
        for(let i=0;i<5;i++){
          const buf=ctx.createBuffer(1,ctx.sampleRate*2,ctx.sampleRate);
          const d=buf.getChannelData(0); for(let j=0;j<d.length;j++) d[j]=(Math.random()*2-1)*0.35;
          const s=ctx.createBufferSource(); s.buffer=buf; s.loop=true; s.loopStart=Math.random();
          const f=ctx.createBiquadFilter(); f.type="bandpass"; f.frequency.value=600+Math.random()*3000; f.Q.value=0.4;
          const g=ctx.createGain(); g.gain.value=0.04+Math.random()*0.08;
          s.connect(f); f.connect(g); g.connect(master); s.start(ctx.currentTime+i*0.1);
          oscRef.current.push(s);
        }
      } else if(id==="piano"){
        const notes=[261.63,293.66,329.63,392,440,523.25];
        const seq=[0,2,4,2,1,3,4,1,0,2,5,3];
        let t=ctx.currentTime;
        const loop=()=>{
          seq.forEach((n,i)=>{
            const o=ctx.createOscillator(),e=ctx.createGain();
            o.type="sine"; o.frequency.value=notes[n]*0.5;
            e.gain.setValueAtTime(0,t+i*1.1);
            e.gain.linearRampToValueAtTime(0.2,t+i*1.1+0.05);
            e.gain.exponentialRampToValueAtTime(0.001,t+i*1.1+2.2);
            o.connect(e); e.connect(master); o.start(t+i*1.1); o.stop(t+i*1.1+2.5);
            oscRef.current.push(o);
          });
          t+=seq.length*1.1;
          if(playing===id||oscRef.current.length>0) setTimeout(loop,(seq.length*1.1-0.5)*1000);
        };
        loop();
      }
    } catch(e){ console.log(e); }
  };

  useEffect(()=>()=>stopAll(),[]);

  const scene = soundScenes.find(s=>s.id===playing);

  return (
    <div style={{...gs.screen,background:`linear-gradient(160deg,#e0f4ff 0%,#eef8ff 50%,#f0fff8 100%)`}}>
      <AppHeader title="Sons calmes" subtitle="Choisis un son apaisant pour te détendre" small/>

      <div style={{
        flex:1,padding:"0 16px 100px",
        background:"linear-gradient(180deg,rgba(255,255,255,0.9) 0%,rgba(245,252,255,0.95) 100%)",
      }}>
        {soundScenes.map(s=>(
          <button key={s.id}
            onClick={()=>playScene(s.id)}
            style={{
              width:"100%",
              borderRadius:22,
              border: playing===s.id ? `3px solid ${C.purple}` : "3px solid transparent",
              marginBottom:14,
              overflow:"hidden",
              cursor:"pointer",
              boxShadow: playing===s.id
                ? "0 8px 28px rgba(124,92,191,0.3)"
                : "0 4px 16px rgba(0,0,0,0.1)",
              transform: playing===s.id ? "scale(0.98)" : "scale(1)",
              transition:"all 0.2s",
              padding:0,
            }}>
            {/* scene illustration */}
            <div style={{
              background:s.bg,
              height:90,
              position:"relative",
              overflow:"hidden",
              display:"flex",alignItems:"flex-end",
            }}>
              {/* floating deco */}
              {s.deco.map((d,i)=>(
                <span key={i} style={{
                  position:"absolute",
                  fontSize:[28,22,26,20,24,18][i],
                  color:s.colors[i],
                  left:`${8+i*16}%`,
                  top:`${10+[30,50,20,60,10,40][i]}%`,
                  animation:`floatDeco ${2+i*0.5}s ease-in-out infinite`,
                  animationDelay:`${i*0.3}s`,
                }}>{d}</span>
              ))}
              {/* label pill */}
              <div style={{
                position:"absolute",bottom:12,left:"50%",transform:"translateX(-50%)",
                background:"rgba(255,255,255,0.9)",
                borderRadius:20,padding:"6px 18px",
                fontFamily:"'Baloo 2',cursive",
                fontSize:15,fontWeight:800,color:C.textDark,
                whiteSpace:"nowrap",
                boxShadow:"0 2px 8px rgba(0,0,0,0.1)",
              }}>
                {playing===s.id ? "⏸ " : "▶ "}{s.label}
              </div>
            </div>
          </button>
        ))}

        <button
          onClick={onBack}
          style={{
            width:"100%",marginTop:4,
            background:"linear-gradient(135deg,#f6c84e,#f0a830)",
            border:"none",borderRadius:22,padding:"17px",
            color:"white",fontFamily:"'Baloo 2',cursive",
            fontSize:18,fontWeight:800,cursor:"pointer",
            boxShadow:"0 8px 24px rgba(240,160,40,0.35)",
          }}>
          C'est parti !
        </button>
      </div>

      <style>{`
        @keyframes floatDeco {
          0%,100%{transform:translateY(0) rotate(0deg)}
          50%{transform:translateY(-10px) rotate(5deg)}
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════
   SCREEN: MISSIONS
══════════════════════════════════════════ */
const allMissions = {
  corps:[
    {id:"c1",icon:"🌬️",title:"Respire comme un champion",desc:"Apprends à respirer lentement.",steps:["Mets ta main sur ton ventre","Inspire lentement 4 secondes","Expire lentement 4 secondes","Fais-le 5 fois de suite"]},
    {id:"c2",icon:"✊",title:"Les poings magiques",desc:"Serre fort puis relâche.",steps:["Serre tes deux poings très fort","Compte jusqu'à 5","Relâche d'un coup","Sens tes mains devenir légères"]},
    {id:"c3",icon:"👣",title:"Sentir le sol",desc:"Pose tes pieds et ressens ton corps.",steps:["Assieds-toi bien droit","Pose tes deux pieds à plat","Appuie fort avec les talons","Dis 'Je suis là, en sécurité'"]},
    {id:"c4",icon:"💧",title:"L'eau fraîche",desc:"Boire lentement calme le corps.",steps:["Va chercher un verre d'eau","Bois une petite gorgée","Attends 3 secondes","Bois encore, tout doucement"]},
  ],
  espace:[
    {id:"e1",icon:"🎧",title:"Mon casque magique",desc:"Le casque te protège du bruit.",steps:["Repère où est ton casque","Mets-le sur tes oreilles","Ferme les yeux une seconde","Le bruit devient plus petit"]},
    {id:"e2",icon:"🏠",title:"Mon coin calme",desc:"Ton endroit sûr quand c'est trop.",steps:["Trouve ton coin préféré","Vas t'y asseoir","Prends ton objet doudou","Reste là jusqu'à te sentir mieux"]},
    {id:"e3",icon:"💡",title:"La lumière douce",desc:"Baisser la lumière aide le cerveau.",steps:["Ferme les yeux si la lumière fait mal","Va dans une pièce plus sombre","Tu peux mettre tes mains sur les yeux","La lumière douce aide à calmer"]},
    {id:"e4",icon:"🧸",title:"Mon objet doudou",desc:"Tenir quelque chose de doux aide.",steps:["Prends ton objet préféré","Tiens-le dans ta main","Serre-le doucement","Sens sa texture avec tes doigts"]},
  ],
  lien:[
    {id:"l1",icon:"🃏",title:"Ma carte 'J'ai besoin d'aide'",desc:"Montrer une carte, c'est courageux.",steps:["Prends ta carte","Montre-la à l'adulte de confiance","Tu n'as pas besoin de parler","L'adulte comprendra"]},
    {id:"l2",icon:"👥",title:"Mes adultes de confiance",desc:"Certains adultes sont toujours là.",steps:["Pense à 2 adultes gentils avec toi","Mémorise leur prénom","Tu peux aller les voir","Ils ne te jugeront pas"]},
    {id:"l3",icon:"💬",title:"Dire 'Je ne suis pas bien'",desc:"Exprimer sans mots, c'est possible.",steps:["Montre l'image de ton émotion","Ou mets ta main sur ton cœur","Ou donne la main à l'adulte","C'est suffisant"]},
    {id:"l4",icon:"🤫",title:"Attendre ensemble en silence",desc:"La présence calme aide.",steps:["Assieds-toi à côté de l'adulte","Tu n'as pas besoin de parler","L'adulte reste calme","Ça aide le cerveau à se calmer"]},
  ],
};

const tabConfig = [
  {id:"corps", label:"💪 Mon Corps",  color:"#7ecfa8", light:"#d4f2e5"},
  {id:"espace",label:"🏠 Mon Espace", color:"#6ab0e8", light:"#d6edfb"},
  {id:"lien",  label:"🤝 Mon Lien",   color:"#f4967a", light:"#fde0d5"},
];

function MissionsScreen({ onBack }) {
  const [tab, setTab] = useState("corps");
  const [progress, setProgress] = useState(()=>JSON.parse(localStorage.getItem("mProg")||"{}"));
  const [detail, setDetail] = useState(null);

  const save = (id) => {
    const p = {...progress,[id]:"done"};
    setProgress(p); localStorage.setItem("mProg",JSON.stringify(p));
    setDetail(null);
  };

  const tc = tabConfig.find(t=>t.id===tab);

  return (
    <div style={{...gs.screen,background:`linear-gradient(160deg,#f0fff4 0%,#f8ffee 100%)`}}>
      <AppHeader title="⭐ Mes Missions" subtitle="Apprends tes super pouvoirs" small/>

      <div style={{
        flex:1,padding:"0 16px 100px",
        background:"linear-gradient(180deg,rgba(255,255,255,0.9) 0%,rgba(248,255,245,0.95) 100%)",
      }}>
        {/* tabs */}
        <div style={{display:"flex",gap:8,marginBottom:16,paddingTop:4,overflowX:"auto",scrollbarWidth:"none"}}>
          {tabConfig.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{
              background: tab===t.id ? t.color : "rgba(255,255,255,0.8)",
              color: tab===t.id ? "white" : C.textMid,
              border: `2px solid ${tab===t.id ? t.color : "rgba(0,0,0,0.08)"}`,
              borderRadius:14,padding:"10px 16px",
              fontFamily:"'Nunito',sans-serif",
              fontSize:13,fontWeight:800,cursor:"pointer",
              whiteSpace:"nowrap",transition:"all 0.2s",
              boxShadow: tab===t.id ? `0 4px 14px ${t.color}60` : "none",
            }}>{t.label}</button>
          ))}
        </div>

        {/* mission cards */}
        {allMissions[tab].map((m,i)=>{
          const done=progress[m.id]==="done";
          return (
            <button key={m.id} onClick={()=>setDetail({...m,tabColor:tc.color,tabLight:tc.light})} style={{
              width:"100%",marginBottom:12,
              background: done
                ? `linear-gradient(135deg,${tc.light},${tc.light})`
                : "white",
              border: `2.5px solid ${done ? tc.color : "rgba(0,0,0,0.07)"}`,
              borderRadius:20,padding:"16px 18px",
              display:"flex",alignItems:"center",gap:14,
              cursor:"pointer",
              boxShadow:"0 4px 16px rgba(0,0,0,0.07)",
              transition:"all 0.2s",
              textAlign:"left",
            }}>
              <span style={{fontSize:36,flexShrink:0}}>{m.icon}</span>
              <div style={{flex:1}}>
                <div style={{fontFamily:"'Baloo 2',cursive",fontSize:15,fontWeight:800,color:C.textDark,marginBottom:2}}>
                  {m.title}
                </div>
                <div style={{fontSize:12,color:C.textLight,fontWeight:600}}>{m.desc}</div>
              </div>
              <span style={{fontSize:22,flexShrink:0}}>{done ? "⭐" : "○"}</span>
            </button>
          );
        })}
      </div>

      {/* DETAIL MODAL */}
      {detail && (
        <div
          onClick={e=>{ if(e.target===e.currentTarget) setDetail(null); }}
          style={{
            position:"fixed",inset:0,
            background:"rgba(45,37,64,0.55)",
            display:"flex",alignItems:"flex-end",
            backdropFilter:"blur(6px)",
            zIndex:200,
          }}>
          <div style={{
            background:"white",
            borderRadius:"28px 28px 0 0",
            padding:"28px 24px 48px",
            width:"100%",maxWidth:420,margin:"0 auto",
            animation:"slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1)",
            position:"relative",
          }}>
            <button onClick={()=>setDetail(null)} style={{
              position:"absolute",top:16,right:16,
              background:"#f0eef8",border:"none",borderRadius:"50%",
              width:36,height:36,fontSize:16,cursor:"pointer",
              display:"flex",alignItems:"center",justifyContent:"center",
            }}>✕</button>
            <div style={{fontSize:52,marginBottom:12}}>{detail.icon}</div>
            <h2 style={{...gs.titleFont,fontSize:22,fontWeight:900,color:C.textDark,marginBottom:8}}>
              {detail.title}
            </h2>
            <p style={{fontSize:14,color:C.textMid,fontWeight:600,lineHeight:1.6,marginBottom:20}}>
              {detail.desc}
            </p>
            <div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:24}}>
              {detail.steps.map((s,i)=>(
                <div key={i} style={{
                  display:"flex",alignItems:"center",gap:12,
                  background:"#f5f0ff",borderRadius:14,padding:"12px 16px",
                }}>
                  <div style={{
                    width:30,height:30,borderRadius:"50%",
                    background:detail.tabColor,color:"white",
                    fontWeight:800,fontSize:14,
                    display:"flex",alignItems:"center",justifyContent:"center",
                    flexShrink:0,
                  }}>{i+1}</div>
                  <span style={{fontSize:14,fontWeight:700,color:C.textDark}}>{s}</span>
                </div>
              ))}
            </div>
            <button onClick={()=>save(detail.id)} style={{
              width:"100%",
              background:`linear-gradient(135deg,${detail.tabColor},${detail.tabColor}dd)`,
              border:"none",borderRadius:18,padding:"18px",
              color:"white",fontFamily:"'Baloo 2',cursive",
              fontSize:18,fontWeight:800,cursor:"pointer",
              boxShadow:`0 8px 24px ${detail.tabColor}60`,
            }}>
              ✅ J'ai fait cette mission !
            </button>
          </div>
          <style>{`@keyframes slideUp{from{opacity:0;transform:translateY(40px)}to{opacity:1;transform:translateY(0)}}`}</style>
        </div>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════
   SCREEN: MODE PAUSE
══════════════════════════════════════════ */
function PauseScreen({ onExit }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const lines = ["Tu es en sécurité. 💜","Tu n'as rien à faire.","Reste là. C'est calme. 🌙"];

  useEffect(()=>{
    setVisibleLines(0);
    const timers = lines.map((_,i)=>setTimeout(()=>setVisibleLines(v=>v+1),(i+1)*3200));
    return ()=>timers.forEach(clearTimeout);
  },[]);

  return (
    <div style={{
      ...gs.screen,
      background:`linear-gradient(160deg,#1a1035 0%,#221545 50%,#1a2040 100%)`,
      alignItems:"center",justifyContent:"center",gap:36,
      padding:"60px 24px 40px",
    }}>
      <button onClick={onExit} style={{
        position:"absolute",top:20,right:20,
        background:"rgba(255,255,255,0.1)",
        border:"2px solid rgba(255,255,255,0.2)",
        borderRadius:"50%",width:48,height:48,
        color:"rgba(255,255,255,0.7)",fontSize:18,
        cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",
      }}>✕</button>

      {/* ORB */}
      <div style={{position:"relative",width:240,height:240,display:"flex",alignItems:"center",justifyContent:"center"}}>
        {[240,190,140].map((sz,i)=>(
          <div key={i} style={{
            position:"absolute",
            width:sz,height:sz,borderRadius:"50%",
            border:`2px solid rgba(139,127,240,${0.15+i*0.05})`,
            background: i===2 ? "rgba(139,127,240,0.07)" : "transparent",
            animation:`pauseRing ${3+i}s ease-in-out infinite`,
            animationDelay:`${i*0.4}s`,
          }}/>
        ))}
        <div style={{
          width:110,height:110,borderRadius:"50%",
          background:"radial-gradient(circle at 38% 35%,#c4bef8,#6a5fc4)",
          boxShadow:"0 0 80px rgba(139,127,240,0.5)",
          animation:"pauseOrb 4s ease-in-out infinite",
          zIndex:2,
        }}/>
      </div>

      {/* MESSAGES */}
      <div style={{textAlign:"center",display:"flex",flexDirection:"column",gap:10}}>
        {lines.map((line,i)=>(
          <p key={i} style={{
            fontFamily:"'Baloo 2',cursive",
            fontSize:22,fontWeight:700,
            color:"rgba(255,255,255,0.9)",
            opacity: i < visibleLines ? 1 : 0,
            transform: i < visibleLines ? "translateY(0)" : "translateY(10px)",
            transition:"all 1s ease",
          }}>{line}</p>
        ))}
      </div>

      {/* DOUDOU */}
      <div style={{
        fontSize:52,opacity:0.65,
        animation:"pauseOrb 4s ease-in-out infinite 1s",
      }}>🧸</div>

      <style>{`
        @keyframes pauseRing{0%,100%{transform:scale(1);opacity:0.4}50%{transform:scale(1.06);opacity:0.9}}
        @keyframes pauseOrb{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════
   TOAST
══════════════════════════════════════════ */
function Toast({ msg }) {
  return msg ? (
    <div style={{
      position:"fixed",bottom:110,left:"50%",transform:"translateX(-50%)",
      background:C.purple,color:"white",borderRadius:20,
      padding:"13px 24px",fontSize:15,fontWeight:700,
      boxShadow:"0 6px 24px rgba(124,92,191,0.4)",
      whiteSpace:"nowrap",zIndex:9999,
      animation:"toastIn 0.3s ease",
      pointerEvents:"none",
    }}>
      {msg}
      <style>{`@keyframes toastIn{from{opacity:0;transform:translateX(-50%) translateY(10px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`}</style>
    </div>
  ) : null;
}

/* ══════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════ */
export default function App() {
  const [screen, setScreen] = useState("home");
  const [toast, setToast]   = useState(null);

  const goTo = (s) => setScreen(s);
  const showToast = (msg) => {
    setToast(msg); setTimeout(()=>setToast(null),3000);
  };

  const renderScreen = () => {
    switch(screen){
      case "home":     return <HomeScreen onNav={goTo}/>;
      case "souffle":  return <SouffleScreen onBack={()=>goTo("home")}/>;
      case "emotions": return <EmotionsScreen onBack={()=>goTo("home")} onNav={goTo}/>;
      case "calme":    return <CalmeScreen onBack={()=>goTo("home")}/>;
      case "missions": return <MissionsScreen onBack={()=>goTo("home")}/>;
      case "pause":    return <PauseScreen onExit={()=>goTo("emotions")}/>;
      default:         return <HomeScreen onNav={goTo}/>;
    }
  };

  return (
    <>
      <FontLoader/>
      <div style={gs.app}>
        {renderScreen()}

        {/* GLOBAL PAUSE FAB */}
        {screen !== "pause" && (
          <button onClick={()=>goTo("pause")} style={{
            position:"fixed",
            bottom:28,right:"calc(50% - 210px + 16px)",
            width:58,height:58,borderRadius:"50%",
            background:`linear-gradient(135deg,${C.purple},${C.purpleLight})`,
            border:"none",cursor:"pointer",
            display:"flex",alignItems:"center",justifyContent:"center",
            fontSize:24,
            boxShadow:"0 6px 24px rgba(124,92,191,0.5)",
            animation:"fabPulse 3s ease-in-out infinite",
            zIndex:500,
          }}>🛑</button>
        )}

        <Toast msg={toast}/>
      </div>

      <style>{`
        @keyframes fabPulse{0%,100%{box-shadow:0 6px 24px rgba(124,92,191,0.45)}50%{box-shadow:0 6px 36px rgba(124,92,191,0.75)}}
      `}</style>
    </>
  );
}
