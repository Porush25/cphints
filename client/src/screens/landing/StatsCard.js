import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";

import bg1 from "../../assets/images/bg/bg1.jpg";
import bg2 from "../../assets/images/bg/bg2.jpg";
import bg3 from "../../assets/images/bg/bg3.jpg";
import bg4 from "../../assets/images/bg/bg4.jpg";
import bg5 from "../../assets/images/bg/bg5.jpg";
import bg6 from "../../assets/images/bg/bg6.jpg";
import "../landing/landing.css";

const StatsCard = () => {
  return (
    <>
      <motion.h1
        className="text-heading mb-4 text-center text-purplee d-block"
        whileInView={{ y: 0, opacity: 1 }}
        initial={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        Supported Platforms
      </motion.h1>
      <Container
        style={{ width: "90%", minHeight: "50vh" }}
        className="mb-3 py-2 rounded-5 text-md-start"
      >
        <Row className="d-flex justify-content-evenly my-5 gap-3">
          <motion.div
            className="col-12 col-lg-3  rounded position-relative overflow-hidden p-2"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            style={{
              backgroundImage: `url(${bg2})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "9em",
            }}
          >
            <h4
              className="text-white position-absolute start-0 bottom-0"
              style={{ transform: "translate(10%,-15%)" }}
            >
              Striver's SDE sheet
            </h4>
          </motion.div>
          <motion.div
            className="col-12 col-lg-3  rounded position-relative overflow-hidden p-2"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            style={{
              backgroundImage: `url(${bg1})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "9em",
            }}
          >
            <h4
              className="text-white position-absolute start-0 bottom-0"
              style={{ transform: "translate(15%,-15%)" }}
            >
              LeetCode
            </h4>
          </motion.div>
          <motion.div
            className="col-12 col-lg-3  rounded position-relative overflow-hidden p-2"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            style={{
              backgroundImage: `url(${bg4})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "9em",
            }}
          >
            <h4
              className="text-white position-absolute start-0 bottom-0"
              style={{ transform: "translate(10%,-15%)" }}
            >
              Geeks For Geeks
            </h4>
          </motion.div>
        </Row>
        <Row
          style={{ height: "35%" }}
          className="d-flex justify-content-evenly my-5 gap-3"
        >
          
          <motion.div
            className="col-12 col-lg-3  rounded position-relative overflow-hidden p-2"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            style={{
              backgroundImage: `url(${bg5})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "9em",
            }}
          >
            <h4
              className="text-white position-absolute start-0 bottom-0"
              style={{ transform: "translate(10%,-15%)" }}
            >
              Coding Ninjas
            </h4>
          </motion.div>

          <motion.div
            className="col-12 col-lg-3  rounded position-relative overflow-hidden p-2"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            style={{
              backgroundImage: `url(${bg3})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "9em",
            }}
          >
            <h4
              className="text-white position-absolute start-0 bottom-0"
              style={{ transform: "translate(10%,-15%)" }}
            >
              CodeForces
            </h4>
          </motion.div>
          <motion.div
            className="col-12 col-lg-3  rounded position-relative overflow-hidden p-2"
            whileInView={{ y: 0, opacity: 1 }}
            initial={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.1 }}
            style={{
              backgroundImage: `url(${bg6})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "9em",
            }}
          >
            <h4
              className="text-white position-absolute start-0 bottom-0"
              style={{ transform: "translate(10%,-15%)" }}
            >
              CodeChef
            </h4>
          </motion.div>
        </Row>
        
      </Container>
    </>
  );
};

export default StatsCard;
