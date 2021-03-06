import React, { useContext, useEffect, useState } from 'react';
import StartButton from '../../widgets/Buttons/StartButton';
import styles from './style.module.css';
import { Form, Row, Col } from 'react-bootstrap';
import avatarList from '../../../globals/AvatarList';
import { Link, useNavigate } from 'react-router-dom';
import {SocketContext} from '../../../socket';

function CreatePage() {
    let navigate = useNavigate();
    const [avatar, setAvatar] = useState(0);
    const [user, setUser] = useState("");

    var socket = useContext(SocketContext);

    const nextAvatar = () => {
        if (avatar == avatarList.length - 1) {
            setAvatar(0);
        } else {
            setAvatar(a => a + 1);
        }
    }

    const lastAvatar = () => {
        if (avatar == 0) {
            setAvatar(avatarList.length - 1);
        } else {
            setAvatar(a => a - 1);
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const user = e.target[0].value;
        socket.emit('setUser', window.sessionStorage.getItem("abc"), user, avatar);
        window.location.href = '/lobby';
        console.log(avatar);
        console.log(window.location.href);
    }

    return (
        <div className={styles.container}>
            <div className={styles.chooseContainer}>
                <button className={styles.arrowbtn} onClick={lastAvatar}>
                    <img className={styles.arrow} src="resources/arrow.svg" />
                </button>

                <img className={styles.image} src={`resources/pfps/${avatarList[avatar]}`} />

                <button className={styles.arrowbtn} onClick={nextAvatar}>
                    <img className={`${styles.arrow} ${styles.arrow2}`} src="resources/arrow.svg" />
                </button>
            </div>

            <Form onSubmit={(e) => onSubmit(e)}>
                <Form.Group className="mb-3 w-100 flex flex-column align-items-center" controlId="formBasicEmail">
                    <Form.Label>Enter your name:</Form.Label>
                    <Row>
                        <Col xs={10}>
                    <Form.Control placeholder="Username" />
                    </Col>
                    <Col xs={2}>
                    <button className={styles.gobtn}>
                        <img className={styles.play} src="/resources/play.png" />
                    </button>
                    </Col>
                    </Row>
                </Form.Group>
            </Form>
        </div >
    )
}

export default CreatePage;