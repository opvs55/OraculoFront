// src/pages/ResultsPage.jsx

import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ReadingContext } from '../context/ReadingContext';
import CelticCrossLayout from '../components/CelticCrossLayout/CelticCrossLayout';
import ReadingDisplay from '../components/ReadingDisplay/ReadingDisplay';
import styles from './ResultsPage.module.css';

function ResultsPage() {
  const { drawnCards, mainInterpretation, question } = useContext(ReadingContext);

  if (drawnCards.length === 0) {
    return (
      <main> {/* Adicionamos o main aqui */}
        <p>Nenhuma leitura encontrada. Por favor, <Link to="/">inicie uma nova leitura</Link>.</p>
      </main>
    );
  }

  return (
    <main> {/* E AQUI TAMBÉM */}
      <div className={styles.container}>
        <h2 className={styles.question}>Sua Pergunta: "{question}"</h2>
        <div className={styles.resultsContainer}>
          <div className={styles.cardsSection}>
            <CelticCrossLayout cards={drawnCards} cardAs={Link} /> 
          </div>
          <div className={styles.readingSection}>
            <ReadingDisplay text={mainInterpretation} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default ResultsPage;