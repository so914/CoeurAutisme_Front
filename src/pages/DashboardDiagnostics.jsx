import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopHeader from '../components/Topheader';
import { MdAssignment } from "react-icons/md";
import { LuHistory } from "react-icons/lu";


const MOCK_DIAGNOSTICS = [
  {
    id: "diag-001",
    userName: "Sophia Ibaranaide",
    userEmail: "ibaranaidesophia@gmail.com",
    profileType: "parent_child",
    profileLabel: "Parent",
    startedAt: "2026-03-10T09:14:00",
    completedAt: "2026-03-10T09:52:00",
    status: "completed",
    score: 72,
    stepScores: { 1: 80, 2: 70, 3: 65, 4: 75 },
    answers: {
      step1_question0: "Oui, souvent",
      step1_question1: "Non",
      step2_question0: "Parfois",
    },
    flagged: false,
  },
  {
    id: "diag-002",
    userName: "Junior Ty",
    userEmail: "juniorty@gmail.com",
    profileType: "specialist_obs",
    profileLabel: "Spécialiste",
    startedAt: "2026-03-15T14:00:00",
    completedAt: null,
    status: "in_progress",
    score: null,
    stepScores: { 1: 60, 2: null, 3: null, 4: null },
    answers: { step1_question0: "Présent", step1_question2: "Absent" },
    flagged: true,
  },
  {
    id: "diag-003",
    userName: "Elda M.",
    userEmail: "elda@gmail.com",
    profileType: "true",
    profileLabel: "Adulte",
    startedAt: "2026-03-18T11:30:00",
    completedAt: null,
    status: "abandoned",
    score: null,
    stepScores: { 1: null, 2: null, 3: null, 4: null },
    answers: {},
    flagged: false,
  },
  {
    id: "diag-004",
    userName: "Marie Kondo",
    userEmail: "marie.k@gmail.com",
    profileType: "parent_child",
    profileLabel: "Parent",
    startedAt: "2026-03-20T08:00:00",
    completedAt: "2026-03-20T08:45:00",
    status: "completed",
    score: 88,
    stepScores: { 1: 90, 2: 85, 3: 88, 4: 90 },
    answers: {},
    flagged: false,
  },
  {
    id: "diag-005",
    userName: "Paul Bemba",
    userEmail: "paul.b@gmail.com",
    profileType: "true",
    profileLabel: "Adulte",
    startedAt: "2026-03-21T16:20:00",
    completedAt: "2026-03-21T17:05:00",
    status: "completed",
    score: 41,
    stepScores: { 1: 40, 2: 45, 3: 38, 4: 42 },
    answers: {},
    flagged: true,
  },
];

const STEP_NAMES = {
  parent_child:    { 1: "Interaction & Réciprocité", 2: "Communication Sociale", 3: "Patterns & Comportements", 4: "Sensorialité & Adaptation" },
  specialist_obs:  { 1: "Communication Verbale",     2: "Signes Non-Verbaux",    3: "Comportements Restreints", 4: "Profil Neuro-Sensoriel" },
  true:            { 1: "Interaction & Réciprocité", 2: "Communication Sociale", 3: "Rigidité & Routine",       4: "Sensorialité & Détails" },
};

const STATUS_CONFIG = {
  completed:   { label: "Terminé",     color: "#10b981", bg: "rgba(16,185,129,.12)" },
  in_progress: { label: "En cours",    color: "#f59e0b", bg: "rgba(245,158,11,.12)" },
  abandoned:   { label: "Abandonné",   color: "#ef4444", bg: "rgba(239,68,68,.12)"  },
};

const scoreColor = (s) => {
  if (s === null) return "#94a3b8";
  if (s >= 70) return "#ef4444";
  if (s >= 50) return "#f59e0b";
  return "#10b981";
};

const scoreLabel = (s) => {
  if (s === null) return "—";
  if (s >= 70) return "Élevé";
  if (s >= 50) return "Modéré";
  return "Faible";
};

const fmt = (iso) => iso ? new Date(iso).toLocaleDateString("fr-FR", { day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit" }) : "—";

const Donut = ({ value, color }) => {
  const r = 18, c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r={r} fill="none" stroke="#e2e8f0" strokeWidth="5"/>
      <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="5"
        strokeDasharray={c} strokeDashoffset={offset}
        strokeLinecap="round" transform="rotate(-90 24 24)"
        style={{ transition: "stroke-dashoffset .6s ease" }}
      />
      <text x="24" y="28" textAnchor="middle" fontSize="10" fontWeight="700" fill={color}>{value ?? "—"}</text>
    </svg>
  );
};

/* ── Barre de progression étape ── */
const StepBar = ({ steps, profileType }) => {
  const names = STEP_NAMES[profileType] || STEP_NAMES["true"];
  return (
    <div style={{ display:"flex", gap:6, marginTop:8 }}>
      {[1,2,3,4].map(i => {
        const v = steps[i];
        const done = v !== null;
        return (
          <div key={i} title={names[i]} style={{ flex:1 }}>
            <div style={{ fontSize:10, color:"#94a3b8", marginBottom:3, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{names[i]}</div>
            <div style={{ height:6, borderRadius:99, background:"#e2e8f0", overflow:"hidden" }}>
              <div style={{ height:"100%", width: done ? `${v}%` : "0%", background: done ? scoreColor(v) : "#e2e8f0", borderRadius:99, transition:"width .5s ease" }}/>
            </div>
            <div style={{ fontSize:10, color: done ? scoreColor(v) : "#94a3b8", marginTop:2 }}>{done ? `${v}%` : "—"}</div>
          </div>
        );
      })}
    </div>
  );
};

/* ══════════════════════════════════════════════
   MODAL DÉTAIL 
══════════════════════════════════════════════ */
const DetailModal = ({ diag, onClose }) => {
  if (!diag) return null;
  const st = STATUS_CONFIG[diag.status];
  const answerEntries = Object.entries(diag.answers);
  return (                                                                                                                                                                                                                                                                                                                                                                                            
    <div style={{ position:"fixed", inset:0, zIndex:1050, display:"flex", alignItems:"center", justifyContent:"center" }}
         onClick={onClose}>
      <div style={{ position:"absolute", inset:0, background:"rgba(15,23,42,.55)", backdropFilter:"blur(4px)" }}/>
      <div style={{ position:"relative", background:"#fff", borderRadius:20, width:"min(700px,95vw)", maxHeight:"85vh", overflow:"auto", boxShadow:"0 32px 80px rgba(0,0,0,.2)", padding:0 }}
           onClick={e=>e.stopPropagation()}>
        
        {/* Header modal */}
        <div style={{ padding:"28px 32px 20px", borderBottom:"1px solid #f1f5f9", display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
              <div style={{ width:40, height:40, borderRadius:12, background:"var(--primary-dark)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:16 }}>
                {diag.userName[0]}
              </div>
              <div>
                <div style={{ fontWeight:700, fontSize:17, color:"#0f172a" }}>{diag.userName}</div>
                <div style={{ fontSize:13, color:"#94a3b8" }}>{diag.userEmail}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:8 }}>
              <span style={{ padding:"3px 12px", borderRadius:99, fontSize:12, fontWeight:600, background:st.bg, color:st.color }}>{st.label}</span>
              <span style={{ padding:"3px 12px", borderRadius:99, fontSize:12, fontWeight:600, background:"#f1f5f9", color:"#64748b" }}>
                {diag.profileLabel}
              </span>
              {diag.flagged && <span style={{ padding:"3px 12px", borderRadius:99, fontSize:12, fontWeight:600, background:"rgba(239,68,68,.1)", color:"#ef4444" }}>⚑ Signalé</span>}
            </div>
          </div>
          <button onClick={onClose} style={{ border:"none", background:"#f1f5f9", borderRadius:10, width:36, height:36, cursor:"pointer", fontSize:18, color:"#64748b", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
        </div>

        <div style={{ padding:"24px 32px" }}>
          {/* Dates */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>
            {[[" Démarré le", fmt(diag.startedAt)], [" Terminé le", fmt(diag.completedAt)]].map(([l,v])=>(
              <div key={l} style={{ background:"#f8fafc", borderRadius:12, padding:"14px 16px" }}>
                <div style={{ fontSize:12, color:"#94a3b8", marginBottom:4 }}>{l}</div>
                <div style={{ fontWeight:600, color:"#0f172a", fontSize:14 }}>{v}</div>
              </div>
            ))}
          </div>

          {/* Score global */}
          {diag.score !== null && (
            <div style={{ background:`linear-gradient(135deg,${scoreColor(diag.score)}18,${scoreColor(diag.score)}08)`, border:`1.5px solid ${scoreColor(diag.score)}30`, borderRadius:14, padding:"18px 20px", marginBottom:24, display:"flex", alignItems:"center", gap:20 }}>
              <Donut value={diag.score} color={scoreColor(diag.score)}/>
              <div>
                <div style={{ fontSize:13, color:"#64748b" }}>Score global de risque</div>
                <div style={{ fontSize:22, fontWeight:800, color:scoreColor(diag.score) }}>{diag.score}% <span style={{ fontSize:14, fontWeight:500 }}>— {scoreLabel(diag.score)}</span></div>
                <div style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>Ce score est indicatif et non diagnostique.</div>
              </div>
            </div>
          )}

          {/* Étapes */}
          <div style={{ marginBottom:24 }}>
            <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:12 }}>Détail par étape</div>
            <StepBar steps={diag.stepScores} profileType={diag.profileType}/>
          </div>

          {/* Réponses */}
          {answerEntries.length > 0 && (
            <div>
              <div style={{ fontWeight:700, fontSize:14, color:"#0f172a", marginBottom:12 }}>Réponses enregistrées</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {answerEntries.map(([k,v])=>(
                  <div key={k} style={{ background:"#f8fafc", borderRadius:10, padding:"10px 14px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:12, color:"#64748b" }}>{k.replace("step","Étape ").replace("_question"," · Q")}</span>
                    <span style={{ fontSize:13, fontWeight:600, color:"#0f172a" }}>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ══════════════════════════════════════════════
   PAGE PRINCIPALE
══════════════════════════════════════════════ */
const DashboardDiagnostics = () => {
  const { theme, toggleTheme } = useOutletContext();
  const dark = theme === "dark";

  const [diagnostics, setDiagnostics] = useState(MOCK_DIAGNOSTICS);
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProfile, setFilterProfile] = useState("all");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);

  /* ── stats ── */
  const total      = diagnostics.length;
  const completed  = diagnostics.filter(d=>d.status==="completed").length;
  const inProgress = diagnostics.filter(d=>d.status==="in_progress").length;
  const flagged    = diagnostics.filter(d=>d.flagged).length;
  const avgScore   = (() => {
    const scores = diagnostics.filter(d=>d.score!==null).map(d=>d.score);
    return scores.length ? Math.round(scores.reduce((a,b)=>a+b,0)/scores.length) : null;
  })();

  /* ── filtre ── */
  const filtered = diagnostics.filter(d => {
    const matchStatus  = filterStatus  === "all" || d.status === filterStatus;
    const matchProfile = filterProfile === "all" || d.profileType === filterProfile;
    const matchSearch  = d.userName.toLowerCase().includes(search.toLowerCase()) ||
                         d.userEmail.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchProfile && matchSearch;
  });

  const toggleFlag = (id) => setDiagnostics(prev => prev.map(d => d.id===id ? {...d, flagged:!d.flagged} : d));
  const deleteOne  = (id) => setDiagnostics(prev => prev.filter(d => d.id!==id));

  /* ── styles ── */
  const bg   = dark ? "#0f172a" : "#f8fafc";
  const card = dark ? "#1e293b" : "#ffffff";
  const txt  = dark ? "#f1f5f9" : "#0f172a";
  const sub  = dark ? "#94a3b8" : "#64748b";
  const bdr  = dark ? "#334155" : "#e2e8f0";

  const STATS = [
    { label:"Total diagnostics", value:total,      icon:<MdAssignment size={20} />, accent:"#6366f1" },
    { label:"Terminés",          value:completed,   icon:<LuHistory size={20} />, accent:"#10b981" },
    { label:"En cours",          value:inProgress,  icon:<LuHistory size={20} />, accent:"#f59e0b" },
    { label:"Score moyen",       value: avgScore!==null ? `${avgScore}%` : "—", icon:<LuHistory size={20} />, accent: avgScore!==null ? scoreColor(avgScore) : "#94a3b8" },
    { label:"Signalés",          value:flagged,     icon:<LuHistory size={20} />,  accent:"#ef4444" },
  ];

  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:"100vh", background:bg, color:txt, fontFamily:"'DM Sans', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      
      {/* TopHeader */}
      <div style={{ position:"sticky", top:0, zIndex:100 }}>
        <TopHeader theme={theme} toggleTheme={toggleTheme}/>
      </div>

      <div style={{ display:"flex", flexGrow:1 }}>
        <Sidebar                                            />

        <main style={{ flexGrow:1, padding:"32px 36px", overflowY:"auto" }}>
          
          {/* ── Titre ── */}
          <div style={{ marginBottom:32 }}>
            <h2 style={{ fontWeight:800, fontSize:26, margin:0, letterSpacing:"-0.5px" }}>Gestion des diagnostics</h2>
            <p style={{ color:sub, margin:"6px 0 0", fontSize:14 }}>Suivi et analyse des évaluations du spectre autistique</p>
          </div>

          {/* ── Stats cards ── */}
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:16, marginBottom:32 }}>
            {STATS.map(s=>(
              <div key={s.label} style={{ background:card, borderRadius:16, padding:"20px 20px 18px", border:`1px solid ${bdr}`, position:"relative", overflow:"hidden" }}>
                <div style={{ position:"absolute", top:-12, right:-12, fontSize:48, opacity:.07 }}>{s.icon}</div>
                <div style={{ fontSize:13, color:sub, marginBottom:8 }}>{s.label}</div>
                <div style={{ fontSize:30, fontWeight:800, color:s.accent, lineHeight:1 }}>{s.value}</div>
              </div>
            ))}
          </div>

          {/* ── Filtres ── */}
          <div style={{ background:card, borderRadius:16, border:`1px solid ${bdr}`, padding:"18px 24px", marginBottom:24, display:"flex", flexWrap:"wrap", gap:12, alignItems:"center" }}>
            {/* Recherche */}
            <div style={{ display:"flex", alignItems:"center", gap:8, background:bg, borderRadius:10, padding:"8px 14px", flex:"1 1 220px", border:`1px solid ${bdr}` }}>
              <span style={{ color:sub }}><span className="material-symbols-outlined ">search</span></span>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Rechercher un utilisateur..."
                style={{ border:"none", background:"transparent", outline:"none", fontSize:14, color:txt, width:"100%" }}
              />
            </div>
            {/* Statut */}
            <select value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}
              style={{ background:bg, border:`1px solid ${bdr}`, borderRadius:10, padding:"9px 14px", fontSize:13, color:txt, cursor:"pointer" }}>
              <option value="all">Tous les statuts</option>
              <option value="completed">Terminés</option>
              <option value="in_progress">En cours</option>
              <option value="abandoned">Abandonnés</option>
            </select>
            {/* Profil */}
            <select value={filterProfile} onChange={e=>setFilterProfile(e.target.value)}
              style={{ background:bg, border:`1px solid ${bdr}`, borderRadius:10, padding:"9px 14px", fontSize:13, color:txt, cursor:"pointer" }}>
              <option value="all">Tous les profils</option>
              <option value="true">Adulte</option>
              <option value="parent_child">Parent</option>
              <option value="specialist_obs">Spécialiste</option>
            </select>
            <span style={{ marginLeft:"auto", fontSize:13, color:sub }}>{filtered.length} résultat(s)</span>
          </div>

          {/* ── Tableau ── */}
          <div style={{ background:card, borderRadius:16, border:`1px solid ${bdr}`, overflow:"hidden" }}>
            {/* En-tête tableau */}
            <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.5fr 80px 120px", gap:0, padding:"14px 24px", background: dark?"bg-dark":"bg-light", borderBottom:`1px solid ${bdr}` }}>
              {["Utilisateur","Profil","Statut","Score / Étapes","Signalé","Actions"].map(h=>(
                <div key={h} style={{ fontSize:12, fontWeight:700, color:sub, textTransform:"uppercase", letterSpacing:".6px" }}>{h}</div>
              ))}
            </div>

 
            {filtered.length === 0 ? (
              <div style={{ padding:"60px 24px", textAlign:"center", color:sub }}>
                <div style={{ fontSize:40, marginBottom:12 }}><span className="material-symbols-outlined ">search</span></div>
                <div style={{ fontWeight:600 }}>Aucun diagnostic trouvé</div>
              </div>
            ) : filtered.map((d, i) => {
              const st = STATUS_CONFIG[d.status];
              return (
                <div key={d.id} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1.5fr 80px 120px", gap:0, padding:"16px 24px", borderBottom: i<filtered.length-1 ? `1px solid ${bdr}` : "none", alignItems:"center", transition:"background .15s", cursor:"pointer" }}
                  onMouseEnter={e=>e.currentTarget.style.background=dark?"#1a2a40":"#f8fafc"}
                  onMouseLeave={e=>e.currentTarget.style.background="transparent"}
                >
 
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:"var(--primary-dark)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:700, fontSize:14, flexShrink:0 }}>
                      {d.userName[0]}
                    </div>
                    <div>
                      <div style={{ fontWeight:600, fontSize:14 }}>{d.userName}</div>
                      <div style={{ fontSize:12, color:sub }}>{d.userEmail}</div>
                    </div>
                  </div>


                  <div>
                    <span style={{ padding:"3px 10px", borderRadius:99, fontSize:12, fontWeight:600, background: dark?"#334155":"#f1f5f9", color:sub }}>
                      {d.profileLabel}
                    </span>
                  </div>


                  <div>
                    <span style={{ padding:"4px 12px", borderRadius:99, fontSize:12, fontWeight:600, background:st.bg, color:st.color }}>
                      {st.label}
                    </span>
                  </div>


                  <div style={{ minWidth:0 }}>
                    {d.score !== null ? (
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <Donut value={d.score} color={scoreColor(d.score)}/>
                        <div>
                          <div style={{ fontSize:13, fontWeight:700, color:scoreColor(d.score) }}>{scoreLabel(d.score)}</div>
                          <div style={{ display:"flex", gap:3, marginTop:3 }}>
                            {[1,2,3,4].map(s=>(
                              <div key={s} style={{ width:20, height:4, borderRadius:99, background: d.stepScores[s]!==null ? scoreColor(d.stepScores[s]) : bdr }}/>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <span style={{ fontSize:13, color:sub }}>—</span>
                    )}
                  </div>

    
                  <div>
                    <button onClick={()=>toggleFlag(d.id)}
                      style={{ border:"none", background:"transparent", cursor:"pointer", fontSize:18, color: d.flagged?"#ef4444":"#cbd5e1", transition:"color .2s" }}
                      title={d.flagged?"Retirer le signalement":"Signaler"}>
                      signaler
                    </button>
                  </div>

                  <div style={{ display:"flex", gap:6 }}>
                    <button onClick={()=>setSelected(d)}
                      style={{ border:`1px solid ${bdr}`, background:"transparent", borderRadius:8, padding:"6px 10px", cursor:"pointer", fontSize:13, color:txt, fontWeight:500, transition:"all .2s" }}
                      title="Voir détail">
                      voir
                    </button>
                    <button onClick={()=>deleteOne(d.id)}
                      style={{ border:"1px solid rgba(239,68,68,.3)", background:"transparent", borderRadius:8, padding:"6px 10px", cursor:"pointer", fontSize:13, color:"#ef4444", transition:"all .2s" }}
                      title="Supprimer">
                      supprimer
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

 
          <div style={{ marginTop:16, fontSize:13, color:sub, textAlign:"right" }}>
            {filtered.length} diagnostic(s) affiché(s) sur {total}
          </div>
        </main>
      </div>

 
      <DetailModal diag={selected} onClose={()=>setSelected(null)}/>
    </div>
  );
};

export default DashboardDiagnostics;