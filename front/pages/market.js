import React, { useState } from 'react'
import SecurePage from 'components/util/securePage'
import Title from 'components/Title'
import Header from 'components/Header'
import Footer from 'components/Footer'
import styles from 'styles/market.module.css'
import { Screener } from "react-ts-tradingview-widgets";
const Market = ({ data }) => {
    return (
        <SecurePage>
            <Title pageName='Market' />
            <Header />
            <div className={`${styles.market}`}>
                <div className='container mt-3'>
                    <h1>Forex Screener</h1>
                    <Screener colorTheme="light" width="100%" height={800}></Screener>
                </div>
            </div>
            <Footer />
        </SecurePage>
    )
}

export default Market  
