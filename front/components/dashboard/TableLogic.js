import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Table from '../Table'
import { COLUMNS } from './COLUMNS'
import Spinner from 'react-bootstrap/Spinner'
const TableLogic = ({ data }) => {
    const [trend, setTrend] = useState([])
    const [error, setError] = useState('')
    useEffect(() => {
        const listSymbol = []
        data.map(d => listSymbol.push(d.symbol))
        axios.get(`https://yfapi.net/v6/finance/quote?region=US&lang=en&symbols=${listSymbol.join(',')}`, {
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': 'Cq6vR2Fo6s9qmfap8xbKR483omRKGLd25mXTAzpc'
            }
        }).then(response => {
            setTrend(response.data.quoteResponse.result)
        }).catch(error => setError(error))
    }, [data])
    return (
        <>
            {
                error || !trend ?
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '500px' }}>
                        <Spinner animation="border" variant="info" />
                    </div>
                    : <Table list={trend} COLUMNS={COLUMNS} />
            }
        </>
    )
}
export default TableLogic