//CSS Único para o Componente ExperienceBar (Não afeta outros componentes)
import styles from '../styles/components/ExperienceBar.module.css'

//Componente ExperienceBar
export function ExperienceBar() {

    return (

        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>

                <div style={{ width: "50%" }} />

                <span className={styles.currentExperience} style={{ left: "50%" }}>
                    300 xp
                </span>

            </div>
            <span>600 xp</span>
        </header>

    );

}