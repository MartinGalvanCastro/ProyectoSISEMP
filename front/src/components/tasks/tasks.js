import React, { useMemo } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Table } from "react-bootstrap"
import dateFormat, { masks } from "dateformat";



const Tasks = (props) => {


    var user = props.user;

    console.log(user.assignedTask)
    return (
        <>
            <h1> Tareas Pendientes </h1>

            <ul>
                {
                     user.asignedTask?.map((data) => (
                         <li key={data._id}>
                             <p>{data.name}: {data.description}</p>
                             <p>{data.status}</p>
                             <p>{data.deadline}</p>
                             <p>{data.priority}</p>
                         </li>
                     ))
                }
             </ul> 
        </>
    )
}

export default Tasks;