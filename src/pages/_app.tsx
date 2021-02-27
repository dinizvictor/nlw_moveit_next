
import '../styles/global.css'; //CSS sempre será importado através do JavaScript

import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext'
import { useState } from 'react';
import { CountdownProvider } from '../contexts/CountdownContext';

function MyApp({ Component, pageProps }) {
  //Os componentes que ficam aqui são acessíveis em todas as páginas.
  return (
    
      <Component {...pageProps} /> 
      
    );
}

export default MyApp
