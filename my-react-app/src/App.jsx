import React from 'react';
import './index.css';
import './styles.css';
import Header from './components/Header';
import Hero from './components/Hero';
import InfoBlock from './components/InfoBlock';

export default function App() {
  return (
    <div className="main-container">
      <Header />
      <Hero />
      <InfoBlock />
    </div>
  );
}
