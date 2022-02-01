import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css';
import Player from './Player';
import { Form, Row, Col } from 'react-bootstrap';
import {SocketContext} from '../../../socket';
import FadeIn from 'react-fade-in';

function Timer({ time }) {
    return (
        <div className={styles.clock}>
            <div style={{ position: "relative", width: "80px", height: "80px" }}>
                <img className={styles.clockimage} src={"resources/clock.png"} />
                <div className={styles.timetext}>{time}</div>
            </div>
        </div>
    )
}
function Words({ wordArr }) {

    return (
        <div className={styles.wordsContainer}>
            <div className={styles.overlay} />
            <FadeIn className={styles.fadebox} >
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
    const [wordArr, setWordArr] = useState(["", "", "LOBSTER"]);
    const [players, setPlayers] = useState(players_default);
    const [currPlayer, setCurrPlayer] = useState(0);

    const [devPlayernum, setDevPlayernum] = useState(0);
    const [time, setTime] = useState(10);

    const nextPlayer = () => {
        setCurrPlayer((c) => {
            let cc = c + 1;
            if (cc >= players.length) {
                cc = 0;
            }
            console.log(players[cc].lives)
            while (players[cc].lives <= 0) {
                console.log(cc);
                cc += 1;
                console.log(cc);
                if (cc >= players.length) {
                    cc = 0;
                } else {
                    continue;
                }
            }
            return cc;
        })
    }

    var socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit('joinServer', window.sessionStorage.getItem("abc"), 'room1');

        socket.on('userUpdateGame', setPlayers);

         return () => socket.disconnect();
    }, [])

    const updateLife = (player, num) => {
        setPlayers((arr) => {
            console.log("hi")
            const newArr = JSON.parse(JSON.stringify(arr));
            newArr[player].lives -=1;
            return newArr;
        });
    }

    const devLoseLife = () => {
        console.log(currPlayer, devPlayernum, currPlayer === parseInt(devPlayernum));
        //updateLife(parseInt(devPlayernum), -1);
        //if(currPlayer === parseInt(devPlayernum)) nextPlayer();
    }

    const devStartTimer = () => {
        var times = 0;
        var interval = setInterval(() => {
            setTime((t) => {
                if (t === 0) return 10;
                return t - 1;
            });
            times += 1;
            if (times === 10) {
    
                nextPlayer();
                updateLife(currPlayer, -1);
            }
        }, 1000);
    }

    const onUpdateWord = (word) => {
        setTime(10);
        //devStartTimer();
        setWordArr((arr) => {
            const newArr =  JSON.parse(JSON.stringify(arr));
            newArr.shift();
            //console.log(e.target.value);
            newArr.push(word.toUpperCase());
            return newArr;
        });
        //console.log(wordArr);
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            //console.log('hi')
            if (isCorrect(e.target.value)) {
                onUpdateWord(e.target.value);
            }
            e.target.value = "";

            e.Handled = true;
        }
    }
    console.log("hi");
    return (
        <div className={styles.container}>
            <Timer time={time} />
            <div className={styles.playerContainer}>
                {players.map((player, i) => {
                    return (
                        <Player active={currPlayer === i} i={player.pic} name={player.username} lives={player.lives} />
                    )
                })}
            </div>

            <div className={styles.centerSection}>
                <Words wordArr={wordArr} />
                <Form.Group className="mb-3 w-100 flex flex-column align-items-center" controlId="formBasicEmail">
                    <Form.Label>{"Type word that start's with "} {wordArr[2][wordArr[2].length - 1]}</Form.Label>

                    <Form.Control disabled={currPlayer !== 0 && players[currPlayer].lives > 0}onKeyDown={onKeyDown} autocomplete="off" />
                </Form.Group>
            </div>
            <div className={styles.devcontrols}>
                <button onClick={devStartTimer}>start timer</button>
                <button onClick={() => setTime(10)}>reset timer</button>
                <button onClick={devLoseLife}>lose life</button><input placeholder="player #"
                    value={devPlayernum} onChange={(e) => setDevPlayernum(e.target.value)} />
                    <input onKeyDown={onKeyDown}/>
            </div>
        </div>
    )
}

const players_default = [
    {
        pic: 0,
        username: 'Gavin',
        lives: 2,
    },
    {
        pic: 1,
        username: 'Robbie',
        lives: 2,
    },
    {
        pic: 2,
        username: 'Annie',
        lives: 2,
    },
    {
        pic: 3,
        username: 'Chris',
        lives: 2,
    },
];

export default GamePage;