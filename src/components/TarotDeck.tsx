import React, { useState } from 'react';
import { useTarot } from '../context/TarotContext';
import TarotCard from './TarotCard';

const TarotDeck: React.FC = () => {
  const { cards, readingStep, selectCard } = useTarot();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const getTitle = () => {
    switch (readingStep) {
      case 'first':
        return 'Escolha a primeira carta';
      case 'second':
        return 'Escolha a segunda carta';
      case 'third':
        return 'Escolha a última carta';
      default:
        return '';
    }
  };

  const handleCardSelect = (card: any, index: number) => {
    if (isTransitioning) return;
    
    setSelectedIndex(index);
    setIsTransitioning(true);

    setTimeout(() => {
      selectCard(card);
    }, 1000);
  };

  return (
    <div className="tarot-deck-container">
      <h2 className="deck-title">{getTitle()}</h2>
      <div className="tarot-deck">
        {cards.map((card, index) => (
          <TarotCard 
            key={card.id} 
            card={card} 
            index={index}
            isSelected={selectedIndex === index}
            isTransitioning={isTransitioning}
            total={cards.length}
            onSelect={() => handleCardSelect(card, index)}
          />
        ))}
      </div>
    </div>
  );
};

export default TarotDeck;