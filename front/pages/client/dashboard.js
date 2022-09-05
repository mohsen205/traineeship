import React from 'react'
import SideBar from 'components/SideBar'
import MarketOverview from 'components/homeClients/MarketOverview'
import TableLogic from 'components/dashboard/TableLogic'
import Spinner from 'react-bootstrap/Spinner'
const Dashboard = ({ data }) => {
    const result = '' //data.finance.result[0].quotes
    return (
        <SideBar pageName={'Dashboard'}>
            <div className="d-flex w-100 justify-content-between">
                <div className="rounded-1 bg-white p-2 w-75 me-1">
                    <div className="h2 mb-3">
                        Recommend Equity
                    </div>
                    {
                        !result ?
                            <div className="d-flex justify-content-center align-items-center" style={{ height: '500px' }}>
                                <Spinner animation="border" variant="info" />
                            </div> :
                            <TableLogic data={result} />
                    }
                </div>
                <div className="widgets">
                    <MarketOverview />
                </div>
            </div>
        </SideBar>
    )
}

export default Dashboard

export async function getStaticProps() {
    const response = await fetch('https://yfapi.net/v1/finance/trending/US', {
        headers: {
            'Content-Type': 'application/json',
            'X-Api-Key': process.env.API_KEY_YAHOO
        }
    })
    const data = await response.json()
    return {
        props: {
            data: data
        }
    }
}