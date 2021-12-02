import React from "react";
import "./header.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Qdit from "./QDit.jpg";

const Header = () => {
  return (
    <>
      <Row>
        <Col md={2}>
        <img src={Qdit} alt="logo" className="img-fluid" id="logo"/>
        </Col>
        <Col md={6}>
          <h1>Project Managment Dashboard</h1>
        </Col>
        <Col>
        <Row>
            <Col>
            </Col>
            <Col>
            </Col>
        </Row>
        </Col>
      </Row>
    </>
  );
};

export default Header;
