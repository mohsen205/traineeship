import { SymbolInfo } from "react-ts-tradingview-widgets"
const Description = ({ symbol }) => {
    return (
        <div className="bg-white p-2 mt-2 rounded-1">
            <SymbolInfo colorTheme="light" symbol={symbol} autosize></SymbolInfo>
        </div>
    )
}
export default Description