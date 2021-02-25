import Head from 'next/head'

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      {/* Forma de alteração do HEAD com o Next.js >> 
          Específico para o Index */}
      
      <Head>

        <title>Início | MoveIT</title>

      </Head>
  
      <ExperienceBar />
      <CountdownProvider> {/* Colocado aqui, pois só aparecerá na home. */}
        <section>
          <div>
            <Profile />
            <CompletedChallenges />
            <Countdown />
          </div>
          <div>
            <ChallengeBox />
          </div>
        </section>
      </CountdownProvider>
    </div>
  )
}
