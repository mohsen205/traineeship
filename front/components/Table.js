import React, { useMemo } from 'react'
import { useTable, useSortBy, useGlobalFilter } from 'react-table';
import UpDown from './util/upDown';
import styles from 'styles/dashboard.module.css'
const Table = ({ list, COLUMNS }) => {
    const tableInstance = useTable({
        columns: COLUMNS,
        data: list
    }, useGlobalFilter, useSortBy)

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        state,
        setGlobalFilter,
        prepareRow } = tableInstance

    const { globalFilter } = state

    return (
        <div>
            <div className={`${styles.search}`}>
                <input type="text"
                    value={globalFilter || ''}
                    onChange={(e) => setGlobalFilter(e.target.value)}
                    className={`${styles.input} form-input`}
                    placeholder="Search" />
            </div>
            <table {...getTableProps()} className={`${styles.table} table table-hover`}>
                <thead>
                    {
                        headerGroups.map((headerGroup, number) => {
                            return (
                                <tr key={number} {...headerGroup.getHeaderGroupProps()}>
                                    {
                                        headerGroup.headers.map((column, number) => {
                                            return (
                                                <th key={number} {...column.getHeaderProps(column.getSortByToggleProps())} className="text-muted fw-normal ">
                                                    <div className="d-inline-block">
                                                        {column.render('Header')}
                                                    </div>
                                                    <div className="d-inline-block">
                                                        {column.isSorted ? (column.isSortedDesc ? <UpDown sorted='1' /> : <UpDown sorted='2' />) : <UpDown sorted='0' />}
                                                    </div>
                                                </th>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map((row, number) => {
                            prepareRow(row)
                            return (
                                <tr key={number}{...row.getRowProps()}>
                                    {
                                        row.cells.map((cell, number) => {
                                            return (
                                                <td key={number} {...cell.getCellProps()}>
                                                    {cell.render('Cell')}
                                                </td>
                                            )
                                        })
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
export default Table