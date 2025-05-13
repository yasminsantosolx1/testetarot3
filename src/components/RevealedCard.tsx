import React, { useState, useEffect } from 'react';
import { useTarot } from '../context/TarotContext';

const RevealedCard: React.FC = () => {
  const { currentCard, readingStep, proceedToNextStep } = useTarot();
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFullyRevealed, setIsFullyRevealed] = useState(false);

  useEffect(() => {
    if (currentCard) {
      const flipTimer = setTimeout(() => {
        setIsFlipped(true);
      }, 500);

      const revealTimer = setTimeout(() => {
        setIsFullyRevealed(true);
      }, 1500);

      return () => {
        clearTimeout(flipTimer);
        clearTimeout(revealTimer);
      };
    }
  }, [currentCard]);

  if (!currentCard) return null;

  const getCardTitle = () => {
    switch (readingStep) {
      case 'first':
        return 'Primeira carta: Situação';
      case 'second':
        return 'Segunda carta: Desafio';
      case 'third':
        return 'Terceira carta: Conselho';
      default:
        return '';
    }
  };

  const getButtonText = () => {
    switch (readingStep) {
      case 'first':
        return 'Escolher a segunda carta';
      case 'second':
        return 'Escolher última carta';
      case 'third':
        return '';
      default:
        return '';
    }
  };

  return (
    <div className="revealed-card-container">
      <h2 className="card-title">{getCardTitle()}</h2>
      <div className={`revealed-card ${isFlipped ? 'flipped' : ''}`}>
        <div className="card-inner">
          <div className="card-front">
            <img
              src={currentCard.card.backImageUrl}
              alt="Verso da carta de Tarot"
              className="card-image"
            />
          </div>
          <div className="card-back">
            <img
              src={currentCard.card.imageUrl}
              alt={currentCard.card.name}
              className="card-image"
            />
          </div>
        </div>
      </div>
      
      {isFullyRevealed && (
        <div className="card-info">
          <h2 className="card-name">{currentCard.card.name}</h2>
          {readingStep === 'third' ? (
            <p className="loading-text">Gerando o seu resultado...</p>
          ) : (
            <button 
              className="next-card-button"
              onClick={proceedToNextStep}
            >
              {getButtonText()}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default RevealedCard;