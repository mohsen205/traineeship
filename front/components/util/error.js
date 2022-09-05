import React from 'react'
const error = ({ e }) => {
    return (
        <div className='text-danger' style={{ size: '15px' }}>{e}</div>
    )
}

export default error