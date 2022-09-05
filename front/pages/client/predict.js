import React, { useState } from 'react'
import SideBar from 'components/SideBar'
import { TechnicalAnalysis } from "react-ts-tradingview-widgets";
const Perdict = () => {
    return (
        <SideBar pageName={'Perdict'}>
            <div className="bg-white p-2 rounded-1">
                <div className="d-flex justify-content-between">
                    <div className="h4">
                        Technical Analysis
                    </div>
                    <div>
                        <label htmlFor="company">
                            Choose a company
                        </label>
                        <select id="company">
                            <option value="">Apple</option>
                        </select>
                    </div>
                </div>
                <TechnicalAnalysis width="100%"></TechnicalAnalysis>
            </div>
        </SideBar>
    )
}

export default Perdict



