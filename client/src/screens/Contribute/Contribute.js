import React, { useState,useRef, useEffect } from "react";
import { Accordion, Container } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import { FloatingLabel, Form, Button } from "react-bootstrap";
import backendUrl from '../../../src/constants.js';
import axios from 'axios';

import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Contribute = () => {
  const [ipFields, setIPFields] = useState([0]);
  const [num, setNum] = useState(1);
  const [inputValues, setInputValues] = useState([]);
  const qlink = useRef(null);
  const submitHint = async (data,token) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    const resp = await axios.post(
      `${backendUrl}/hints/`,
      data
    );
    if (resp.status === 201) {
      return Promise.resolve();
    } else {
      return Promise.reject(new Error("Whoops!"));
    }
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    const token = await localStorage.getItem("token");
    // console.log(token);
    const data = {
      hints: inputValues,
      qlink: qlink.current.value,
    };
    // use axios
    // console.log(jwt_decode(token));
    // console.log(data);
    
    const loginToast = await toast.promise(submitHint(data,token), {
      pending: "The hint is yet to go through",
      success: "Your hint has been added sucessfully",
      error: "Something went wrong",
    });
    // console.log(resp.status);
  }

  const handleAdd = () => {
    if (num >= 5) {
      return;
    }
    setNum((prev) => prev + 1);
    const New = [...ipFields, num];
    setIPFields(New);
  };

  const handleRemove = () => {
    if (num <= 1) {
      return;
    }

    setNum((prev) => prev - 1);
    ipFields.pop();
  };
  // check if user is logged in through local storage token else redirect him to home page
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/signup";
    }
  }, []);

  return (
    <>
      <div style={{ backgroundColor: "#0d0e14", minHeight: "100vh" }}>
        <Navbar bg="black" />

        <Container>
          <h1 className="text-white text-start mt-5">Contribute a Hint</h1>

          <Form>
            <FloatingLabel
              controlId="floatingInput"
              label="Enter the question link"
              className="my-4"
              style={{ width: "55%" }}
            >
              <Form.Control type="text" ref={qlink} placeholder="www.example.com" />
            </FloatingLabel>

            {ipFields.map((ipFiled, i) => {
              return (
                <div className="d-flex">
                  <Accordion style={{ width: "40%" }} className="my-2 me-3">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>{i==0?"Pre-requisite":`Hint ${i + 1}`}</Accordion.Header>
                      <Accordion.Body>
                        <FloatingLabel
                          controlId="floatingTextarea"
                          label={i==0?"Pre-requisite":"Hint " + (i + 1)}
                          className="my-3"
                          style={{ width: "100%" }}
                          key={i}
                        >
                          <Form.Control
                            as="textarea"
                            type="text"
                            onChange={(event) => {
                              const newInputValues = [...inputValues];
                              newInputValues[i] = event.target.value;
                              setInputValues(newInputValues);
                            }}
                            placeholder={i==0?"Pre-requisite":"Enter Hint"}
                            style={{ height: "100px" }}
                          />
                        </FloatingLabel>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  {i === ipFields.length - 1 ? (
                    i !== 0 ? (
                      <Button
                        className="btn-danger text-white my-auto me-2"
                        size="lg"
                        style={{ width: "2.5em" }}
                        onClick={() => handleRemove()}
                      >
                        -
                      </Button>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}

                  {i === ipFields.length - 1 ? (
                    i !== 4 ? (
                      <Button
                        className="btn-success text-white my-auto ms-1"
                        size="lg"
                        style={{ width: "2.5em" }}
                        onClick={() => handleAdd()}
                      >
                        +
                      </Button>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
            <Button variant="submit" className="d-block btn-purplee mt-4 " onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Container>
        <ToastContainer theme='dark' limit={3}/>

      </div>
    </>
  );
};

export default Contribute;
