import React from "react";
import Header from "../components/header/header";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./main.css";
import EventCalendar from "../components/calendar/calendar";

const HomeScreen = (props) => {
  const user = props.user;
  return (
    <>
      <Header user={user} />
      <Row id="main-content">
        <Row>
          <Col id="calendar" md={8} className="mr-1 mb-1 pd-5">
            <EventCalendar user={user} />
          </Col>
          <Col id="actividades" md={4} className="ml-1 mb-1">
            <h1>PlaceHolder</h1>
          </Col>
        </Row>
        <Row>
          <Col id="proyectos" md={8} className="mr-1 mt-1">
            <h1>PlaceHolder</h1>
          </Col>
          <Col id="tareas" md={4} className="ml-1 mt-1">
            <h1>PlaceHolder</h1>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default HomeScreen;
