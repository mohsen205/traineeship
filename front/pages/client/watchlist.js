import React, { useState } from 'react'
import SideBar from 'components/SideBar'
import Title from 'components/Title'
import styles from 'styles/watchlist.module.css'
import TableLogic from 'components/watchlist/TableLogic'
import jwt from "next-auth/jwt"
import jwt_decode from "jwt-encode"
import MarketOverview from 'components/homeClients/MarketOverview'
import { Spinner } from 'react-bootstrap'
const Watchlist = ({ data }) => {
    console.log(data);
    const [filter, setFilter] = useState(null)
    const [watchList, setWatchList] = useState(data.filter(d => d.title === null, []))
    const titles = [...new Set(data.map(t => t.title))]
    const handleClick = title => {
        filtedData = []
        setFilter(title)
        const filtedData = data.filter(d => d.title === title, [])
        setWatchList(filtedData)
    }
    return (
        <SideBar pageName={'Watchlist'}>
            <Title pageName={'Protiflio & Watchlist'} />
            <div className="d-flex w-100 justify-content-between">
                <div className="rounded-1 p-2 bg-white">
                    <h2>My Watchlists</h2>
                    <div className={`${styles.carsoul} mb-2`}>
                        <button type="button"
                            className={null == filter ? `${styles.btn} ${styles.active}` : `${styles.btn}`}
                            onClick={() => handleClick(null)}>
                            watchLists
                        </button>
                        {
                            titles.map((d, number) => {
                                return (
                                    d == null ? '' :
                                        <button key={number} type="button"
                                            className={d == filter ? `${styles.btn} ${styles.active}` : `${styles.btn}`}
                                            onClick={() => handleClick(d)}>
                                            {d}
                                        </button>
                                )
                            })
                        }
                    </div>
                    <TableLogic watchLists={watchList} />
                </div>
                <div className="widgets ms-1">
                    <MarketOverview />
                </div>
            </div>

        </SideBar>
    )
}

export default Watchlist

export async function getServerSideProps({ req }) {
    const secret = process.env.SECRET
    const tokens = await jwt.getToken({ req, secret })
    const data = {
        "id": tokens.id,
        "name": tokens.name,
        "email": tokens.email,
        "image": tokens.picture,
        "exp": tokens.exp
    }
    const token = jwt_decode(data, secret)

    const response = await fetch(`${process.env.URL_END_POINT}/watchlist`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    const list = await response.json()
    return {
        props: {
            data: list
        }
    }
}