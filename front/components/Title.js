import React from 'react'
import PropTypes from 'prop-types'
import Head from 'next/head'
import { appName } from 'globalVaribale'
/* Create the head tag and meta tag for better SOE  */
const Title = ({ pageName, title }) => {
    return (
        <Head>
            <meta name='description' content='help beginner and expert for fast trading and easy analysis , advanced tools to spend less time ' />
            <meta name='keywords' content='Trader , Quant , Technical Analsys ,
                                            Chart , Stocks ,Shares , Math , Hudge Fund , Programme , Strategies , Machine Learing 
                                            ,Deep Learing , AI ,technical analysis, charts, financial charts, sharpcharts,
                                            acp, advanced charting, interactive charting, dynamic chart, interactive stock charts,
                                            dynamic stock charts, dynamic financial chart, interactive financial chart, charting platform, 
                                            point and figure, pnf, yield curve, seasonality, rrg, relative rotation graph, investing, stocks,
                                            etfs, stock analysis, trading, stock trading, stock charting, stock chart, stock charts, ETF, ETF chart, 
                                            ETF charting, momentum, momentum charting, MACD, John Murphy, Martin Pring, Arthur Hill, financial markets' />
            <meta name='author' content='Mohsen mnassri and Hamdi Fridhy' />
            <title> {!pageName ? title : `${title} | ${pageName}`}</title>
        </Head>
    )
}
Title.defaultProps = {
    title: appName
}
Title.propTypes = {
    title: PropTypes.string,
    pageName: PropTypes.string
}

export default Title