import React, { createContext, useState, useContext, useCallback } from 'react';
import { shuffleArray } from '../utils/shuffle';
import { tarotCards } from '../data/tarotData';
import { TarotCard, ReadingStep, SelectedCard } from '../types/tarot';

interface TarotContextType {
  cards: TarotCard[];
  readingStep: ReadingStep;
  selectedCards: SelectedCard[];
  startConsultation: () => void;
  selectCard: (card: TarotCard) => void;
  proceedToNextStep: () => void;
  resetConsultation: () => void;
}

const TarotContext = createContext<TarotContextType | null>(null);

export const useTarot = () => {
  const context = useContext(TarotContext);
  if (context === null) {
    throw new Error('useTarot deve ser usado dentro de um TarotProvider');
  }
  return context;
};

export const TarotProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards, setCards] = useState<TarotCard[]>([]);
  const [readingStep, setReadingStep] = useState<ReadingStep>('initial');
  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);
  const [currentCard, setCurrentCard] = useState<SelectedCard | null>(null);

  const startConsultation = useCallback(() => {
    const shuffledCards = shuffleArray([...tarotCards]);
    setCards(shuffledCards);
    setReadingStep('first');
    setSelectedCards([]);
    setCurrentCard(null);
  }, []);

  const selectCard = useCallback((card: TarotCard) => {
    if (readingStep === 'first' || readingStep === 'second' || readingStep === 'third') {
      const newCard: SelectedCard = {
        card,
        type: readingStep === 'first' ? 'situation' : readingStep === 'second' ? 'challenge' : 'advice',
        title: readingStep === 'first' ? 'Situação' : readingStep === 'second' ? 'Desafio' : 'Conselho'
      };
      
      setCurrentCard(newCard);
      setSelectedCards(prev => [...prev, newCard]);
      
      if (readingStep === 'third') {
        setTimeout(() => {
          setReadingStep('result');
        }, 5000);
      }
    }
  }, [readingStep]);

  const proceedToNextStep = useCallback(() => {
    setCurrentCard(null);
    setReadingStep(current => {
      switch (current) {
        case 'first':
          return 'second';
        case 'second':
          return 'third';
        default:
          return current;
      }
    });
  }, []);

  const resetConsultation = useCallback(() => {
    setReadingStep('first');
    setSelectedCards([]);
    setCurrentCard(null);
    const shuffledCards = shuffleArray([...tarotCards]);
    setCards(shuffledCards);
  }, []);

  return (
    <TarotContext.Provider 
      value={{ 
        cards, 
        readingStep, 
        selectedCards,
        currentCard,
        startConsultation, 
        selectCard, 
        proceedToNextStep,
        resetConsultation 
      }}
    >
      {children}
    </TarotContext.Provider>
  );
};