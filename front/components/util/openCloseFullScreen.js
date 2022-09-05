import React, { useState } from 'react';
import { AiOutlineFullscreen, AiOutlineFullscreenExit } from 'react-icons/ai'
const OpenCloseFullScreen = () => {
    const [FullScreen, setFullScreen] = useState(false)
    const goFullScreenOrExit = () => {
        setFullScreen(!FullScreen)
        if (!FullScreen) {
            document.documentElement.requestFullscreen()
        } else {
            document.exitFullscreen()
        }
    }

    return (
        <div onClick={goFullScreenOrExit}>
            {
                FullScreen ?
                    <AiOutlineFullscreenExit role={'button'} fontSize={'22px'} /> :
                    <AiOutlineFullscreen role={'button'} fontSize={'22px'} />
            }
        </div>
    )
}
export default OpenCloseFullScreen