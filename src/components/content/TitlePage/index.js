import React from 'react';
import StartButton from '../../widgets/Buttons/StartButton';
import styles from './style.module.css';


function TitlePage() {
    return (
        <div className={styles.container}>
        <img className={styles.logo}src="resources/logo.png" />
        <StartButton />
        </div>
    )
}

export default TitlePage;