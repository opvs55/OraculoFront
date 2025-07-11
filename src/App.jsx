// src/App.jsx

import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ReadingProvider } from './context/ReadingContext';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import CardDetailPage from './pages/CardDetailPage';
import './styles/globals.css';

function App() {
  return (
    <ReadingProvider>
      <BrowserRouter>
        {/* A TAG <main> FOI REMOVIDA DAQUI */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/resultado" element={<ResultsPage />} />
          <Route path="/resultado/carta/:position" element={<CardDetailPage />} />
        </Routes>
      </BrowserRouter>
    </ReadingProvider>
  );
}

export default App;