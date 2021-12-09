import mock_dataActividades from './mock_dataActividades.json'
import React, { useMemo } from "react";

const Actividades = () => {
    return (
        <>
            <h1> Most Recent Completed Activities </h1>
            <ul>
                {mock_dataActividades.map((data) => (
                    <li key={data.id}>
                        <p>{data.encargado}: {data.descripcion}</p>                        
                        <p>{data.tipo}</p>
                        <p>{data.fecha}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Actividades;