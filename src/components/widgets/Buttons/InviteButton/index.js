import React from 'react';
import styles from '../style.module.css';

function InviteButton({ onClick }) {
    return (
        <button className={styles.button}>
            <span className={styles.text}>INVITE</span>
            <img className={styles.icon2} src="resources/mail.png" />
        </button>
    )
}

export default InviteButton;