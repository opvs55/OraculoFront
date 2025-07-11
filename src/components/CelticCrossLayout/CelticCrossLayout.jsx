// src/components/CelticCrossLayout/CelticCrossLayout.jsx

import React from 'react';
import Card from '../Card/Card';
import { POSICOES_CRUZ_CELTA } from '../../constants/tarotConstants';
import styles from './CelticCrossLayout.module.css';

// A CORREÇÃO ESTÁ AQUI, NA LINHA DA FUNÇÃO:
// Estamos dizendo: "pegue a propriedade 'cards' e também a propriedade 'cardAs'.
// Renomeie 'cardAs' para uma variável chamada 'CardLink' (com 'C' maiúsculo, pois é um componente).
// Se 'cardAs' não for fornecida, use uma 'div' como padrão."
function CelticCrossLayout({ cards, cardAs: CardLink = 'div' }) {
  
  if (!cards || cards.length === 0) return null;

  return (
    <div className={styles.gridContainer}>
      {cards.map((card, index) => (
        // AGORA O 'CardLink' EXISTE E PODE SER USADO AQUI.
        // Se for uma 'div', ele não terá a propriedade 'to', o que está correto.
        // Se for um <Link>, ele receberá a propriedade 'to' e funcionará como um link.
        <CardLink
          key={card.id}
          to={CardLink !== 'div' ? `/resultado/carta/${index + 1}` : undefined}
          className={styles.cardLink}
        >
          <div className={`${styles.cardPosition} ${styles[`position${index + 1}`]}`}>
            <Card cardData={card} positionName={POSICOES_CRUZ_CELTA[index]} />
          </div>
        </CardLink>
      ))}
    </div>
  );
}

export default CelticCrossLayout;