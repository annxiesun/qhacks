import React, { useState } from 'react';
import styles from './style.module.css';
import avatarList from '../../../../globals/AvatarList';


function Player({ i, name, lives}) {
    let lives_display = [];
    for(let i = 0; i < lives; i++) {
        lives_display.push(<img className={styles.life} src="/resources/heart.png"/>);
    }

    return (
        <div className={styles.container}>
                    <p className={styles.p}>{name}</p>
        <img className={`${styles.pfp} ${(lives <= 0) && styles.dead }`} src={`resources/pfps/${avatarList[i]}`} />
        <div className={styles.livesContainer}>
        {lives_display}
        </div>
        </div>
    )
}

export default Player;