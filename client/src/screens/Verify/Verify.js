import React, { useState } from "react";
import { Stepper } from "react-stepper-stylable";
import { Hash } from "react-bootstrap-icons";
import { Button, Row, Col, Form, Container } from "react-bootstrap";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import backendUrl from '../../../src/constants.js';
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
let username = "";
const Component1 = () => {
  return (
    <div>
      {" "}
      <Form>
        <Form.Group
          className="m-auto"
          style={{ width: "100%" }}
          controlId="formBasicEmail"
        >
          <Row className="justify-content-center">
            {/* <Col className="col-3"></Col> */}
            <Col className="col-2">
              <Form.Label>Codeforces handle</Form.Label>
            </Col>
            <Col className="col-3">
              <Form.Control
                type="text"
                placeholder="Enter handle (case sensitive)"
                onChange={(e) => (username = e.target.value)}
              />
              {/* <Col className="col-3"></Col> */}
              <Form.Text className="text-muted">
                Your hints will be given priority over others.
              </Form.Text>
            </Col>
          </Row>
        </Form.Group>
      </Form>
    </div>
  );
};

const Component2 = () => {
  return (
    <div style={{ width: "50%", margin: "auto" }}>
      Login to your <b>{username}</b> account and Go to{" "}
      <b>
        <a
          className="text-primary-100"
          href="https://codeforces.com/contest/1578/problem/C"
        >
          C. Cactus Lady and her Cing
        </a>{" "}
      </b>
      problem and submit a compilation error or just submit this code below in
      any language
      <br />
      <pre
        style={{ backgroundColor: "black", width: "fit-content" }}
        className="mt-4 m-auto"
      >
        <code className="text-white">
          cout{"<<"}I love CPHints{"<<endl;"}
        </code>
      </pre>
    </div>
  );
};
const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Verification under process</div>;
  }

  return (
    <div className="timer">
      <div className="timer-text text-muted">Remaining</div>
      <div className="timer-value fs-2">{remainingTime}</div>
      <div className="timer-text text-muted">seconds</div>
    </div>
  );
};
const submitVerification = async () => {
  const token = localStorage.getItem("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  console.log(token);
  const data = {
    handle: username,
  };

  const resp = await axios.post(`${backendUrl}/hints/verify/`, data);
  if (resp.status === 200) {
    return Promise.resolve();
  } else {
    return Promise.reject(new Error("Whoops!"));
  }
};
const handleVerification = async () => {
  if(username === ""){
    toast.error("Please enter your codeforces handle");
    return;
  }
  const VerificationToast = await toast.promise(submitVerification, {
    pending: "The verification process has started",
    success: "You are successfully verified",
    error: "You are not verified! Please follow the steps again",
  });
};
const Component3 = () => {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      Please wait for about 2 minutes until we verify your submission
      <CountdownCircleTimer
        isPlaying
        duration={10}
        colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
        colorsTime={[120, 60, 30, 0]}
        onComplete={handleVerification}
        className="pt-5"
      >
        {renderTime}
      </CountdownCircleTimer>
    </div>
  );
};

const Verify = () => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = [
    {
      title: "Enter codeforces username",
      content: <Component1 />,
    },
    {
      title: "Submit compilation error",
      content: <Component2 />,
    },
    {
      title: "Wait for verification",
      content: <Component3 />,
    },
  ];
  return (
    <div>
      <Stepper steps={steps} activeStep={activeStep} />
      <Row>
        <Col>
          {activeStep > 0 && (
            <Button
              variant="danger"
              onClick={() => {
                activeStep > 0 && setActiveStep(activeStep - 1);
              }}
            >
              Previous
            </Button>
          )}
        </Col>
        <Col>
          {activeStep < 2 && (
            <Button
              variant="success"
              onClick={() => {
                activeStep < 2 && setActiveStep(activeStep + 1);
              }}
            >
              Next
            </Button>
          )}
        </Col>
      </Row>
      <ToastContainer/>
    </div>
  );
};

export default Verify;
