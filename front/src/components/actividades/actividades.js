import mock_dataActividades from './mock_dataActividades.json'
import React, { useMemo } from "react";
import dateFormat, { masks } from "dateformat";
import { Stack } from 'react-bootstrap';

const Actividades = (props) => {


    var activities = props.activities;
    if( !activities ||!Array.isArray(activities)) activities = []

    return (
         <>
            <h1> Ultimas actividades </h1>

<Stack gap={2} className="col-md-5 mx-auto">
             <ul>
                 {activities.map((data) => (
                     <li key={data._id}>
                         <p>{data.name}: {data.descripcion}</p>                        
                         <p>{data.encargado}</p>
                         <p>{dateFormat(Date.parse(data.deadline), "dd, mmmm yyyy")}</p>
                     </li>
                 ))}
             </ul>

</Stack>

         </>
     )

}

export default Actividades;