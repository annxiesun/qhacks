import React from 'react';
import styles from '../style.module.css';

function StartButton({ onClick }) {
    return (
        <button className={styles.button} onClick={onClick}>
            <span className={styles.text}>START</span>
            <img className={styles.icon} src="resources/play.png" />
        </button>
    )
}

export default StartButton;