import React, { useRef, useState, useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";

import NavBar from "../../components/Navbar";
import Login from "./Login";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import sign_up_pic from "../../assets/images/signup.svg";
import backendUrl from "../../../src/constants.js";
import axios from "axios";
import LoadingSpinner from "../../components/loadingComponent";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";
import "./auth.css";

function FormFloatingBasicExample() {
  const [isPopup, setisPopup] = useState(false);
  const [userOtp, setUserOtp] = useState("0");
  const [enteredOtp, setEnteredOtp] = useState("");
  const username = useRef(null);
  const password = useRef(null);
  const confirmPassword = useRef(null);
  const name = useRef(null);
  const email = useRef(null);
  const [btnDisable, setbtnDisable] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const handleValidation = () => {
    // console.log(data.password.length);
    if (name.current.value === "") {
      setNameError(true);
    } else {
      setNameError(false);
    }

    // if username contains any special symbol or space then set usernameError to true
    if (!username.current.value.match(/^[a-zA-Z0-9]+$/)) {
      setUsernameError(true);
    } else {
      setUsernameError(false);
    }
    // if password and confirm password are not same then set confirmPasswordError to true
    if (password.current.value !== confirmPassword.current.value) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
    }

    // if password is less than 8 characters then set passwordError to true
    if (password.current.value.length < 8) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }

    // if email is not valid then set emailError to true
    if (!email.current.value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }

    // if any of the above conditions are true then return
  };
  const handleRegister = async () => {
    if (name.current.value.length === 0)
      return Promise.reject(new Error("Whoops!"));

    if (
      nameError ||
      usernameError ||
      passwordError ||
      confirmPasswordError ||
      emailError
    ) {
      return Promise.reject(new Error("Whoops!"));
    } else {
      const data = {
        username: username.current.value,
        password: password.current.value,
        name: name.current.value,
        email: email.current.value,
      };
      // use axios
      let resp;
      try {
        setbtnDisable(true);
        resp = await axios.post(`${backendUrl}/users/register/`, data);
        setbtnDisable(false);
        if (resp.status === 200) {
          // console.log("Successfully registered!");
          // localStorage.setItem("token", resp.data.accessToken);

          // return Promise.resolve();
          // prompt user to enter otp
          setisPopup(true);
          console.log(resp.data.otp);
          setUserOtp(resp.data.otp);
        }
      } catch (err) {
        setbtnDisable(false);

        console.log("Error in registration!");
        // show an error toast
        toast.error("User already exists!");
      }
      // console.log("After axios", resp);
    }
  };
  const handleSubmit = async (e) => {
    handleRegister();
    // const registerToast = await toast.promise(handleRegister, {
    //   pending: "The registration is yet to go through",
    //   success: "You are successfully registered",
    //   error: "User already exists LW",
    // });
  };
  const finalRegister = async () => {
    const data = {
      username: username.current.value,
      password: password.current.value,
      name: name.current.value,
      email: email.current.value,
    };
    const resp = await axios.post(
      `${backendUrl}/users/register/verified/`,
      data
    );
    if (resp.status === 201) {
      console.log("Successfully registered!");
      localStorage.setItem("token", resp.data.accessToken);

      // show a success toast saying "You are successfully registered"
      setbtnDisable(false);
      toast.success("You are successfully registered");
      navigate("/");
    } else {
      setbtnDisable(false);
      toast.error("Something went wrong in registration");
    }
  };

  useLayoutEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/";
    }
  }, []);
  return (
    <>
      <Popup
        open={isPopup}
        position="right center"
        modal
        onClose={() => {
          setEnteredOtp("");
          setisPopup(false);
        }}
      >
        <h5>Enter your OTP</h5>
        <p>Please enter the verification code sent to your email</p>
        <OtpInput
          shouldAutoFocus={true}
          // inputType={"number"}
          containerStyle={{
            height: "5rem",
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            marginBottom: "10px",
          }}
          value={enteredOtp}
          onChange={(otp) => setEnteredOtp(otp)}
          inputStyle={{
            color: "purple",
            width: "3rem",
            height: "3rem",
            borderRadius: "0.5rem",
            border: "1px solid #ccc",
            fontSize: "1.5rem",
            textAlign: "center",
          }}
          numInputs={6}
          separator={<span> </span>}
          renderInput={(props) => <input {...props} />}
        />

        <button
          className="otp-btn"
          onClick={() => {
            setEnteredOtp("");
            setisPopup(false);
          }}
        >
          Cancel
        </button>

        <button
          className="otp-btn otp-confirm"
          onClick={() => {
            console.log(userOtp, enteredOtp);
            if (userOtp == enteredOtp) {
              setEnteredOtp("");
              setisPopup(false);
              toast.success("OTP verified!");
              finalRegister();
              // toast.promise(deleteData, {
              //   pending: "The donation is yet to be deleted",
              //   success: "OTP verified! Donation deleted",
              //   error: "Error deleting donation",
              // });
            } else {
              toast.error("Incorrect OTP");
            }
          }}
        >
          Confirm
        </button>
      </Popup>
      <NavBar bg="black" />
      <Container>
        <Row>
          <Col md={{ span: 4, offset: 2 }}>
            <div className="mt-5 mb-5">
              <h1>Sign up</h1>
            </div>
            <Form noValidate onChange={handleValidation}>
              <FloatingLabel
                controlId="floatingInput"
                label="User Name"
                className="mb-3"
              >
                <Form.Control
                  ref={username}
                  placeholder="name@example.com"
                  isInvalid={usernameError}
                />
                {/* {usernameError && (
                <Form.Control.Feedback type="invalid">
                Please choose a username.
              </Form.Control.Feedback>
              )} */}
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Name"
                className="mb-3"
              >
                <Form.Control
                  ref={name}
                  placeholder="name@example.com"
                  isInvalid={nameError}
                />
                {/* {nameError && (
                <p className="text-danger">Enter a valid name</p>
              )} */}
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Email address"
                className="mb-3"
              >
                <Form.Control
                  ref={email}
                  placeholder="name@example.com"
                  isInvalid={emailError}
                />
                {/* {emailError && (
                <p className="text-danger">Enter a valid email</p>
              )} */}
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Password"
                className="mb-3"
              >
                <Form.Control
                  ref={password}
                  type="password"
                  placeholder="Password"
                  isInvalid={passwordError}
                />
                {/* {passwordError && (
                <p className="text-danger">Password must be atleast 8 characters</p>
              )} */}
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingPassword"
                label="Confirm Password"
                className="mb-3"
              >
                <Form.Control
                  ref={confirmPassword}
                  type="password"
                  placeholder="Password"
                  isInvalid={confirmPasswordError}
                />
                {/* {confirmPasswordError && (
                <p className="text-danger">Password and confirm password must be same</p>
              )} */}
              </FloatingLabel>
              <Button
                variant="primary"
                className="bg-primary-300"
                onClick={handleSubmit}
                disabled={btnDisable}
              >
                {btnDisable ? <LoadingSpinner height="20px" /> : "Submit"}
              </Button>{" "}
            </Form>
            <p className="mt-1 text-muted">
              <Link to="/login">Already have a account?</Link>
            </p>
          </Col>
          <Col className="d-flex ">
            <Image
              src={sign_up_pic}
              style={{ width: "70%", height: "60%", marginTop: "25%" }}
              rounded
            />
          </Col>
        </Row>
      </Container>
      <ToastContainer theme="dark" limit={3} />
    </>
  );
}

export default FormFloatingBasicExample;
