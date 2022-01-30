import React from 'react';
import { StartButton, InviteButton } from '../../widgets/Buttons'
import styles from './style.module.css';
import avatarList from '../../../globals/AvatarList';
import {Link} from 'react-router-dom';

function PlayerIcon({ i, name }) {
    return (
        <div className={styles.playerIcon}>
            <img className={styles.pfp} src={`resources/pfps/${avatarList[i]}`} />
            <p>name</p>
        </div>
    );
}
function TitlePage() {

    return (
        <div className={styles.container}>
            <div className={styles.playerContainer}>
                {
                    players.map((player) => {
                        return (
                            <PlayerIcon i={player.pic} name={player.username} />
                        );
                    })}
            </div>
            <div>
                <div style={{ marginBottom: '24px' }}>
                <Link to="/game"><StartButton /></Link>
                </div>
                <InviteButton />
            </div>
        </div>
    )
}

export default TitlePage;

const players = [
    {
        pic: 0,
        username: 'hi',
    },
    {
        pic: 0,
        username: 'hi',
    },
    {
        pic: 0,
        username: 'hi',
    },
    {
        pic: 0,
        username: 'hi',
    },
    {
        pic: 0,
        username: 'hi',
    },
    {
        pic: 0,
        username: 'hi',
    },
    {
        pic: 0,
        username: 'hi',
    },
    {
        pic: 0,
        username: 'hi',
    },
    {
        pic: 1,
        username: 'hi',
    },
    {
        pic: 0,
        username: 'hi',
    },
    {
        pic: 0,
        username: 'hi',
    },
    {
        pic: 0,
        username: 'hi',
    },
];