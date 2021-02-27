import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ChallengeBox } from '../components/ChallengeBox';
import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdown } from '../components/Countdown';
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from '../components/Profile';
import { CountdownProvider } from '../contexts/CountdownContext';

import styles from '../styles/pages/Home.module.css'
import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';
import { prependOnceListener } from 'process';

interface HomeProps{

  level: number;
  currentExperience: number;
  challengesCompleted: number;

}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
      level={props.level}
      currentExperience={props.currentExperience}
      challengesCompleted={props.challengesCompleted}
    >
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
    </ChallengesProvider>
  )
}

//Método que executa direto no Node >> É executado antes da renderização da página.
//Antes da camada do Browser.
export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const {level, currentExperience, challengesCompleted} = ctx.req.cookies;

  return{

    props: {

      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted)

    }

  }

}