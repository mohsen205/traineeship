export const COLUMNS = [
    {
        Header: 'Name',
        accessor: 'displayName'
    },
    {
        Header: 'Symbol',
        accessor: 'symbol'
    },
    {
        Header: 'Open',
        accessor: 'regularMarketPrice'
    },
    {
        Header: 'High',
        accessor: 'regularMarketDayHigh'
    },
    {
        Header: 'Low',
        accessor: 'regularMarketDayLow'
    },
    {
        Header: 'Chang',
        accessor: 'regularMarketChange',
        Cell: ({ value }) => { return Number(Number(value).toFixed(2)) }
    },
    {
        Header: 'Chang%',
        accessor: 'regularMarketChangePercent',
        Cell: ({ value }) => { return Number(Number(value).toFixed(2)) }
    },
    {
        Header: 'Vol',
        accessor: 'regularMarketVolume'
    },
    {
        Header: 'Time',
        accessor: 'regularMarketTime'
    }
]
