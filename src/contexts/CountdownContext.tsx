import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { Countdown } from "../components/Countdown";
import { ChallengesContext } from "./ChallengesContext";

interface CountdownContextData{

    minutes: number;
    seconds: number;
    hasFinished: boolean;
    isActive: boolean;
    startCountdown: () => void;
    resetCountdown: () => void;

}

interface CountdownProviderProps {

    children: ReactNode;

}

export const CountdownContext = createContext({} as CountdownContextData);

//Tipagem global para acessar o estado do timeout na função que inicia o Countdown.
let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps){

    const { startNewChallenge } = useContext(ChallengesContext) //Recebendo função do contexto.

    const [time, setTime] = useState(0.1 * 60);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function resetCountdown(){

        clearTimeout(countdownTimeout); //Zerando o timeout.
        setIsActive(false);
        setTime(0.1 * 60);
        setHasFinished(false);

    }

    function startCountdown() { //Função de incremento de valor.

        setIsActive(true);

    }

    /* Efeitos colaterais: Executa a função cada vez que o valor da
       variável vigiada é alterado. */
    useEffect(()=>{
        /* Função executada cada vez que o valor é alterado na variável */
        if(isActive && time > 0){
            countdownTimeout = setTimeout(()=>{
                setTime(time - 1); /* Diminui um segundo do tempo */
            }, 1000); /* setTimeout: Função que executa após determinado intervalo de tempo (1000ms=1s) */
        }
        else if(isActive && time == 0){
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge()
        }

    },[isActive, time]); /* Valor vigiado >> active: Countdown ativo ou não.
                          time: adicionado para criar um loop, pois, cada vez
                          que o botão é ativado (active = true), time é alterado 
                          também, o que ativa a função do useEffect novamente já
                          que time é um dos valores vigiados. O if impede que o
                          contador fique negativo ou conte sem o botão estar ativo.*/

    return(

        <CountdownContext.Provider 
            value={{

                minutes,
                seconds,
                hasFinished,
                isActive,
                startCountdown,
                resetCountdown,
            }}
        >
            {children}
        </CountdownContext.Provider>

    );

} 