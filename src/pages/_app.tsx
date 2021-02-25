
import '../styles/global.css'; //CSS sempre será importado através do JavaScript

import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext'
import { useState } from 'react';
import { CountdownProvider } from '../contexts/CountdownContext';

function MyApp({ Component, pageProps }) {
  
  return (
    
    <ChallengesProvider>
      <CountdownProvider>
      
        <Component {...pageProps} /> {/* Children de ChallengesProvider */}
      
      </CountdownProvider>
    </ChallengesProvider>
    )
}

export default MyApp
