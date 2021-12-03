import React from "react";
import "./header.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Qdit from "./QDit.jpg";
const renderImage = (src, alt, id) =>{
  return <img src={src} alt={alt} id={id} className="img-fluid"/>
}

const Header = (props) => {
  const user = props.user
  return (
    <>
      <Row className="align-items-center" id="main-header">
        <Col md={2} id="enterprise">
          {renderImage(Qdit,"logo","logo")}
        </Col>
        <Col md={6}>
          <h2>Project Managment Dashboard</h2>
        </Col>
        <Col md={4}>
        <Row className="align-items-center">
            <Col className="align-self-end" id="porfile">
            {renderImage(user.porfilePic,"poriflePic","porfile-pic")}
            </Col>
            <Col className="align-self-start">
              {user.name}
            </Col>
        </Row>
        </Col>
      </Row>
    </>
  );
};

export default Header;
