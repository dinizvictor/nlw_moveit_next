import { useState, useEffect, useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import { CountdownContext } from '../contexts/CountdownContext';
import styles from '../styles/components/Countdown.module.css'

export function Countdown(){

    const {
            minutes,
            seconds, 
            hasFinished, 
            isActive, 
            resetCountdown, 
            startCountdown
        } = useContext(CountdownContext);

    /* Preenche com 0 à esquerda se não houver 2 caracteres e separa os números */
    const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('');
    const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('');

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
            {/*if ternário sem else*/}
            { hasFinished ? (
                <button
                    disabled
                    className={styles.countdownButton}
                >
                    
                    Ciclo encerrado
            
                </button>
            ) : (

                <>{/* Tag fragment >> Utilizada para sanar a limitação do react
                      >> Usar {{}}. É necessário fazer {<>{}</>} */}
                    {/* if ternário */}
                    {isActive ? (
                        <button 
                            type="button"
                            className={styles.countdownButton+" "+styles.countdownButtonActive}
                            onClick={resetCountdown}
                        >
                            
                            Abandonar ciclo
                        
                        </button>
                    ) : (
                        <button 
                            type="button" 
                            className={styles.countdownButton}
                            onClick={startCountdown}
                        >
                            
                            Iniciar um ciclo
                        
                        </button>
                    )}
                </>

            )
            }

        </div>

    );


}