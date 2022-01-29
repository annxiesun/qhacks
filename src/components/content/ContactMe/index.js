import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Lottie from "react-lottie";

import paperAirplane from '../../../animations/airplane.json';
import './style.css';
import Fade from 'react-reveal/Fade';


function Input({ value, label, disabled, updateInfo }) {
  return (
    <div className="contact-input-container">
      <div id={`${label}-label`} className={`contact-label ${value === '' ? 'contact-label-unfocused' : 'contact-label-focused'}`}>{label}</div>
      <input
        className="contact-input"
        onChange={(e) => updateInfo(label, e.target.value)}
        value={value}
        disabled={disabled}
        id={`${label}-input`}
      />
    </div>
  );
}

function ContactMe({ id }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isStopped, setIsStopped] = useState(true);

  const submitEmail = async (e) => {
    e.preventDefault();

    const inputs = [
      { label: 'name', value: name },
      { label: 'email', value: email },
      { label: 'message', value: message }
    ];

    setSubmitted(true);

    let invalid = false;
    const checkInput = (label, value) => {
      const shakeInput = (el) => {
        setTimeout(() => { el.classList.add('shake') }, 500);
        el.classList.remove('shake');
      }

      if (!validateInfo(label, value)) {
        const inputEl = document.getElementById(`${label}-input`);
        if (label !== 'message') {
          const labelEl = document.getElementById(`${label}-label`);
          shakeInput(labelEl);
        }
        shakeInput(inputEl);
        invalid = true;
        setSubmitted(false);
      }
    }

    inputs.forEach((input) => {
      checkInput(input.label, input.value);
    });

    if (invalid) {
      return;
    }

    setIsStopped(false);
    setTimeout(() => { setSent(true) }, 2000);

    const route = encodeURI("/send");
    const response = await fetch(route, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        "email": email,
        "name": name,
        "message": message,
      },
    })
      .then((res) => { res.json() })
      .then(async (res) => {
        const resData = await res;
        console.log(resData);
        if (resData.status === "success") {
          alert("Message Sent");
        } else if (resData.status === "fail") {
          alert("Message failed to send");
        }
      })
      .catch((err) => {
        console.log(err);
      })
  };

  const updateInfo = (label, newValue) => {
    switch (label) {
      case 'name':
        setName(newValue);
        break;
      case 'email':
        setEmail(newValue);
        break;
      case 'message':
        setMessage(newValue);
        break;
    }
  }

  const validateInfo = (label, value) => {
    if (value === '') return false;
    switch (label) {
      case 'email':
        if (value.indexOf('@') === -1) {
          return false;
        }
    }
    return true;
  }

  const inputs = [
    { label: 'name', value: name },
    { label: 'email', value: email },
  ];

  const paperAirplaneAnimation = {
    animationData: paperAirplane,
    loop: false,
    autoplay: false,
  };

  return (
    <div id={id} className="section">
      <Fade>
        <div className="contact-container section-container">
          <div className="h3 bold">Contact Me</div>
          <div className="body header-text">turn your idea into reality...</div>
          <br />
          {!sent &&
            <form className="form-container">
              {inputs.map((input) => (
                <Input
                  value={input.value}
                  label={input.label}
                  disabled={submitted}
                  updateInfo={updateInfo}
                />
              ))}
              <div className="contact-textarea-container">
                <textarea
                  placeholder="Type your message here..."
                  className="contact-textarea"
                  onChange={(e) => updateInfo('message', e.target.value)}
                  value={message}
                  disabled={submitted}
                  id="message-input"
                />
              </div>
              <button className="submit-button" onClick={submitEmail} disabled={submitted}>
                Send
              </button>
              <div className="paper-anim">
                <Lottie options={paperAirplaneAnimation} isStopped={isStopped} isClickToPauseDisabled />
              </div>
            </form>
          }
        </div>
      </Fade>
    </div>
  );
}

ContactMe.propTypes = {
  id: PropTypes.string.isRequired
}

export default ContactMe;