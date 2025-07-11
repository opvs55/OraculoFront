// src/pages/HomePage.jsx

import React, { useContext, useState } from 'react'; // Importamos o useState
import { useNavigate } from 'react-router-dom';
import { ReadingContext } from '../context/ReadingContext';
import QuestionForm from '../components/QuestionForm/QuestionForm';
import Loader from '../components/common/Loader/Loader';
import styles from './HomePage.module.css';

// 1. Definimos a lista com os caminhos dos seus vídeos
const listaDeVideos = [
  '/assets/video1.mp4',
  '/assets/video2.mp4',
  '/assets/video3.mp4',
  '/assets/video4.mp4',
  '/assets/video5.mp4'
  // Adicione quantos vídeos quiser aqui
];

function HomePage() {
  const { isLoading, generateReading } = useContext(ReadingContext);
  const navigate = useNavigate();

  // 2. Criamos um estado para guardar o índice do vídeo que está tocando
  const [videoAtualIndex, setVideoAtualIndex] = useState(0);

  // 3. Esta função será chamada quando um vídeo terminar
  const handleVideoEnd = () => {
    console.log(`Vídeo ${videoAtualIndex + 1} terminou. Trocando para o próximo.`);
    // Usamos a mágica do módulo (%) para criar um loop
    // Ex: Se temos 3 vídeos, (0+1)%3=1, (1+1)%3=2, (2+1)%3=0
    setVideoAtualIndex((prevIndex) => (prevIndex + 1) % listaDeVideos.length);
  };

  const handleStartReading = async (question) => {
    const success = await generateReading(question);
    if (success) {
      navigate('/resultado');
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.homeContainer}>
      
      {/* 4. ATUALIZAÇÃO NO ELEMENTO DE VÍDEO */}
      <video
        // A 'key' é crucial. Ao mudar a key, o React destrói o vídeo antigo
        // e cria um novo, forçando o carregamento do novo 'src'.
        key={videoAtualIndex}
        autoPlay          // Toca automaticamente
        muted             // Essencial para o autoplay na maioria dos navegadores
        playsInline       // Essencial para o autoplay no mobile
        onEnded={handleVideoEnd} // Chama nossa função quando o vídeo acaba
        className={styles.videoFundo}
      >
        {/* O 'src' agora é dinâmico, baseado no nosso estado */}
        <source src={listaDeVideos[videoAtualIndex]} type="video/mp4" />
        Seu navegador não suporta o elemento de vídeo.
      </video>

      <div className={styles.videoOverlay}></div>

      <div className={styles.conteudoCentralizado}>
        <h1 className={styles.mainTitle}>Oráculo de Tarot IA</h1>
        <p className={styles.subtitle}>
          Desvende as energias que te cercam. Faça uma pergunta, concentre-se e permita que as cartas revelem seus insights.
        </p>
        <QuestionForm onSubmit={handleStartReading} disabled={isLoading} />
      </div>

    </div>
  );
}

export default HomePage;