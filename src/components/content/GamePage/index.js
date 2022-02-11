import React, { useContext, useEffect, useState } from 'react';
import styles from './style.module.css';
import Player from './Player';
import { Form, Row, Col } from 'react-bootstrap';
import { SocketContext } from '../../../socket';
import FadeIn from 'react-fade-in';
import { createWordList } from './utils';
import { create } from 'combined-stream';

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

function GamePage() {
    const [wordList, setWordList] = useState(null);

    useEffect(() => {
        createWordList().then((ret) => {
            console.log('ret', ret);
            setWordList(ret);
            setGameReady(true);
        })
    }, [])

    const isCorrect = (word) => {
        console.log('iscor', wordList.has(word))
        if (word === "") {
            return false;
        }
        if (!wordList.has(word.toUpperCase())) {
            return false;
        }
        return true;
    }

    const [wordArr, setWordArr] = useState(["", "", "LOBSTER"]);
    const [players, setPlayers] = useState(players_default);
    const [currPlayer, setCurrPlayer] = useState(0);

    const [devPlayernum, setDevPlayernum] = useState(0);
    const [time, setTime] = useState(10);
    const [currInterval, setCurrInterval] = useState(null);

    const [gameStart, setGameStart] = useState(false);
    const [gameReady, setGameReady] = useState(false);

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
        });
    }

    var socket = useContext(SocketContext);

    useEffect(() => {
        socket.emit('joinServer', window.sessionStorage.getItem("abc"), 'room1');

        socket.on('userUpdateGame', setPlayers);

        return () => socket.disconnect();
    }, [])

    const updateLife = (player, num) => {
        setPlayers((arr) => {
            const newArr = JSON.parse(JSON.stringify(arr));
            newArr[player].lives -= 1;
            return newArr;
        });
    }

    const loseLife = () => {
        //console.log(currPlayer, devPlayernum, currPlayer === parseInt(devPlayernum));
        updateLife(parseInt(currPlayer), -1);
    }

    const startTimer = () => {
        setTime(10);
        var times = 0;
        var time_interval = setInterval(() => {
            setTime((t) => {
                if (t === 0) return 10;
                return t - 1;
            });
            times += 1;
            if (times >= 10) {
                loseLife();
                clearInterval(time_interval);
                nextPlayer();
                console.log("curr:", currPlayer)
            }
        }, 200);
        setCurrInterval(time_interval);
    }

    useEffect(() => {
        if (gameStart) startTimer();
    }, [currPlayer, gameStart]);

    const onUpdateWord = (word) => {
        setWordArr((arr) => {
            const newArr = JSON.parse(JSON.stringify(arr));
            newArr.shift();
            newArr.push(word.toUpperCase());
            return newArr;
        });
        nextPlayer();
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            //console.log('hi')
            if (isCorrect(e.target.value)) {
                onUpdateWord(e.target.value);
                console.log(e.target.value, "true")
            }
            e.target.value = "";

            e.Handled = true;
        }
    }

    const startGame = () => {
        if (gameReady) setGameStart(true);
    }

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

                    <Form.Control disabled={currPlayer !== 0 && players[currPlayer].lives > 0 && gameStart} onKeyDown={onKeyDown} autocomplete="off" />
                </Form.Group>
            </div>
            <div className={styles.devcontrols}>
                <button onClick={startGame}>start timer</button>
                <button onClick={() => nextPlayer()}>nextPlayer</button>
                <button onClick={() => setTime(10)}>reset timer</button>
                <button onClick={loseLife}>lose life</button><input placeholder="player #"
                    value={devPlayernum} onChange={(e) => setDevPlayernum(e.target.value)} />
                <input onKeyDown={onKeyDown} />
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