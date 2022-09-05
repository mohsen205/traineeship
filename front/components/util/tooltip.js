import React from 'react'
import { Tooltip, OverlayTrigger } from 'react-bootstrap'
const tooltip = ({ icons, title }) => {
    return (
        <>
            <OverlayTrigger
                placement="right"
                delay={{ show: 250, hide: 400 }}
                overlay={
                    <Tooltip id='tooltip-right'>
                        {title}
                    </Tooltip>
                } >
                <div>
                    {icons}
                </div>
            </OverlayTrigger>
        </>
    )
}

export default tooltip