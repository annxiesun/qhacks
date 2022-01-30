import React, { useState } from 'react';
import styles from './style.module.css';
import Player from './Player';
import { Form, Row, Col } from 'react-bootstrap';
import FadeIn from 'react-fade-in';

function Words({ wordArr }) {

    return (
        <div className={styles.wordsContainer}>
            <div className={styles.overlay} />
            <FadeIn className={styles.fadebox} key={Math.random()}>
                <p className={styles.pastWord}>{wordArr[0]}</p>
                <p className={styles.pastWord}>{wordArr[1]}</p>
                <p className={styles.lastWord}>{wordArr[2].substring(0, wordArr[2].length - 1)}
                    <b>{wordArr[2][wordArr[2].length - 1]}</b>
                </p>
            </FadeIn>
        </div>
    )
}

function isCorrect(word) {
    if (word === "") {
        return false;
    }
    return true;
}
function GamePage() {
    const [wordArr, setWordArr] = useState(["QUIRKY", "QUIRK", "KEEMSTAR"]);

    const onUpdateWord = (e) => {
        /*
        const newArr = wordArr;
        newArr.shift();
        newArr.push(e.target.value);
        setWordArr(newArr);
        console.log("update word");*/

        setWordArr((arr) => {
            const newArr = [...arr];
            newArr.shift();
            //console.log(e.target.value);
            newArr.push(e.target.value);
            return newArr;
        });
        //console.log(wordArr);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            //console.log('hi')
            if(isCorrect(e.target.value)) {
                onUpdateWord(e);
            }
            e.target.value = "";

        }
    }
    console.log("hi");
    return (
        <div className={styles.container}>
            <div className={styles.playerContainer}>
                {players.map((player) => {
                    return (
                        <Player i={player.pic} name={player.username} lives={player.lives} />
                    )
                })}
            </div>
            <div className={styles.centerSection}>
                <Words wordArr={wordArr} />
                <Form.Group className="mb-3 w-100 flex flex-column align-items-center" controlId="formBasicEmail">
                    <Form.Label>Type word that start's with</Form.Label>

                    <Form.Control onKeyDown={onKeyDown} autocomplete="off" />
                </Form.Group>
            </div>
            <div className={styles.devcontrols}>
                <button>start timer</button>
                <button>lose life</button><input placeholder="player #" />
            </div>
        </div>
    )
}

const players = [
    {
        pic: 0,
        username: 'hi',
        lives: 2,
    },
    {
        pic: 0,
        username: 'hi',
        lives: 2,
    },
    {
        pic: 0,
        username: 'hi',
        lives: 2,
    },
    {
        pic: 0,
        username: 'hi',
        lives: 2,
    },
    {
        pic: 0,
        username: 'hi',
        lives: 2,
    },
    {
        pic: 0,
        username: 'hi',
        lives: 2,
    },
    {
        pic: 0,
        username: 'hi',
        lives: 2,
    },
    {
        pic: 0,
        username: 'hi',
        lives: 2,
    },
    {
        pic: 1,
        username: 'hi',
        lives: 2,
    },
    {
        pic: 0,
        username: 'hi',
        lives: 2,
    },
    {
        pic: 0,
        username: 'hi',
        lives: 2,
    },
    {
        pic: 0,
        username: 'hi',
        lives: 2,
    },
];

export default GamePage;