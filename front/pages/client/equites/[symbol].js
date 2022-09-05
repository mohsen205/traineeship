import React from "react";
import Description from "components/equites/Description";
import Header from "components/equites/Header";
import SideBar from "components/SideBar"
import Title from "components/Title"
import { useRouter } from 'next/router'
import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import jwt from "next-auth/jwt"
import jwt_decode from "jwt-encode"
const Symbol = ({ data, token, list }) => {
    const router = useRouter()
    const { symbol, name } = router.query

    return (
        <SideBar token={token}>
            <Title pageName={name} />
            <Header data={data} list={list} />
            <Description symbol={symbol} />
            <div className="bg-white p-2 mt-2 rounded-1">
                <AdvancedRealTimeChart theme="light" symbol={symbol} width="100%" height={650} />
            </div>
        </SideBar>
    )
}
export default Symbol


export async function getServerSideProps(context) {
    const { req, params } = context;
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

    const response = await fetch(`${process.env.URL_END_POINT}/collection`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    const collections = await response.json()



    const ticker = params.symbol.slice(params.symbol.indexOf(':') + 1, params.symbol.length)
    const responseTwo = await fetch(`${process.env.URL_END_POINT}/watchlist/${ticker}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    const list = await responseTwo.json()

    return {
        props: {
            data: collections,
            list: list,
            token: token
        }
    }
}