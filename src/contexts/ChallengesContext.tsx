import { createContext, useState, ReactNode, useEffect } from 'react';
import challenges from '../../challenges.json';
import Cookies from 'js-cookie';
import { LevelUpModal } from '../components/LevelUpModal';


/*Definindo que dentro do componente de contexto
  teremos um children também do tipo componente.
  Isso permite que em _app.tsx componentes sejam
  colocados dentro deste componente.*/
interface ChallengesProviderProps {

    children: ReactNode;
    level: number;
    currentExperience: number;
    challengesCompleted: number;

}

//Objeto Challenge
interface Challenge {

    type: 'body' | 'eye';
    description: string;
    amount: number;

}

//Definindo um tipo do TypeScript para autocompletar os dados retornados peloi contexto e seus tipos.
interface ChallengesContextData {

    level: number;
    currentExperience: number;
    challengesCompleted: number;
    experienceToNextLevel: number;
    activeChallenge: Challenge; //Boa prática criar uma interface ao invés de usar object.
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;

}

//Contexto >> Comunicação entre componentes
export const ChallengesContext = createContext({} as ChallengesContextData); //Definindo a interface para os dados do contexto.

/* ChallengesProvider cria o contexto de challenges
   com os estados e as funções de alteração que chamam
   os sets para criar novos valores para os estados
   abaixo e mantém os componentes internos onde for 
   chamado através do children. O value em Provider
   define o contexto, permitindo que os componentes
   em children possam usar os dados do contexto.*/
export function ChallengesProvider({ children, ...rest }: ChallengesProviderProps){

    const [level, setLevel] = useState(rest.level ?? 1);
    const [currentExperience, setCurrentExperience] = useState(rest.currentExperience ?? 0);
    const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ?? 0);
    const [activeChallenge, setActiveChallenge] = useState(null);
    
    const [isLevelUpModalOpen, setisLevelUpModalOpen] = useState(false);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    /* useEffect com o segundo parâmetro sendo um array vazio
       significa que ele será executado somente uma vez no momento
       da criação do componente da tela. */
    useEffect(()=>{

        Notification.requestPermission();

    },[])

    useEffect(()=>{

        Cookies.set('level', String(level));
        Cookies.set('currentExperience', String(currentExperience));
        Cookies.set('challengesCompleted', String(challengesCompleted));

    },[level, currentExperience, challengesCompleted])

    function levelUp(){
        setLevel(level + 1);
        setisLevelUpModalOpen(true);
    }

    function closeLevelUpModal() {
        setisLevelUpModalOpen(false);
    }

    function startNewChallenge(){
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];

        setActiveChallenge(challenge);

        new Audio('/notification.mp3').play();

        if (Notification.permission == "granted"){

            new Notification('Novo desafio', {
                body: 'Valendo '+challenge.amount+' xp!'
            })

        }
    }

    function resetChallenge(){

        setActiveChallenge(null);

    }

    function completeChallenge(){

        if(!activeChallenge){
            return;
        }

        const { amount } = activeChallenge; //Desestruturação do amount dentro do challenge (valor constante)
        let finalExperience = currentExperience + amount; //Declaração de variável (let it change)

        if (finalExperience >= experienceToNextLevel){
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }

        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengesCompleted(challengesCompleted + 1);

    }

    return(

        <ChallengesContext.Provider 
            value={{ 
                level, 
                currentExperience, 
                challengesCompleted,
                experienceToNextLevel,
                activeChallenge,
                levelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal }}
        > {/* Todos os elementos dentro do provider terão acesso aos dados e funções do contexto */}
            {children} {/* Definindo que haverão outros componentes (ReactNode) dentro do componente de contexto ChallengesProvider */}
            {isLevelUpModalOpen && <LevelUpModal />/*LevelUpModal será mostrado se o state for true.*/} 
        </ChallengesContext.Provider>  
    
    );

}