import styles from '../styles/components/Profile.module.css';

export function Profile(){

    return(
        <div className={styles.profileContainer}>
            <img src="https://github.com/victordinizwho.png" alt="Victor Diniz"/>
            <div>
                <strong>Victor Diniz</strong>
                <p>
                    <img src="icons/level.svg" alt="Level"/>
                    Level 1
                </p>
            </div>
        </div>
    );

}