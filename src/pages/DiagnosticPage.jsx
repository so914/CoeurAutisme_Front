import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import DiagnosticSidebar from '../components/DiagnosticSidebar';
import QuestionCard from '../components/QuestionCard';
import Navbar from '../components/Navbar';
import Cookies from 'js-cookie';
import { AiOutlineInfoCircle } from "react-icons/ai";

const DiagnosticPage = () => {
  const { theme, toggleTheme } = useOutletContext();

  const autismTests = {
    true: {
      title: "Questionnaire d'auto-évaluation Adulte",
      description: "Ce questionnaire est destiné aux adultes souhaitant identifier des traits autistiques dans leur quotidien.",
      steps: {
        1: { name: "Interaction & Réciprocité", questions: [
          { question: "Avez-vous du mal à savoir quand c'est votre tour de parler ?", instruction: "Sentez-vous que vous coupez souvent la parole ?" },
          { question: "Préférez-vous les activités solitaires ?", instruction: "Le contact avec les autres vous demande-t-il un effort épuisant ?" },
          { question: "Le bavardage (small talk) vous semble-t-il inutile ?", instruction: "Parler de la pluie et du beau temps est-il difficile ?" },
          { question: "Avez-vous du mal à vous faire des amis ?", instruction: "Les règles de l'amitié vous semblent-elles floues ?" },
          { question: "Vous sentez-vous souvent comme un observateur étranger ?", instruction: "Avez-vous l'impression de jouer un rôle (masking) ?" }
        ]},
        2: { name: "Communication Sociale", questions: [
          { question: "Avez-vous du mal à comprendre les 'sous-entendus' ?", instruction: "Prenez-vous les expressions au premier degré ?" },
          { question: "Le contact visuel est-il inconfortable ?", instruction: "Devez-vous 'forcer' votre regard sur l'autre ?" },
          { question: "On vous dit souvent que vous êtes trop honnête ?", instruction: "Dites-vous des vérités qui peuvent blesser sans le vouloir ?" },
          { question: "Avez-vous du mal à imaginer ce que pensent les autres ?", instruction: "Anticiper les émotions d'autrui est-il un défi ?" },
          { question: "Votre voix est-elle jugée monotone ?", instruction: "On vous a déjà dit que vous manquez de relief en parlant ?" }
        ]},
        3: { name: "Rigidité & Routine", questions: [
          { question: "Êtes-vous perturbé par les changements de programme ?", instruction: "Une annulation gâche-t-elle votre moral ?" },
          { question: "Avez-vous besoin de suivre une routine stricte ?", instruction: "L'ordre précis de vos tâches vous rassure-t-il ?" },
          { question: "Avez-vous des gestes répétitifs quand vous stressez ?", instruction: "Tapoter les doigts, se balancer légèrement, etc." },
          { question: "Avez-vous un sens de la justice très développé ?", instruction: "L'injustice provoque-t-elle une colère intense ?" },
          { question: "Êtes-vous fasciné par certains sujets intenses ?", instruction: "Passez-vous des heures sur un sujet très précis ?" }
        ]},
        4: { name: "Sensorialité & Détails", questions: [
          { question: "Certaines textures sont-elles insupportables ?", instruction: "Exemple : étiquettes de vêtements ou laine." },
          { question: "Remarquez-vous des sons que les autres ignorent ?", instruction: "Le bruit d'un frigo peut-il vous déconcentrer ?" },
          { question: "La lumière vive vous oppresse-t-elle ?", instruction: "Évitez-vous les lieux bondés à cause du bruit/lumière ?" },
          { question: "Avez-vous tendance à vous focaliser sur les détails ?", instruction: "Voyez-vous les petites erreurs avant le message global ?" },
          { question: "Avez-vous une excellente mémoire pour les faits ?", instruction: "Dates, codes ou listes techniques." }
        ]}
      }
    },
    parent_child: {
      title: "Évaluation du développement de l'enfant",
      description: "Aide les parents à identifier les signes précoces pour un accompagnement adapté.",
      steps: {
        1: { name: "Interaction & Réciprocité", questions: [
          { question: "Est-ce que votre enfant vous regarde quand vous l'appelez par son nom ?", instruction: "Appelez-le sans faire de gestes depuis une autre pièce." },
          { question: "Est-ce qu'il vous apporte des objets juste pour vous les montrer ?", instruction: "Il veut partager son intérêt avec vous." },
          { question: "Imite-t-il vos actions de manière spontanée ?", instruction: "Faire coucou, applaudir, ou faire semblant de téléphoner." },
          { question: "S'intéresse-t-il aux autres enfants de son âge ?", instruction: "Cherche-t-il à interagir ou reste-t-il dans son monde ?" },
          { question: "Réagit-il à vos expressions de visage ?", instruction: "S'adapte-t-il si vous souriez ou semblez triste ?" }
        ]},
        2: { name: "Communication Sociale", questions: [
          { question: "Votre enfant pointe-t-il du doigt pour vous montrer quelque chose ?", instruction: "Pointer un oiseau pour que vous regardiez aussi." },
          { question: "Utilise-t-il votre main comme un outil ?", instruction: "Prend votre main pour l'amener vers un objet." },
          { question: "Répète-t-il des mots ou des phrases sans but apparent ?", instruction: "Phrases de dessins animés en boucle (écholalie)." },
          { question: "Semble-t-il indifférent à vos appels ?", instruction: "L'impression qu'il ne vous entend pas." },
          { question: "Le jeu de 'faire-semblant' est-il absent ?", instruction: "Incapacité à utiliser un objet pour symboliser autre chose." }
        ]},
        3: { name: "Patterns & Comportements", questions: [
          { question: "A-t-il des mouvements de mains inhabituels ?", instruction: "Agite ses mains (flapping) près de ses yeux." },
          { question: "S'intéresse-t-il trop aux pièces d'un jouet ?", instruction: "Faire tourner les roues sans cesse." },
          { question: "Aligner les objets est-il prioritaire ?", instruction: "Fait des rangées et s'énerve si l'ordre change." },
          { question: "Crise violente lors d'un imprévu ?", instruction: "Changement mineur de trajet ou d'habitude." },
          { question: "A-t-il des rituels rigides ?", instruction: "Manger toujours dans le même plat." }
        ]},
        4: { name: "Sensorialité & Adaptation", questions: [
          { question: "Sensible à certains bruits ?", instruction: "Se bouche les oreilles pour l'aspirateur." },
          { question: "Indifférent à la douleur ou au froid ?", instruction: "Ne pleure pas quand il tombe lourdement." },
          { question: "Regarde-t-il les objets de manière inhabituelle ?", instruction: "Du coin de l'œil ou de très près." },
          { question: "Grimpe partout sans percevoir le danger ?", instruction: "Prend des risques sans conscience des conséquences." },
          { question: "Troubles du sommeil ou sélectivité alimentaire ?", instruction: "Refus de certaines textures." }
        ]}
      }
    },
    specialist_obs: {
      title: "Grille d'observation clinique",
      description: "Outil d'orientation pour professionnels (médecins, éducateurs, psychologues).",
      steps: {
        1: { name: "Communication Verbale", questions: [
          { question: "L'individu présente-t-il une écholalie ?", instruction: "Répétition de mots entendus récemment ou dans le passé." },
          { question: "Le langage est-il pédant ou trop formel ?", instruction: "Termes complexes inadaptés à l'âge." },
          { question: "Prosodie inhabituelle observée ?", instruction: "Rythme ou intonation robotique." },
          { question: "Utilisation de néologismes ?", instruction: "Invention de mots personnels." },
          { question: "Absence de réciprocité dans le dialogue ?", instruction: "Difficulté à maintenir le flux naturel." }
        ]},
        2: { name: "Signes Non-Verbaux", questions: [
          { question: "Absence de pointage protodéclaratif ?", instruction: "Ne cherche pas à partager l'attention." },
          { question: "Contact oculaire atypique ?", instruction: "Fuyant ou trop fixe." },
          { question: "Déficit des expressions faciales ?", instruction: "Visage peu expressif." },
          { question: "Absence de gestuelle d'accompagnement ?", instruction: "Peu de gestes pour illustrer le discours." },
          { question: "Difficulté du second degré ?", instruction: "Incompréhension de l'humour ou sarcasme." }
        ]},
        3: { name: "Comportements Restreints", questions: [
          { question: "Présence de stéréotypies motrices ?", instruction: "Battements de mains, balancements." },
          { question: "Intérêts restreints intenses ?", instruction: "Focalisation sur des sujets techniques." },
          { question: "Adhérence excessive à des routines ?", instruction: "Besoin de séquences rigides." },
          { question: "Utilisation atypique des objets ?", instruction: "Focus sur textures ou odeurs." },
          { question: "Anxiété majeure lors des transitions ?", instruction: "Difficulté à passer d'une activité à une autre." }
        ]},
        4: { name: "Profil Neuro-Sensoriel", questions: [
          { question: "Hyper-réactivité aux stimuli sensoriels ?", instruction: "Réaction aux sons ou touchers." },
          { question: "Hypo-réactivité sensorielle ?", instruction: "Indifférence à la douleur." },
          { question: "Fascination sensorielle ?", instruction: "Observation prolongée de lumières." },
          { question: "Troubles de la motricité globale ?", instruction: "Démarche particulière ou maladresse." },
          { question: "Déficit d'empathie cognitive ?", instruction: "Difficulté à conceptualiser l'état d'autrui." }
        ]}
      }
    }
  };

  const [user] = useState(() => {
    const savedUser = localStorage.getItem('user_data');
    const token = Cookies.get('auth_token');
    return (savedUser && token) ? JSON.parse(savedUser) : null;
  });

  const [isActif, setActif] = useState(() => localStorage.getItem('diag_isActif') === 'true');
  const [currentStep, setCurrentStep] = useState(() => parseInt(localStorage.getItem('diag_step') || '1'));
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => parseInt(localStorage.getItem('diag_qIndex') || '0'));

  useEffect(() => {
    localStorage.setItem('diag_isActif', isActif);
    localStorage.setItem('diag_step', currentStep);
    localStorage.setItem('diag_qIndex', currentQuestionIndex);
  }, [isActif, currentStep, currentQuestionIndex]);

  const profileKey = user?.is_professional ? 'specialist_obs' : (user?.is_parent ? 'parent_child' : 'true');
  const testData = autismTests[profileKey] || null;
  const stepData = testData?.steps[currentStep];
  const currentQuestion = stepData?.questions[currentQuestionIndex];
  const totalQuestionsInStep = stepData?.questions.length || 0;

  const handleNext = () => {
    if (currentQuestionIndex < totalQuestionsInStep - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentStep < 4) {
      setCurrentStep(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      alert("Test terminé !");
      handleCancel();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentStep > 1) {
      const prevStep = currentStep - 1;
      setCurrentStep(prevStep);
      setCurrentQuestionIndex(testData.steps[prevStep].questions.length - 1);
    }
  };

  const handleCancel = () => {
    setActif(false);
    setCurrentStep(1);
    setCurrentQuestionIndex(0);
    localStorage.removeItem('diag_isActif');
    localStorage.removeItem('diag_step');
    localStorage.removeItem('diag_qIndex');
  };

  //la réponse du user
  const [answers, setAnswers] = useState(() => {
  const saved = localStorage.getItem('diag_answers');
  return saved ? JSON.parse(saved) : {};
});
//sauvergarder les réponses à chaque changement
useEffect(() => {
  localStorage.setItem('diag_answers', JSON.stringify(answers));
}, [answers]);


const handleSaveAnswer = (text) => {
  // On génère l'ID 
  const questionId = `step${currentStep}_question${currentQuestionIndex}`;
  
  setAnswers(prev => ({
    ...prev,
    [questionId]: text
  }));
  
  console.log("ID de la question :", questionId);
  console.log("Texte saisi :", text);
};

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen d-flex flex-column transition-colors duration-200">
      <Navbar theme={theme} toggleTheme={toggleTheme}/> 
      <div className="d-flex flex-grow-1 overflow-hidden position-relative">
        <DiagnosticSidebar />
        <main className="flex-grow-1 overflow-y-auto p-4 md:p-5">
          <div className="mx-auto" style={{ maxWidth: '900px' }}>
            {!isActif ? (
              <section className="py-5 bg-light rounded-4">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <h1 className="display-6 fw-bold text-dark mb-4 text-center">
                        L’importance d’un diagnostic précoce pour un <span className="text-primary-custom">avenir mieux préparé</span>.
                      </h1>
                      <p className="text-secondary mb-5 text-center" style={{ lineHeight: "1.9" }}>
                        La détection rapide des troubles du spectre de l'autisme est un facteur déterminant pour garantir un accompagnement de qualité. Identifier les signes précoces permet d'ajuster les interventions, facilitant ainsi l'inclusion et le développement de l'autonomie. Ce questionnaire d'orientation est une première étape pour objectiver vos observations.
                      </p>
                      <div className="d-flex flex-column align-items-center gap-4">
                        <button className="btn btn-primary-custom btn-lg px-5 py-3 rounded-2" onClick={() => setActif(true)}>
                          Faire le premier pas
                        </button>
                        <div className="card border-0 bg-white shadow-sm p-4 text-start" style={{ maxWidth: "750px" }}>
                          <div className="d-flex gap-3">
                            <div className="text-color fs-3"><AiOutlineInfoCircle /></div>
                            <p className="small mb-0 text-muted">
                              <strong>Note déontologique :</strong> Les résultats obtenus sont purement indicatifs et ne constituent en aucun cas un diagnostic médical. Une consultation auprès d'un médecin spécialisé (pédopsychiatre, neurologue ou CRA) reste impérative pour une évaluation clinique complète et certifiée.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            ) : (
              <QuestionCard 
                question={currentQuestion?.question}
                instruction={currentQuestion?.instruction}
                stepName={stepData?.name}
                stepNumber={currentStep}
                questionNumber={currentQuestionIndex + 1}
                totalInStep={totalQuestionsInStep}
                onNext={handleNext}
                onPrev={handlePrev}
                isFirst={currentStep === 1 && currentQuestionIndex === 0}
                onCancel={handleCancel}
                value={answers[`step${currentStep}_question${currentQuestionIndex}`] || ""} 
                onChange={handleSaveAnswer}
                
              />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DiagnosticPage;