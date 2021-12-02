import React, { useMemo } from "react";
import { useTable } from 'react-table'
import { COLUMNS } from "./columns";
import mock_data from './mock_data.json'
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {Table} from "react-bootstrap"
import "./proyectos.css"

const Proyectos = () => {

    const columns = useMemo(() => COLUMNS, [])

    const data = useMemo(() => mock_data, [])

    const tableInstance = useTable({
        columns, data
    })

    const { getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = tableInstance
    return (
        <>
            <h1> Listado de Proyectos </h1>

            <Table stripped borderded hover {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) =>
                        (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map( (column) => (
                                        <th {...column.getHeaderProps()}> {column.render('Header')}</th>
                                    ))
                                }
                            </tr>

                        ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell) => {
                                        return <td {...cell.getCellProps()}>
                                                {cell.render('Cell')}
                                            </td>
                                        })}
                                </tr>                                
                            )
                        })
                    }
                </tbody>
            </Table>
        </>
    )
}

export default Proyectos;