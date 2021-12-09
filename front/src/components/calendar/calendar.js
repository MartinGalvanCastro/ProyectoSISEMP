import React, {useState} from "react";
import Calendar from "react-awesome-calendar";
import "./calendar.css";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";



const eventConstructor = (event) => {
  if (event) {
    console.log(event)
    const newDates = event.dates.map((x) => new Date(x));
    return {
      id: event._id,
      from: newDates[0],
      to: newDates[1],
      title: event.eventName,
      color: "#ADD8E6",
    };
  }
};

const EventCalendar = (props) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [initDate,setInitDate] = useState({})
  const user = props.user;
  const events = user.events?.map((event) => eventConstructor(event));
  const setUpdate = props.setUpdate


  const onClicklTimeLine = (date) => {
    const hour = Math.trunc(date.hour)
    const minutes = Math.round((date.hour%1)*60)
    const newDate = new Date(date.year,date.month,date.day,hour,minutes*60)
    handleShow()
    setInitDate(newDate.toISOString())
  };

  const RenderModal = () => {
    const [values, setValues] = useState({});

    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setValues({ ...values, [name]: value });
    };

    const handleSubmit = (event) => {
      event.preventDefault();
      const data = {
        eventName:values.name,
        dates:[initDate, new Date(values.end).toISOString()],
        participants:[user._id]
      }
      setUpdate(true);
      axios
        .post("http://localhost:3000/event/", data)
        .then(handleClose())
        .catch((err) => alert(err.message));
    };

    const RenderForm = (handleSubmit, handleChange) => {
      return (
        <Form onChange={handleChange} onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Nombre del Evento</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa el nombre del evento"
              name="name"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="deadline">
            <Form.Label>Fecha Limite</Form.Label>
            <Form.Control
              type="datetime-local"
              name="end"
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
      <Row>
        <h2>Event Calendar of {user.name}</h2>
      </Row>
      <Row>
        <div id="calendar-container">
          <Calendar events={events} onClickTimeLine={onClicklTimeLine} />
        </div>
      </Row>
      {RenderModal()}
    </>
  );
};

export default EventCalendar;
