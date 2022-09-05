export const COLUMNS = [
    {
        Header: 'Name',
        accessor: 'displayName',
        style: {
            fontWeight: 'bolder',
        }
    },
    {
        Header: 'Symbol',
        accessor: 'symbol'
    },
    {
        Header: 'Last',
        accessor: 'regularMarketPreviousClose'
    },
    {
        Header: 'CHG%',
        accessor: 'regularMarketChangePercent',
        Cell: ({ value }) => { return Number(Number(value).toFixed(2)) }
    },
    {
        Header: 'CHG',
        accessor: 'regularMarketChange',
        Cell: ({ value }) => { return Number(Number(value).toFixed(2)) },
    },
    {
        Header: 'Technical Analysis',
        accessor: 'buy',
    },
    {
        Header: 'Vol',
        accessor: 'regularMarketVolume'
    },

]

