import React from 'react';
import { useTarot } from '../context/TarotContext';
import { situationInterpretations, challengeInterpretations, adviceInterpretations } from '../data/interpretations';

const ReadingResult: React.FC = () => {
  const { selectedCards, resetConsultation } = useTarot();

  return (
    <div className="reading-result">
      <div className="cards-display">
        {selectedCards.map((selectedCard, index) => (
          <div key={index} className="result-card">
            <h3 className="result-card-title">{selectedCard.title}</h3>
            <div className="card-image-container">
              <img
                src={selectedCard.card.imageUrl}
                alt={selectedCard.card.name}
                className="result-card-image"
              />
            </div>
            <h4 className="result-card-name">{selectedCard.card.name}</h4>
          </div>
        ))}
      </div>

      <div className="reading-interpretations">
        {selectedCards.map((selectedCard, index) => (
          <div key={index} className="interpretation">
            <h3 className="interpretation-title">
              {selectedCard.title}: {selectedCard.card.name}
            </h3>
            <p className="interpretation-text">
              {selectedCard.type === 'situation' 
                ? situationInterpretations[selectedCard.card.name]
                : selectedCard.type === 'challenge'
                ? challengeInterpretations[selectedCard.card.name]
                : adviceInterpretations[selectedCard.card.name]}
            </p>
          </div>
        ))}
      </div>

      <button 
        className="new-reading-button"
        onClick={resetConsultation}
      >
        Realizar outra consulta
      </button>
    </div>
  );
};

export default ReadingResult;