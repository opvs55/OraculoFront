// src/components/Chat/Chat.jsx

import React, { useState, useEffect, useRef } from 'react';
import styles from './Chat.module.css';
import { getChatResponse } from '../../services/aiService'; 

function Chat({ chatContext }) {
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Pergunte o que quiser sobre esta carta e sua posição na leitura...' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messageListRef = useRef(null);

  // Efeito para rolar para a última mensagem
  useEffect(() => {
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const { aiResponse } = await getChatResponse(currentInput, chatContext);
      const modelMessage = { role: 'model', text: aiResponse };
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      const errorMessage = { role: 'model', text: 'Desculpe, não consegui processar sua pergunta agora. Tente novamente.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.chatContainer}>
      <div className={styles.messageList} ref={messageListRef}>
        {messages.map((msg, index) => (
          <div key={index} className={`${styles.message} ${styles[msg.role]}`}>
            {msg.text}
          </div>
        ))}
        {isLoading && <div className={`${styles.message} ${styles.model} ${styles.loading}`}><span>.</span><span>.</span><span>.</span></div>}
      </div>
      <form onSubmit={handleSendMessage} className={styles.inputForm}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Elabore sua dúvida..."
          disabled={isLoading}
          autoComplete="off"
        />
        <button type="submit" disabled={isLoading}>Enviar</button>
      </form>
    </div>
  );
}

export default Chat;