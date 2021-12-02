import React from 'react'
import  Header  from "../components/header/header";
import Proyectos from "../components/proyectos/proyectos"
import Col from "react-bootstrap/Col"
import Row from "react-bootstrap/Row"
import Actividades from '../components/actividades/actividades';



const HomeScreen = () =>{
    return(
    <>
    <Header/>
    <Proyectos />
    <Actividades/>
    <Row>

    </Row>
    </>
    )
}

export default HomeScreen