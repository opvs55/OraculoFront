// src/context/ReadingContext.jsx
import React, { createContext, useState, useCallback } from 'react';
import { sortearCruzCelta } from '../services/tarotService';
import { getInterpretation } from '../services/aiService';

export const ReadingContext = createContext();

export function ReadingProvider({ children }) {
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState([]);
  const [mainInterpretation, setMainInterpretation] = useState('');
  const [cardInterpretations, setCardInterpretations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateReading = useCallback(async (userQuestion) => {
    setIsLoading(true);
    setError(null);
    setQuestion(userQuestion);

    try {
      const cards = sortearCruzCelta();
      setDrawnCards(cards);

      const { mainInterpretation, cardInterpretations } = await getInterpretation(userQuestion, cards);
      setMainInterpretation(mainInterpretation);
      setCardInterpretations(cardInterpretations);

      return true; // Sucesso
    } catch (err) {
      setError(err.message || "Erro desconhecido.");
      return false; // Falha
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    question,
    drawnCards,
    mainInterpretation,
    cardInterpretations,
    isLoading,
    error,
    generateReading
  };

  return (
    <ReadingContext.Provider value={value}>
      {children}
    </ReadingContext.Provider>
  );
}