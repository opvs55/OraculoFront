// src/pages/CardDetailPage.jsx

import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ReadingContext } from '../context/ReadingContext';
import { POSICOES_CRUZ_CELTA } from '../constants/tarotConstants';
import { getDidacticMeaning } from '../services/aiService'; // Importamos a nova função
import styles from './CardDetailPage.module.css';
import Chat from '../components/Chat/Chat';

function CardDetailPage() {
  const { position } = useParams();
  const { drawnCards, cardInterpretations, question } = useContext(ReadingContext);
  
  // Novo estado para o texto didático e seu carregamento
  const [didacticText, setDidacticText] = useState('');
  const [isLoadingMeaning, setIsLoadingMeaning] = useState(true);

  const positionIndex = parseInt(position, 10) - 1;

  // useEffect para buscar o significado didático quando a página carrega
  useEffect(() => {
    // Garante que temos as cartas antes de tentar buscar
    if (drawnCards.length > 0) {
      const card = drawnCards[positionIndex];
      const positionName = POSICOES_CRUZ_CELTA[positionIndex];
      
      setIsLoadingMeaning(true);
      getDidacticMeaning(card.nome, card.invertida ? 'Invertida' : 'Normal', positionName)
        .then(data => {
          setDidacticText(data.didacticText);
        })
        .catch(err => {
          console.error(err);
          setDidacticText('Não foi possível carregar o significado arquetípico desta combinação.');
        })
        .finally(() => {
          setIsLoadingMeaning(false);
        });
    }
  }, [position, drawnCards, positionIndex]); // Roda o efeito se a posição ou as cartas mudarem


  if (drawnCards.length === 0) {
    return <main><p>Carta não encontrada. <Link to="/">Inicie uma nova leitura</Link>.</p></main>;
  }
  
  const card = drawnCards[positionIndex];
  const interpretation = cardInterpretations[positionIndex];
  const positionName = POSICOES_CRUZ_CELTA[positionIndex];
  const chatContext = `A pergunta original foi "${question}". A carta em análise é "${card.nome} ${card.invertida ? '(Invertida)' : ''}" na posição "${positionName}". A interpretação inicial foi: "${interpretation || 'Nenhuma.'}"`;

  return (
    <main>
      <div className={styles.container}>
        <Link to="/resultado" className={styles.backLink}>← Voltar para a tiragem completa</Link>
        
        <div className={styles.cardDisplay}>
          <img 
            src={card.img} 
            alt={card.nome} 
            className={`${styles.cardImage} ${card.invertida ? styles.inverted : ''}`} 
          />
          <div className={styles.cardInfo}>
            <h3 className={styles.positionName}>{positionName}</h3>
            <h1 className={styles.cardName}>{card.nome} {card.invertida ? '(Invertida)' : ''}</h1>
          </div>
        </div>

        {/* Bloco do novo texto didático */}
        <div className={styles.didacticBox}>
          <h4>O Significado Arquetípico</h4>
          {isLoadingMeaning ? (
            <p className={styles.loadingText}>Carregando sabedoria...</p>
          ) : (
            <p>{didacticText}</p>
          )}
        </div>
        
        {/* Bloco da interpretação personalizada */}
        <div className={styles.interpretationBox}>
          <h4>Análise para sua Pergunta</h4>
          <p className={styles.context}><em>"{question}"</em></p>
          <p className={styles.interpretationText}>{interpretation}</p>
        </div>
        
        <Chat chatContext={chatContext} />
      </div>
    </main>
  );
}

export default CardDetailPage;