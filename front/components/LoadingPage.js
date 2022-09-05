import React from 'react'
import Title from './Title'

const LoadingPage = () => {
    return (
        <>
            <Title />
            <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '600px' }}>
                <div style={{ color: '#19B5FE' }} className="la-ball-scale-pulse la-3x">
                    <div></div>
                    <div></div>
                </div>
            </div>
        </>
    )
}

export default LoadingPage
