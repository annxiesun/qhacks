import React from 'react';
import StartButton from '../../widgets/Buttons/StartButton';
import styles from './style.module.css';
import { Link } from 'react-router-dom';

function TitlePage() {
    return (
        <div className={styles.container}>
        <img className={styles.logo}src="resources/logo.png" />
        <Link to="/create"><StartButton /></Link>
        </div>
    )
}

export default TitlePage;