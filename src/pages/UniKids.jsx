import React, { useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import WelcomeScreen from '../components/WelcomeScreen';
import GameScreen from '../components/GameScreen';


const UniKidsGame = () => {
  const [screen, setScreen] = useState('loading');
  const [mode, setMode] = useState('solo');
  const [environment, setEnvironment] = useState('school');

  const handleLoadingComplete = () => {
    setScreen('welcome');
  };

  const handleStart = () => {
    setScreen('game');
  };

  const handleBack = () => {
    setScreen('welcome');
  };

  return (
    <div className="unikids-game">
      {screen === 'loading' && (
        <LoadingScreen onComplete={handleLoadingComplete} />
      )}
      
      {screen === 'welcome' && (
        <WelcomeScreen 
          mode={mode}
          setMode={setMode}
          environment={environment}
          setEnvironment={setEnvironment}
          onStart={handleStart}
        />
      )}
      
      {screen === 'game' && (
        <GameScreen 
          mode={mode}
          environment={environment}
          setEnvironment={setEnvironment}
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default UniKidsGame;