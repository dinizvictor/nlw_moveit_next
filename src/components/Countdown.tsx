import { useState, useEffect } from 'react';
import styles from '../styles/components/Countdown.module.css'

export function Countdown(){

    const [time, setTime] = useState(25 * 60);
    const [active, setActive] = useState(false);
    
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    /* Preenche com 0 à esquerda se não houver 2 caracteres e separa os números */
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

    function startCountdown() { //Função de incremento de valor.

        setActive(true);

    }

    /* Efeitos colaterais: Executa a função cada vez que o valor da
       variável vigiada é alterado. */
    useEffect(()=>{
        /* Função executada cada vez que o valor é alterado na variável */
        if(active && time > 0){
            setTimeout(()=>{
                setTime(time - 1); /* Diminui um segundo do tempo */
            }, 1000); /* setTimeout: Função que executa após determinado intervalo de tempo (1000ms=1s) */
        }

    },[active, time]); /* Valor vigiado >> active: Countdown ativo ou não.
                          time: adicionado para criar um loop, pois, cada vez
                          que o botão é ativado (active = true), time é alterado 
                          também, o que ativa a função do useEffect novamente já
                          que time é um dos valores vigiados. O if impede que o
                          contador fique negativo ou conte sem o botão estar ativo.*/

    return(
        <div>

            <div className={styles.countdownContainer}>
                <div>
                    <span>{minuteLeft}</span>
                    <span>{minuteRight}</span>
                </div>
                <span>:</span>
                <div>
                    <span>{secondLeft}</span>
                    <span>{secondRight}</span>
                </div>
            </div>

            <button 
                type="button" 
                className={styles.countdownButton}
                onClick={startCountdown}>
                Iniciar um ciclo
            </button>

        </div>

    );


}