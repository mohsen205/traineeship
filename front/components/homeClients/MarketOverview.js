import { MarketOverview, StockMarket } from 'react-ts-tradingview-widgets'
const MarketOverviewWidget = () => {
    return (
        <>
            <div className="bg-white rounded-1 p-2">
                <MarketOverview
                    colorTheme="light"
                    height={500}
                    width="100%"
                    showFloatingTooltip />
            </div>
            <div className="bg-white rounded-1 p-2 mt-2">
                <StockMarket
                    colorTheme="light"
                    height={400}
                    width="100%"
                    showFloatingTooltip />
            </div>
        </>
    )
}
export default MarketOverviewWidget