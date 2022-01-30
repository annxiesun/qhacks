import React, { useState } from 'react';
import StartButton from '../../widgets/Buttons/StartButton';
import styles from './style.module.css';
import { Form, Row, Col } from 'react-bootstrap';
import avatarList from '../../../globals/AvatarList';
import { Link, useNavigate } from 'react-router-dom';

function CreatePage() {
    let navigate = useNavigate();
    const [avatar, setAvatar] = useState(0);

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

    const onSubmit = () => {
        navigate('/lobby');
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

            <Form onSubmit={onSubmit}>
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