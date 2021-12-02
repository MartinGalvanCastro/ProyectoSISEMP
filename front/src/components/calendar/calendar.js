import React from 'react'
import Calendar from 'react-awesome-calendar';
import './calendar.css'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const eventConstructor = (event) =>{
    return{
        id:event._id,
        from:event.dates[0],
        to:event.dates[1],
        title:event.eventName,
        color:'#ADD8E6'
    }
}


const EventCalendar =  (props)=>{
    const user = props.user
    const events = user.events?.map(event=>{eventConstructor(event)})
    return (
    <>
        <Row>
        <h2>Event Calendar</h2>
        </Row>
        <Row>
            <div id='calendar-container'><Calendar events = {events}/></div>
        </Row> 
    </>)
}

export default EventCalendar