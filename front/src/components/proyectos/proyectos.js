import React, { useMemo } from "react";
import { COLUMNS } from "./columns";
import mock_data from './mock_data.json'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { Table } from "react-bootstrap"
import "./proyectos.css"
import dateFormat, { masks } from "dateformat";



const Proyectos = (props) => {


    var projects = props.projects;
    if( !projects ||!Array.isArray(projects)) projects = []

    console.log(projects)
    return (
        <>
            <h1> Listado de Proyectos </h1>

            <Table stripped borderded hover>
                <thead>
                    <th>Nombre</th>
                    <th>Descripcion</th>
                    <th>Estado</th>
                    <th>Fecha Limite</th>
                </thead>
                <tbody>
                {projects?.map((project) => (
                        <tr>
                            <td>{project?.name}</td>
                            <td>{project?.description}</td>
                            <td>{project?.status}</td>
                            <td>{dateFormat(project?.deadline, "dd, mmmm yyyy")}</td>
                        </tr>

                    ))}
                </tbody>
            </Table>
        </>
    )
}

export default Proyectos;