import { useState, useEffect, useCallback, useRef } from "react";
import '../styles/components/FruitDuo.scss';

// ─── Asset Map — images locales dans public/images/fruitDuo_images/ ──────────
const IMG = (name) => `/images/fruitDuo_images/${name}`;

const ASSETS = {
  fruit_apple:        { url: IMG("fruit_apple.webp"),        type: "image" },
  fruit_banana:       { url: IMG("fruit_banana.webp"),       type: "image" },
  fruit_orange:       { url: IMG("fruit_orange.webp"),       type: "image" },
  fruit_strawberry:   { url: IMG("fruit_strawberry.webp"),   type: "image" },
  fruit_grapes:       { url: IMG("fruit_grapes.webp"),       type: "image" },
  fruit_watermelon:   { url: IMG("fruit_watermelon.webp"),   type: "image" },
  card_back_pattern:  { url: IMG("card_back_pattern.webp"),  type: "image" },
  basket_with_fruits: { url: IMG("basket_with_fruits.webp"), type: "image" },
  audio_pomme:        { url: "https://d2oir5eh8rty2e.cloudfront.net/assets/sounds/effect/audio_pomme_d6749acb-549f-4dbe-b503-a7dad550fed4.mp3",         type: "audio" },
  audio_banane:       { url: "https://d2oir5eh8rty2e.cloudfront.net/assets/sounds/effect/audio_banane_dd70e9d1-cf2e-44dd-a9ee-6915152252f4.mp3",        type: "audio" },
  audio_orange:       { url: "https://d2oir5eh8rty2e.cloudfront.net/assets/sounds/effect/audio_orange_dd92ab06-7eef-4ddd-b247-c2cc5025c23f.mp3",        type: "audio" },
  audio_fraise:       { url: "https://d2oir5eh8rty2e.cloudfront.net/assets/sounds/effect/audio_fraise_1776d0f9-ffbc-42af-b202-7958be86b12a.mp3",        type: "audio" },
  audio_raisin:       { url: "https://d2oir5eh8rty2e.cloudfront.net/assets/sounds/effect/audio_raisin_4890a48b-0a45-46f7-a344-efbb6f65179e.mp3",        type: "audio" },
  audio_pasteque:     { url: "https://d2oir5eh8rty2e.cloudfront.net/assets/sounds/effect/audio_pasteque_fc4df37d-9e2c-4999-8d05-0ee3b1a919f4.mp3",      type: "audio" },
  audio_match_success:{ url: "https://d2oir5eh8rty2e.cloudfront.net/assets/sounds/effect/audio_match_success_e38eb72d-27e9-485d-8c91-44cdca36ba01.mp3", type: "audio" },
  audio_no_match:     { url: "https://d2oir5eh8rty2e.cloudfront.net/assets/sounds/effect/audio_no_match_c46ceb27-011c-4383-94ba-9d09b9d6c490.mp3",      type: "audio" },
  audio_victory:      { url: "https://d2oir5eh8rty2e.cloudfront.net/assets/sounds/effect/audio_victory_58122558-ec85-4baa-929f-667c711bc3a7.mp3",       type: "audio" },
  audio_card_flip:    { url: "https://d2oir5eh8rty2e.cloudfront.net/assets/sounds/effect/audio_card_flip_1ccff0e6-baff-43eb-9f7d-3340def0e112.mp3",     type: "audio" },
};

// ─── Game Config ─────────────────────────────────────────────────────────────
const GAME_CONFIG = {
  fruits: [
    { name: "Pomme",    imageAssetId: "fruit_apple",      audioAssetId: "audio_pomme",    emoji: "🍎" },
    { name: "Banane",   imageAssetId: "fruit_banana",     audioAssetId: "audio_banane",   emoji: "🍌" },
    { name: "Orange",   imageAssetId: "fruit_orange",     audioAssetId: "audio_orange",   emoji: "🍊" },
    { name: "Fraise",   imageAssetId: "fruit_strawberry", audioAssetId: "audio_fraise",   emoji: "🍓" },
    { name: "Raisin",   imageAssetId: "fruit_grapes",     audioAssetId: "audio_raisin",   emoji: "🍇" },
    { name: "Pastèque", imageAssetId: "fruit_watermelon", audioAssetId: "audio_pasteque", emoji: "🍉" },
  ],
  gridColumns: 3,
  celebrationDuration: 600,
  flipBackDelay: 1500,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildDeck(fruits) {
  return shuffle(
    fruits.flatMap((fruit, id) => [
      { uid: `${id}-a`, fruitId: id, fruit },
      { uid: `${id}-b`, fruitId: id, fruit },
    ])
  );
}

// ─── Audio Hook ───────────────────────────────────────────────────────────────
function useAudio() {
  const ctxRef = useRef(null);
  const buffersRef = useRef({});

  const ensureCtx = useCallback(() => {
    if (!ctxRef.current) {
      ctxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return ctxRef.current;
  }, []);

  const preload = useCallback(async () => {
    const ctx = ensureCtx();
    const audioEntries = Object.entries(ASSETS).filter(([, v]) => v.type === "audio");
    await Promise.all(
      audioEntries.map(async ([id, asset]) => {
        try {
          const res = await fetch(asset.url);
          const ab = await res.arrayBuffer();
          buffersRef.current[id] = await ctx.decodeAudioData(ab);
        } catch (e) {
          console.warn(`Audio load failed: ${id}`, e);
        }
      })
    );
  }, [ensureCtx]);

  const play = useCallback((id) => {
    const ctx = ctxRef.current;
    const buf = buffersRef.current[id];
    if (!ctx || !buf) return;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
  }, []);

  return { preload, play };
}

// ─── CardGrid ─────────────────────────────────────────────────────────────────
function CardGrid({ deck, flipped, matched, celebrating, onCardClick }) {
  return (
    <div className="card-grid">
      {deck.map((cardData, idx) => (
        <Card
          key={cardData.uid}
          cardData={cardData}
          isFlipped={flipped.includes(idx) || matched.has(idx)}
          isMatched={matched.has(idx)}
          isCelebrating={celebrating.has(idx)}
          onClick={() => onCardClick(idx)}
        />
      ))}
    </div>
  );
}

// ─── FruitImage ───────────────────────────────────────────────────────────────
function FruitImage({ fruit }) {
  const [imgFailed, setImgFailed] = useState(false);
  const url = ASSETS[fruit.imageAssetId]?.url;
  if (!url || imgFailed) {
    return <span className="fruit-emoji">{fruit.emoji}</span>;
  }
  return <img src={url} alt={fruit.name} onError={() => setImgFailed(true)} />;
}

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ cardData, isFlipped, isMatched, isCelebrating, onClick }) {
  return (
    <div
      className={`kard${isFlipped ? " flipped" : ""}${isMatched ? " matched" : ""}${isCelebrating ? " celebrating" : ""}`}
      onClick={onClick}
      style={{ cursor: isFlipped || isMatched ? "default" : "pointer" }}
    >
      <div className="card-inner">
        <div
          className="card-face card-back"
          style={{
            backgroundImage: `url(${ASSETS.card_back_pattern.url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="card-face card-front">
          <FruitImage fruit={cardData.fruit} />
          <span className="fruit-name">{cardData.fruit.name}</span>
        </div>
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function FruitDuo() {
  const [screen, setScreen] = useState("loading");
  const [round, setRound] = useState(1);
  const [deck, setDeck] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState(new Set());
  const [celebrating, setCelebrating] = useState(new Set());
  const [processing, setProcessing] = useState(false);
  const [victoryMsg, setVictoryMsg] = useState("");

  const { preload, play } = useAudio();

  useEffect(() => {
    preload().then(() => setScreen("home"));
  }, [preload]);

  const startRound = useCallback((r) => {
    const fruits = GAME_CONFIG.fruits.slice(0, r);
    setDeck(buildDeck(fruits));
    setFlipped([]);
    setMatched(new Set());
    setCelebrating(new Set());
    setProcessing(false);
    setRound(r);
    setScreen("game");
  }, []);

  const totalPairs = GAME_CONFIG.fruits.slice(0, round).length;
  const matchedCount = matched.size / 2;

  const handleCardClick = useCallback((idx) => {
    if (processing) return;
    if (flipped.includes(idx)) return;
    if (matched.has(idx)) return;

    play("audio_card_flip");

    if (flipped.length === 0) {
      setFlipped([idx]);
      setTimeout(() => play(deck[idx].fruit.audioAssetId), 300);
      return;
    }

    if (flipped.length === 1) {
      const first = flipped[0];
      setFlipped([first, idx]);
      setTimeout(() => play(deck[idx].fruit.audioAssetId), 300);
      setProcessing(true);

      if (deck[first].fruitId === deck[idx].fruitId) {
        // ✅ Match
        setTimeout(() => {
          play("audio_match_success");
          setCelebrating(new Set([first, idx]));
          setTimeout(() => {
            setCelebrating(new Set());
            setMatched(prev => {
              const next = new Set(prev);
              next.add(first);
              next.add(idx);
              if (next.size / 2 === totalPairs) {
                setTimeout(() => {
                  play("audio_victory");
                  const totalFruits = GAME_CONFIG.fruits.length;
                  setVictoryMsg(
                    round < totalFruits
                      ? `Manche ${round} complétée !\nVeux-tu continuer ?`
                      : `Bravo ! Tu as complété toutes les manches !`
                  );
                  setScreen("victory");
                }, 300);
              }
              return next;
            });
            setFlipped([]);
            setProcessing(false);
          }, GAME_CONFIG.celebrationDuration);
        }, 400);
      } else {
        // ❌ Pas de match
        setTimeout(() => {
          play("audio_no_match");
          setTimeout(() => {
            setFlipped([]);
            setProcessing(false);
          }, GAME_CONFIG.flipBackDelay);
        }, 400);
      }
    }
  }, [processing, flipped, matched, deck, play, round, totalPairs]);

  const handleContinue = () => {
    const nextRound = round < GAME_CONFIG.fruits.length ? round + 1 : 1;
    startRound(nextRound);
  };

  const handleStop = () => setScreen("home");
  const columns = GAME_CONFIG.gridColumns;

  // ── LOADING ────────────────────────────────────────────────────────────────
  if (screen === "loading") {
    return (
      <div className="game-world loading-screen">
        <div className="spinner" />
        <div className="loading-text">Chargement...</div>
      </div>
    );
  }

  // ── HOME ───────────────────────────────────────────────────────────────────
  if (screen === "home") {
    return (
      <div className="game-world home-screen">
        <div className="home-title">Fruit Duo</div>
        <div className="basket-container">
          <img src={ASSETS.basket_with_fruits.url} alt="Panier de fruits" className="basket-image" />
        </div>
        <div className="home-subtitle">Trouve les paires de fruits !</div>
        <button className="play-btn" onClick={() => startRound(1)}>Jouer</button>
      </div>
    );
  }

  // ── VICTORY + GAME (même arbre DOM, victory-overlay par-dessus) ────────────
  // ⚠️ CORRECTION : on garde toujours le game-screen monté,
  // et on superpose la victory-overlay par-dessus.
  // Ça évite la page blanche causée par un retour de null/div vide.
  return (
    <div className="game-world game-screen">
      {/* Header */}
      <div className="header">
        <button className="home-btn" onClick={() => setScreen("home")}>🏠</button>
        <div className="title">Fruit Duo</div>
        <div className="progress p-2">
          Manche {round} – Paires : {matchedCount}/{totalPairs}
        </div>
      </div>

      {/* Grille de cartes */}
      <div className="card-grid-container">
        <CardGrid
          deck={deck}
          flipped={flipped}
          matched={matched}
          celebrating={celebrating}
          onCardClick={handleCardClick}
        />
      </div>

      {/* ✅ Victory overlay — par-dessus le jeu, visible seulement si screen === "victory" */}
      {screen === "victory" && (
        <div className="victory-overlay">
          <div className="victory-title">🎉 Bravo ! 🎉</div>
          <div className="victory-message">{victoryMsg}</div>
          <div className="victory-buttons">
            <button className="play-again-btn continue-btn" onClick={handleContinue}>
              Continuer
            </button>
            <button className="play-again-btn stop-btn" onClick={handleStop}>
              Arrêter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}