import React, { useState, useCallback } from 'react';
import EmotionBar from './EmotionBar';
import BadgeOverlay from './BadgeOverlay';
const kouassiImg = '/images/characters/kouassi.jpg';
const aminaImg = '/images/characters/amina.jpg';
const eliasImg = '/images/characters/elias.jpg';
const koffiImg = '/images/characters/koffi.jpg';
const fatoumataImg = '/images/characters/fatoumata.jpg';
const schoolIcon = '/images/icons/school.png';
const marketIcon = '/images/icons/market.png';
const churchIcon = '/images/icons/church.png';
const transportIcon = '/images/icons/transport.png';
const familyIcon = '/images/icons/family.png';


const CHARACTERS = {
  kouassi: { name: 'Kouassi', image: kouassiImg, bgColor: '#EAF3DE' },
  amina: { name: 'Amina', image: aminaImg, bgColor: '#FAEEDA' },
  elias: { name: 'Élias', image: eliasImg, bgColor: '#EEEDFE' },
  koffi: { name: 'Koffi', image: koffiImg, bgColor: '#E6F1FB' },
  fatoumata: { name: 'Fatoumata', image: fatoumataImg, bgColor: '#FAECE7' }
};

const ENVIRONMENTS = {
  school: { label: 'École', icon: schoolIcon, color: '#52B788', bgClass: 'env-school' },
  market: { label: 'Marché', icon: marketIcon, color: '#F4A261', bgClass: 'env-market' },
  church: { label: 'Église', icon: churchIcon, color: '#9B87F5', bgClass: 'env-church' },
  transport: { label: 'Transport', icon: transportIcon, color: '#378ADD', bgClass: 'env-transport' },
  family: { label: 'Famille', icon: familyIcon, color: '#E07A5F', bgClass: 'env-family' }
};

const SCENARIOS = {
  school: [
    {
      title: 'Lever la main',
      levels: [
        {
          tag: 'Observation',
          character: 'kouassi',
          situation: 'Le professeur pose une question. Kouassi connaît la réponse mais hésite à lever la main.',
          tools: ['Respirer calmement', 'Regarder le professeur', 'Se rappeler : je peux essayer'],
          choices: [
            { 
              text: 'Rester immobile sans rien faire', 
              type: 'bad',
              feedback: { 
                type: 'bad', 
                title: 'Ce n\'est pas le meilleur choix', 
                text: 'Rester silencieux peut donner l\'impression que tu ne veux pas participer. Lever la main, c\'est dire : je suis là, j\'ai quelque chose à dire.' 
              } 
            },
            { 
              text: 'Crier la réponse directement', 
              type: 'bad',
              feedback: { 
                type: 'bad', 
                title: 'Attention !', 
                text: 'Crier sans permission peut déranger la classe. Le professeur a besoin de savoir qui veut parler avant de t\'interroger.' 
              } 
            },
            { 
              text: 'Lever doucement la main', 
              type: 'good',
              xp: 25, 
              stressDelta: -20, 
              courageDelta: 15, 
              confidenceDelta: 20,
              feedback: { 
                type: 'good', 
                title: 'Excellent choix !', 
                text: 'Tu as levé la main ! Le professeur t\'a vu, il sourit et t\'interroge. +20 confiance, -15 stress. C\'est comme ça qu\'on communique en classe.' 
              }
            }
          ],
          duoChoices: ['Se moquer de lui', 'L\'ignorer', 'Lui faire un signe encourageant'],
          duoGoodIdx: 2,
          duoFeedbackGood: 'Parfait ! Tu as encouragé ton ami discrètement. Il a pris confiance et levé la main.',
          duoFeedbackBad: 'Un ami bienveillant encourage sans forcer. Essaie le signe discret.',
          badge: null
        },
        {
          tag: 'Niveau 2',
          character: 'kouassi',
          situation: 'Le professeur interroge Kouassi. Toute la classe le regarde. Sa voix est trop basse.',
          tools: ['Parler plus fort', 'Regarder seulement le prof', 'Souffler avant de parler'],
          choices: [
            { 
              text: 'Garder le silence, ne rien dire', 
              type: 'bad',
              feedback: { 
                type: 'bad', 
                title: 'Essaie encore', 
                text: 'Le silence total peut être mal interprété. Même une petite phrase suffit. Tu peux demander à répéter la question !' 
              } 
            },
            { 
              text: 'Demander poliment de répéter la question', 
              type: 'good',
              xp: 15, 
              stressDelta: -10, 
              courageDelta: 10, 
              confidenceDelta: 10,
              feedback: { 
                type: 'good', 
                title: 'Très bien !', 
                text: 'Demander de répéter, c\'est intelligent. Cela montre que tu veux comprendre avant de répondre.' 
              }
            },
            { 
              text: 'Répondre clairement en regardant le prof', 
              type: 'good',
              xp: 30, 
              stressDelta: -20, 
              courageDelta: 20, 
              confidenceDelta: 25,
              feedback: { 
                type: 'good', 
                title: 'Bravo !', 
                text: 'Tu as parlé clairement et regardé le professeur. Toute la classe a entendu ta réponse. +25 confiance !' 
              }
            }
          ],
          duoChoices: ['Se moquer de la voix basse', 'Attendre sans réagir', 'Lui souffler doucement les mots'],
          duoGoodIdx: 2,
          duoFeedbackGood: 'Excellent ! Tu as aidé ton ami discrètement. Il a pu finir sa réponse avec confiance.',
          duoFeedbackBad: 'Un bon ami aide discrètement. Souffler les mots, c\'est de la solidarité.',
          badge: { name: 'Je lève la main', sub: 'Tu as appris à signaler ta participation !' }
        }
      ]
    },
    {
      title: 'Supporter le bruit',
      levels: [
        {
          tag: 'Surcharge sensorielle',
          character: 'kouassi',
          situation: 'La classe est très bruyante. Bruits de chaises, bavardages, voix du professeur. Kouassi se sent submergé.',
          tools: ['Filtre sonore mental', 'Respiration 4 temps', 'Fixer un point calme', 'Carte de sortie discrète'],
          choices: [
            { 
              text: 'Se boucher les oreilles brusquement', 
              type: 'bad',
              feedback: { 
                type: 'bad', 
                title: 'Pas tout à fait', 
                text: 'Ce geste attire l\'attention. Il existe des façons plus discrètes de gérer la surcharge sonore.' 
              } 
            },
            { 
              text: 'Utiliser la respiration guidée (4 temps)', 
              type: 'good',
              xp: 20, 
              stressDelta: -25, 
              courageDelta: 10, 
              confidenceDelta: 5,
              feedback: { 
                type: 'good', 
                title: 'Super stratégie !', 
                text: 'Inspirer 4 temps, bloquer 2, expirer 4. Ton niveau de stress a baissé. Tu as utilisé ton outil !' 
              }
            },
            { 
              text: 'Montrer la carte \'pause\' au professeur', 
              type: 'good',
              xp: 30, 
              stressDelta: -30, 
              courageDelta: 20, 
              confidenceDelta: 15,
              feedback: { 
                type: 'good', 
                title: 'Excellent !', 
                text: 'Tu as communiqué ton besoin sans déranger la classe. Le professeur a compris et accepté. C\'est de la maturité.' 
              }
            }
          ],
          duoChoices: ['Rire et imiter', 'Forcer à rester sans rien dire', 'Proposer d\'aller respirer dehors 1 min'],
          duoGoodIdx: 2,
          duoFeedbackGood: 'Parfait ! Proposer une pause, c\'est reconnaître le besoin de l\'autre. Vrai ami !',
          duoFeedbackBad: 'Ton ami a besoin d\'aide concrète. Proposer une sortie brève est la meilleure option.',
          badge: { name: 'Je gère ma surcharge', sub: 'Tu connais tes outils sensoriels !' }
        }
      ]
    }
  ],
  market: [
    {
      title: 'Interagir avec un vendeur',
      levels: [
        {
          tag: 'Préparation',
          character: 'amina',
          situation: 'Amina doit acheter du savon au marché. Le vendeur est occupé. C\'est bruyant et animé autour d\'elle.',
          tools: ['Formuler sa phrase avant', 'Montrer une image du produit', 'Attendre le bon moment'],
          choices: [
            { 
              text: 'Parler à sa place sans qu\'elle demande', 
              type: 'bad',
              feedback: { 
                type: 'bad', 
                title: 'Attention', 
                text: 'Parler à la place de quelqu\'un l\'empêche de développer son autonomie. Mieux vaut guider doucement.' 
              } 
            },
            { 
              text: 'Attendre le bon moment et dire bonjour', 
              type: 'good',
              xp: 20, 
              stressDelta: -10, 
              courageDelta: 15, 
              confidenceDelta: 15,
              feedback: { 
                type: 'good', 
                title: 'Bien joué !', 
                text: 'Attendre que le vendeur soit libre et dire bonjour, c\'est le bon début. +15 confiance.' 
              }
            },
            { 
              text: 'Montrer l\'image du produit et dire le prix', 
              type: 'good',
              xp: 30, 
              stressDelta: -15, 
              courageDelta: 20, 
              confidenceDelta: 25,
              feedback: { 
                type: 'good', 
                title: 'Parfait !', 
                text: 'Montrer l\'image + dire le nom, c\'est communiquer efficacement même quand les mots sont difficiles.' 
              }
            }
          ],
          duoChoices: ['Parler à sa place', 'Attendre sans rien faire', 'Guider doucement : Tu peux lui montrer l\'image'],
          duoGoodIdx: 2,
          duoFeedbackGood: 'Super ! Guider sans remplacer, c\'est respecter l\'autonomie de l\'autre.',
          duoFeedbackBad: 'Un bon ami guide sans prendre la place. Laisse-la essayer avec ton soutien.',
          badge: { name: 'J\'ai fait mes achats seul(e)', sub: 'Tu as communiqué au marché !' }
        }
      ]
    }
  ],
  church: [
    {
      title: 'Supporter les chants',
      levels: [
        {
          tag: 'Gestion sensorielle',
          character: 'elias',
          situation: 'Les chants démarrent à l\'église. C\'est fort et vibrant. Élias se sent submergé par le son.',
          tools: ['Fixer un point calme (bougie)', 'Poser les mains sur les genoux', 'Fredonner doucement', 'Carte de sortie discrète'],
          choices: [
            { 
              text: 'Se lever brusquement et sortir en courant', 
              type: 'bad',
              feedback: { 
                type: 'bad', 
                title: 'Trop impulsif', 
                text: 'Partir brusquement dérange les autres fidèles. Il existe des façons discrètes de gérer ce moment.' 
              } 
            },
            { 
              text: 'Poser les mains à plat sur les genoux et respirer', 
              type: 'good',
              xp: 20, 
              stressDelta: -20, 
              courageDelta: 10, 
              confidenceDelta: 10,
              feedback: { 
                type: 'good', 
                title: 'Ancrage réussi !', 
                text: 'Le contact tactile des mains sur les genoux aide à s\'ancrer. Ton stress baisse progressivement.' 
              }
            },
            { 
              text: 'Montrer la carte \'pause\' à l\'adulte et sortir discrètement', 
              type: 'good',
              xp: 30, 
              stressDelta: -30, 
              courageDelta: 20, 
              confidenceDelta: 15,
              feedback: { 
                type: 'good', 
                title: 'Parfait !', 
                text: 'Sortir discrètement avec permission, c\'est respecter le lieu et prendre soin de toi en même temps.' 
              }
            }
          ],
          duoChoices: ['Forcer à rester', 'Rire de sa gêne', 'Proposer de s\'asseoir au fond, plus calme'],
          duoGoodIdx: 2,
          duoFeedbackGood: 'Excellent ! Proposer un endroit stratégique, c\'est une aide concrète et respectueuse.',
          duoFeedbackBad: 'Ton ami a besoin d\'une vraie aide. Proposer un espace plus calme est la bonne réponse.',
          badge: { name: 'Je gère l\'église à ma façon', sub: 'Tu trouves ton équilibre dans les espaces de culte !' }
        }
      ]
    }
  ],
  transport: [
    {
      title: 'Monter dans un bus bondé',
      levels: [
        {
          tag: 'Navigation',
          character: 'koffi',
          situation: 'Le bus arrive. Il est bondé. Koffi doit monter mais se sent stressé par la foule et le bruit du moteur.',
          tools: ['Observer avant de monter', 'Rester près de la porte', 'Respirer pendant le trajet', 'Compter les arrêts'],
          choices: [
            { 
              text: 'Monter en courant et bousculer tout le monde', 
              type: 'bad',
              feedback: { 
                type: 'bad', 
                title: 'Trop impulsif', 
                text: 'Bousculer les autres crée des conflits et augmente le stress. Prendre son temps et observer d\'abord, c\'est mieux.' 
              } 
            },
            { 
              text: 'Attendre un peu et monter prudemment', 
              type: 'good',
              xp: 20, 
              stressDelta: -15, 
              courageDelta: 15, 
              confidenceDelta: 10,
              feedback: { 
                type: 'good', 
                title: 'Bonne stratégie !', 
                text: 'Attendre que la foule se disperse un peu, puis monter calmement. Barre de sérénité stable.' 
              }
            },
            { 
              text: 'Monter et se placer près de la fenêtre', 
              type: 'good',
              xp: 30, 
              stressDelta: -20, 
              courageDelta: 20, 
              confidenceDelta: 20,
              feedback: { 
                type: 'good', 
                title: 'Excellent !', 
                text: 'La fenêtre offre un regard vers l\'extérieur, moins de pression et une sortie visuelle. Choix stratégique.' 
              }
            }
          ],
          duoChoices: ['Ignorer son stress', 'Aggraver : Dépêche-toi !', 'Rassurer : On y va ensemble, doucement'],
          duoGoodIdx: 2,
          duoFeedbackGood: 'Parfait ! Ensemble, doucement — ces deux mots résument ce qu\'est un vrai ami.',
          duoFeedbackBad: 'Pousser quelqu\'un stressé empire la situation. Rassurer et accompagner, c\'est la bonne voie.',
          badge: { name: 'Je voyage en bus', sub: 'Tu gères les transports avec sérénité !' }
        }
      ]
    }
  ],
  family: [
    {
      title: 'Gérer la pression des adultes',
      levels: [
        {
          tag: 'Pression sociale',
          character: 'fatoumata',
          situation: 'En réunion familiale, un adulte pose beaucoup de questions à Fatoumata depuis plusieurs minutes. Elle se sent submergée.',
          tools: ['Réponse courte et polie', 'Demander un moment de calme', 'Chercher l\'adulte de confiance', 'Respirer avant de répondre'],
          choices: [
            { 
              text: 'Se fermer complètement et ne plus parler', 
              type: 'bad',
              feedback: { 
                type: 'bad', 
                title: 'Compréhensible mais difficile', 
                text: 'Se fermer totalement peut inquiéter les adultes. Une courte réponse ou un signal à l\'adulte de confiance est plus efficace.' 
              } 
            },
            { 
              text: 'Répondre brièvement : Je vais bien, merci', 
              type: 'good',
              xp: 20, 
              stressDelta: -15, 
              courageDelta: 15, 
              confidenceDelta: 15,
              feedback: { 
                type: 'good', 
                title: 'Bien géré !', 
                text: 'Une réponse courte et polie suffit. Elle montre que tu participes à ta façon. +15 confiance.' 
              }
            },
            { 
              text: 'Faire signe à l\'adulte de confiance discrètement', 
              type: 'good',
              xp: 30, 
              stressDelta: -25, 
              courageDelta: 20, 
              confidenceDelta: 20,
              feedback: { 
                type: 'good', 
                title: 'Excellent !', 
                text: 'Ton adulte de confiance a vu ton signal et est venu te rejoindre naturellement. Tu as géré ça avec intelligence.' 
              }
            }
          ],
          duoChoices: ['Laisser faire sans réagir', 'Se moquer des questions', 'Intervenir naturellement : On va jouer ?'],
          duoGoodIdx: 2,
          duoFeedbackGood: 'Parfait ! Une intervention naturelle qui soulage ton ami sans le mettre en difficulté.',
          duoFeedbackBad: 'Ton ami a besoin d\'une sortie naturelle. Propose une activité pour changer de sujet.',
          badge: { name: 'Je gère les adultes à ma façon', sub: 'Tu navigues dans les interactions familiales !' }
        }
      ]
    }
  ]
};

const GameScreen = ({ mode, environment, setEnvironment, onBack }) => {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [levelIndex, setLevelIndex] = useState(0);
  const [stats, setStats] = useState({
    xp: 0,
    stress: 65,
    courage: 25,
    confidence: 15
  });
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [showBadge, setShowBadge] = useState(null);
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [duoP2Done, setDuoP2Done] = useState(false);
  const [p1Choice, setP1Choice] = useState(null);
  const [usedTools, setUsedTools] = useState([]);

  const getCurrentLevel = useCallback(() => {
    const scenarios = SCENARIOS[environment];
    if (!scenarios || scenarioIndex >= scenarios.length) return null;
    const scenario = scenarios[scenarioIndex];
    if (levelIndex >= scenario.levels.length) return null;
    return scenario.levels[levelIndex];
  }, [environment, scenarioIndex, levelIndex]);

  const getCurrentScenario = useCallback(() => {
    const scenarios = SCENARIOS[environment];
    if (!scenarios || scenarioIndex >= scenarios.length) return null;
    return scenarios[scenarioIndex];
  }, [environment, scenarioIndex]);

  const makeChoice = (choiceIndex) => {
    if (answered) return;
    
    const level = getCurrentLevel();
    const choice = level.choices[choiceIndex];
    
    setAnswered(true);
    setP1Choice(choice);
    setFeedback(choice.feedback);
    
    if (choice.type === 'good') {
      setStats(prev => ({
        xp: prev.xp + (choice.xp || 0),
        stress: Math.max(0, Math.min(100, prev.stress + (choice.stressDelta || 0))),
        courage: Math.max(0, Math.min(100, prev.courage + (choice.courageDelta || 0))),
        confidence: Math.max(0, Math.min(100, prev.confidence + (choice.confidenceDelta || 0)))
      }));
    }
    
    if (mode === 'solo' && level.badge && choice.type === 'good') {
      if (!earnedBadges.includes(level.badge.name)) {
        setTimeout(() => {
          setShowBadge(level.badge);
          setEarnedBadges([...earnedBadges, level.badge.name]);
        }, 500);
      }
    }
  };

  const makeDuoChoice = (choiceIndex) => {
    if (duoP2Done) return;
    
    const level = getCurrentLevel();
    const isGood = choiceIndex === level.duoGoodIdx;
    
    setDuoP2Done(true);
    setFeedback({
      type: isGood ? 'good' : 'bad',
      title: isGood ? 'Excellent travail d\'équipe !' : 'Essaie encore',
      text: isGood ? level.duoFeedbackGood : level.duoFeedbackBad
    });
    
    if (isGood && level.badge) {
      if (!earnedBadges.includes(level.badge.name)) {
        setTimeout(() => {
          setShowBadge(level.badge);
          setEarnedBadges([...earnedBadges, level.badge.name]);
        }, 500);
      }
    }
  };

  const nextStep = () => {
    const scenario = getCurrentScenario();
    
    if (levelIndex < scenario.levels.length - 1) {
      setLevelIndex(levelIndex + 1);
    } else {
      const scenarios = SCENARIOS[environment];
      if (scenarioIndex < scenarios.length - 1) {
        setScenarioIndex(scenarioIndex + 1);
        setLevelIndex(0);
      } else {
        setScenarioIndex(0);
        setLevelIndex(0);
      }
    }
    
    setAnswered(false);
    setFeedback(null);
    setDuoP2Done(false);
    setP1Choice(null);
    setUsedTools([]);
  };

  const switchEnvironment = (env) => {
    setEnvironment(env);
    setScenarioIndex(0);
    setLevelIndex(0);
    setAnswered(false);
    setFeedback(null);
    setDuoP2Done(false);
    setP1Choice(null);
    setUsedTools([]);
  };

  const useTool = (toolIndex) => {
    if (!usedTools.includes(toolIndex)) {
      setUsedTools([...usedTools, toolIndex]);
      setStats(prev => ({
        ...prev,
        stress: Math.max(0, prev.stress - 5)
      }));
    }
  };

  const closeBadge = () => {
    setShowBadge(null);
  };

  const calculateProgress = () => {
    const scenarios = SCENARIOS[environment];
    const totalLevels = scenarios.reduce((acc, s) => acc + s.levels.length, 0);
    let completed = 0;
    for (let i = 0; i < scenarioIndex; i++) {
      completed += scenarios[i].levels.length;
    }
    completed += levelIndex;
    return Math.round((completed / totalLevels) * 100);
  };

  const level = getCurrentLevel();
  const scenario = getCurrentScenario();
  const env = ENVIRONMENTS[environment];
  const character = CHARACTERS[level.character];
  const progress = calculateProgress();

  return (
    <div className="game-screen">
      {showBadge && <BadgeOverlay badge={showBadge} onClose={closeBadge} />}
      
      {/* Header */}
      <div className="game-header">
        <div className={`env-badge ${env.bgClass}`}>
          <img src={env.icon} alt={env.label} />
        </div>
        <div className="header-info">
          <div className="header-env">{env.label}</div>
          <div className="header-title">{scenario.title}</div>
        </div>
        <div className="progress-ring">
          <svg width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="none" stroke="#e0e0e0" strokeWidth="4"/>
            <circle 
              cx="25" 
              cy="25" 
              r="20" 
              fill="none" 
              stroke={env.color} 
              strokeWidth="4"
              strokeDasharray="125.6"
              strokeDashoffset={125.6 - (125.6 * progress / 100)}
              strokeLinecap="round"
              transform="rotate(-90 25 25)"
              style={{ transition: 'stroke-dashoffset 0.5s ease' }}
            />
            <text x="25" y="30" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#333">
              {progress}%
            </text>
          </svg>
          <span className="progress-label">NIVEAU</span>
        </div>
      </div>

      {/* XP Bar */}
      <div className="xp-bar-container">
        <span className="xp-label">Progression</span>
        <div className="xp-bar">
          <div className="xp-fill" style={{ width: `${Math.min(100, stats.xp)}%` }}></div>
        </div>
        <span className="xp-value">{stats.xp} / 100 XP</span>
      </div>

      {/* Environment Tabs */}
      <div className="env-tabs">
        {Object.entries(ENVIRONMENTS).map(([key, e]) => (
          <button
            key={key}
            className={`env-tab ${environment === key ? 'active' : ''}`}
            onClick={() => switchEnvironment(key)}
          >
            <img src={e.icon} alt={e.label} />
            {e.label}
          </button>
        ))}
      </div>

      {/* Scenario Card */}
      <div className="scenario-card">
        {/* Situation */}
        <div className="situation-section">
          <div className="situation-tag">
            <span className="tag-dot"></span>
            {level.tag}
          </div>
          <p className="situation-text">{level.situation}</p>
        </div>

        {/* Character & Emotions */}
        <div className="character-section">
          <div className="character-info">
            <div className="character-avatar" style={{ backgroundColor: character.bgColor }}>
              <img src={character.image} alt={character.name} />
            </div>
            <span className="character-name">{character.name}</span>
          </div>
          <div className="emotions-panel">
            <EmotionBar 
              label="Stress" 
              value={stats.stress} 
              color="#E24B4A" 
              icon="😰"
            />
            <EmotionBar 
              label="Courage" 
              value={stats.courage} 
              color="#52B788" 
              icon="💪"
            />
            <EmotionBar 
              label="Confiance" 
              value={stats.confidence} 
              color="#378ADD" 
              icon="🌟"
            />
          </div>
        </div>

        {/* Toolkit */}
        {level.tools && level.tools.length > 0 && (
          <div className="toolkit-section">
            <h4 className="toolkit-title">Boîte à outils disponible</h4>
            <div className="tool-pills">
              {level.tools.map((tool, idx) => (
                <button
                  key={idx}
                  className={`tool-pill ${usedTools.includes(idx) ? 'used' : ''}`}
                  onClick={() => useTool(idx)}
                  disabled={usedTools.includes(idx)}
                >
                  {usedTools.includes(idx) ? '✓ ' : ''}{tool}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Choices */}
        <div className="choices-section">
          <h4 className="choices-title">
            {mode === 'duo' ? 'Joueur 1 — Que fais-tu ?' : 'Que fais-tu ?'}
          </h4>
          <div className="choices-list">
            {level.choices.map((choice, idx) => (
              <button
                key={idx}
                className={`choice-btn ${answered && p1Choice === choice ? choice.type : ''} ${answered ? 'disabled' : ''}`}
                onClick={() => makeChoice(idx)}
                disabled={answered}
              >
                <span className="choice-text">{choice.text}</span>
                {answered && p1Choice === choice && (
                  <span className={`choice-tag ${choice.type}`}>
                    {choice.type === 'good' ? '✓ Bon choix' : '✗ À revoir'}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Feedback */}
        {feedback && (
          <div className={`feedback-panel ${feedback.type}`}>
            <h4 className="feedback-title">{feedback.title}</h4>
            <p className="feedback-text">{feedback.text}</p>
          </div>
        )}
      </div>

      {/* Duo Panel */}
      {mode === 'duo' && (
        <div className="duo-panel">
          <h4 className="duo-header">Mode duo — Joueur 2 (l'ami)</h4>
          <div className="duo-players">
            <div className="duo-player p1">
              <div className="duo-player-name">Joueur 1 — Enfant</div>
              <div className="duo-choice-display">
                {p1Choice ? p1Choice.text : 'En attente de ton choix...'}
              </div>
            </div>
            <div className="duo-player p2">
              <div className="duo-player-name">Joueur 2 — Ami</div>
              <div className="duo-choices">
                {level.duoChoices.map((choice, idx) => (
                  <button
                    key={idx}
                    className={`duo-choice-btn ${duoP2Done && idx === level.duoGoodIdx ? 'good' : ''}`}
                    onClick={() => makeDuoChoice(idx)}
                    disabled={duoP2Done}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="game-footer">
        <button className="btn-back" onClick={onBack}>
          ← Accueil
        </button>
        <span className="step-counter">
          Scén.{scenarioIndex + 1} Niv.{levelIndex + 1}
        </span>
        {answered && (
          <button className="btn-next" onClick={nextStep}>
            Étape suivante →
          </button>
        )}
      </div>
    </div>
  );
};

export default GameScreen;
