import React, { useState, useEffect } from "react";
import Header from "../components/header/header";
import Proyectos from "../components/proyectos/proyectos";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./main.css";
import Actividades from "../components/actividades/actividades";
import EventCalendar from "../components/calendar/calendar";
import Tasks from '../components/tasks/tasks';
import axios from "axios";

const HomeScreen = (props) => {

  const user = props.user;
  const projects = props.projects;
  const task = props.task
  const activities = props.activities
  const allUsers = props.allUsers
  const setUpdate = props.setUpdate

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const RenderModal = () => {
    const [values, setValues] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setValues({ ...values, [name]: value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      values.status = "Levantamiento de Requerimientos";
      values.team = [user._id];
      setUpdate(true)
      axios.post("http://localhost:3000/project/",values).then(handleClose()).catch(err=>alert(err.message))
    };

    const RenderForm = (handleSubmit, handleChange) => {
      return (
        <Form onChange={handleChange} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre del proyecto"
              name="name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Descripcion</Form.Label>
            <Form.Control
              type="text"
              placeholder="Descripción"
              name="description"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="deadline">
            <Form.Label>Fecha Limite</Form.Label>
            <Form.Control
              type="date"
              placeholder="dd/mm/aaaa"
              name="deadline"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      );
    };

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Crear un Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>{RenderForm(handleSubmit, handleChange)}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancelar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      <Header user={user} />
      <Row id="main-content">
        <Row>
          <Col id="calendar" md={8} className="mr-1 mb-1 pd-5">
            <EventCalendar user={user} setUpdate={setUpdate}/>
          </Col>
          <Col id="actividades" md={4} className="ml-1 mb-1">
            <Actividades activities={activities} />  
          </Col>
        </Row>
        <Row>
          <Col id="proyectos" md={8} className="mr-1 mt-1">
            <Proyectos projects={projects} />
            <Button onClick={handleShow}>Agregar un Proyecto</Button>
            {RenderModal()}
          </Col>
          <Col id="tareas" md={4} className="ml-1 mt-1">          
          <Tasks user={user}/>
          </Col>
        </Row>
      </Row>
    </>
  );
};

export default HomeScreen;
